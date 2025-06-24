
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

export const ClientSuccess = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Owner, The Golden Spoon Restaurant",
      image: "👩‍🍳",
      quote: "Fynlo transformed our payment process completely. We went from juggling multiple systems to having everything integrated seamlessly. Our staff loves how easy it is to use.",
      rating: 5,
      metrics: "Increased efficiency by 40%"
    },
    {
      name: "Marcus Rodriguez",
      role: "General Manager, Fresh Market Bistro",
      image: "👨‍💼",
      quote: "The real-time reporting and inventory management features have been game-changers. We can now make data-driven decisions on the fly.",
      rating: 5,
      metrics: "Reduced food waste by 25%"
    },
    {
      name: "Emma Thompson",
      role: "Co-owner, Artisan Coffee House",
      image: "👩‍💻",
      quote: "Setting up was incredibly simple, and the customer support is outstanding. We were up and running in less than an hour with no technical hassles.",
      rating: 5,
      metrics: "Setup completed in under 1 hour"
    }
  ];

  const successMetrics = [
    { metric: "99.9%", label: "Uptime Guarantee", description: "Reliable service you can count on" },
    { metric: "< 2s", label: "Transaction Speed", description: "Lightning-fast payment processing" },
    { metric: "24/7", label: "Support Available", description: "Always here when you need us" },
    { metric: "500+", label: "Happy Businesses", description: "Trusted by restaurants nationwide" }
  ];

  const caseStudies = [
    {
      business: "Pizza Corner",
      challenge: "Managing multiple locations with inconsistent reporting",
      solution: "Implemented Fynlo's multi-location dashboard with unified reporting",
      result: "30% improvement in operational efficiency across all locations"
    },
    {
      business: "Healthy Bites Cafe",
      challenge: "High transaction fees eating into profit margins", 
      solution: "Switched to Fynlo's transparent 1.5% flat rate pricing",
      result: "Saved £2,400 annually in processing fees"
    },
    {
      business: "The Burger Joint",
      challenge: "Time-consuming manual inventory management",
      solution: "Automated inventory tracking with QR scanner integration",
      result: "Reduced inventory management time by 60%"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-emerald-100 text-emerald-800">Client Success</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            What our customers say
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Real stories from restaurant owners who've transformed their business operations with Fynlo.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                {/* Quote */}
                <blockquote className="text-slate-700 mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                
                {/* Customer Info with Image */}
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 text-2xl">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.name}</div>
                    <div className="text-slate-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
                
                {/* Metrics */}
                <div className="bg-emerald-50 rounded-lg p-3 text-center">
                  <div className="text-emerald-800 font-semibold text-sm">{testimonial.metrics}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Success Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {successMetrics.map((item, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl font-bold text-blue-600 mb-2">{item.metric}</div>
              <div className="text-lg font-semibold text-slate-900 mb-1">{item.label}</div>
              <div className="text-slate-600 text-sm">{item.description}</div>
            </div>
          ))}
        </div>

        {/* Case Studies */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-8">Success Stories</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-6">
                <h4 className="text-xl font-bold text-slate-900 mb-3">{study.business}</h4>
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-red-600">Challenge: </span>
                    <span className="text-slate-700">{study.challenge}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-blue-600">Solution: </span>
                    <span className="text-slate-700">{study.solution}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-emerald-600">Result: </span>
                    <span className="text-slate-700">{study.result}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
