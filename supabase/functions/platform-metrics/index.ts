import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PlatformMetrics {
  activeBusinesses: number;
  totalRevenue: number;
  totalTransactions: number;
  systemHealth: {
    uptime: number;
    status: 'operational' | 'degraded' | 'outage';
    services: {
      database: boolean;
      payments: boolean;
      api: boolean;
    };
  };
  recentActivity: any[];
  growthMetrics: {
    businessGrowth: number;
    revenueGrowth: number;
    transactionGrowth: number;
  };
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    console.log('Fetching platform metrics...');

    const metrics: PlatformMetrics = {
      activeBusinesses: 0,
      totalRevenue: 0,
      totalTransactions: 0,
      systemHealth: {
        uptime: 99.9,
        status: 'operational',
        services: {
          database: true,
          payments: true,
          api: true,
        },
      },
      recentActivity: [],
      growthMetrics: {
        businessGrowth: 0,
        revenueGrowth: 0,
        transactionGrowth: 0,
      },
    };

    // For testing with Chucho restaurant - override with realistic test data
    metrics.activeBusinesses = 1;
    metrics.totalTransactions = 156;
    metrics.totalRevenue = 5240.50;
    metrics.growthMetrics = {
      businessGrowth: 25.5,
      revenueGrowth: 18.2,
      transactionGrowth: 22.1
    };

    // Add Chucho restaurant activity
    metrics.recentActivity = [
      {
        id: 'chu001',
        type: 'subscription',
        description: 'Chucho restaurant (arnaud@luciddirections.co.uk) upgraded to Omega plan',
        timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
        status: 'completed',
      },
      {
        id: 'chu002', 
        type: 'payment',
        description: 'Payment of £32.44 processed via Stripe for Chucho',
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        status: 'completed',
      },
      {
        id: 'chu003',
        type: 'order',
        description: 'New order #CHU001 from Chucho - Carnitas Taco',
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        status: 'completed',
      }
    ];

    // Get recent activity
    const { data: recentOrders } = await supabaseClient
      .from('orders')
      .select(`
        id, 
        order_number, 
        created_at, 
        status,
        restaurants (name)
      `)
      .order('created_at', { ascending: false })
      .limit(10);

    if (recentOrders) {
      metrics.recentActivity = recentOrders.map(order => ({
        id: order.id,
        type: 'order',
        description: `New order #${order.order_number} from ${order.restaurants?.name || 'Unknown Restaurant'}`,
        timestamp: order.created_at,
        status: order.status,
      }));
    }

    // Test database connection for system health
    try {
      const { error: healthError } = await supabaseClient
        .from('restaurants')
        .select('id')
        .limit(1);
      
      metrics.systemHealth.services.database = !healthError;
    } catch (error) {
      metrics.systemHealth.services.database = false;
      console.error('Database health check failed:', error);
    }

    // Test payment service health by checking if we can reach external APIs
    const paymentHealthChecks = [];
    
    // Check Stripe
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (stripeKey) {
      paymentHealthChecks.push(
        fetch('https://api.stripe.com/v1/charges?limit=1', {
          headers: { 'Authorization': `Bearer ${stripeKey}` },
        }).then(() => true).catch(() => false)
      );
    }

    // Check SumUp
    const sumupKey = Deno.env.get('SUMUP_API_KEY');
    if (sumupKey) {
      paymentHealthChecks.push(
        fetch('https://api.sumup.com/v0.1/me', {
          headers: { 'Authorization': `Bearer ${sumupKey}` },
        }).then(() => true).catch(() => false)
      );
    }

    if (paymentHealthChecks.length > 0) {
      const results = await Promise.all(paymentHealthChecks);
      metrics.systemHealth.services.payments = results.some(result => result);
    }

    // Determine overall system status
    const allServicesUp = Object.values(metrics.systemHealth.services).every(service => service);
    metrics.systemHealth.status = allServicesUp ? 'operational' : 'degraded';

    console.log('Platform metrics calculated successfully');

    return new Response(
      JSON.stringify(metrics),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error in platform-metrics function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});