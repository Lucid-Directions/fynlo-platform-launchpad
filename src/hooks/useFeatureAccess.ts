import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';

export const useFeatureAccess = () => {
  const { user, userRole } = useAuth();
  const [subscriptionData, setSubscriptionData] = useState<{
    subscription_plan: 'alpha' | 'beta' | 'omega';
    is_platform_owner: boolean;
    enabled_features: string[];
  } | null>(null);

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      if (!user) return;
      
      const { data } = await supabase
        .from('user_subscriptions')
        .select('subscription_plan, is_platform_owner, enabled_features')
        .eq('user_id', user.id)
        .single();
      
      if (data) {
        setSubscriptionData(data as { subscription_plan: 'alpha' | 'beta' | 'omega'; is_platform_owner: boolean; enabled_features: string[]; });
      } else {
        // Default subscription data if none exists
        setSubscriptionData({
          subscription_plan: 'alpha',
          is_platform_owner: false,
          enabled_features: []
        });
      }
    };

    fetchSubscriptionData();
  }, [user]);

  const hasFeature = (featureKey: string): boolean => {
    if (!subscriptionData) return false;
    
    // Platform owners have access to all features
    if (subscriptionData.is_platform_owner) return true;
    
    // Check if feature is in enabled_features array
    return subscriptionData.enabled_features.includes(featureKey);
  };

  const hasSubscriptionLevel = (level: 'alpha' | 'beta' | 'omega'): boolean => {
    if (!subscriptionData) return false;
    
    // Platform owners always have access
    if (subscriptionData.is_platform_owner) return true;
    
    const levelHierarchy = { alpha: 1, beta: 2, omega: 3 };
    return levelHierarchy[subscriptionData.subscription_plan] >= levelHierarchy[level];
  };

  const isPlatformOwner = (): boolean => {
    return subscriptionData?.is_platform_owner || isAdmin();
  };

  const getSubscriptionPlan = () => {
    return subscriptionData?.subscription_plan || 'alpha';
  };

  const getRestaurantId = () => {
    // This would need to be fetched from restaurants table or stored in subscription data
    // For now, returning null as it's not in the subscription table
    return null;
  };

  const isAdmin = (): boolean => {
    return userRole === 'admin' || subscriptionData?.is_platform_owner || false;
  };

  return {
    hasFeature,
    hasSubscriptionLevel,
    isPlatformOwner,
    getSubscriptionPlan,
    getRestaurantId,
    isAdmin,
    fynloUserData: subscriptionData,
  };
};