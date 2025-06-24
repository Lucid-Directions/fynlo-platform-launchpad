
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const ClientSuccess = () => {
  const successStories = [
    {
      name: "Maria Rodriguez",
      title: "CEO, Urban Bistro Group",
      company: "12 Locations",
      testimonial: "Fynlo transformed our operations. We reduced processing costs by 45% and increased efficiency across all locations. The platform pays for itself.",
      metrics: {
        savings: "45%",
        efficiency: "60%",
        growth: "23%"
      },
      avatar: "MR"
    },
    {
      name: "James Chen",
      title: "Founder, FastCasual Concepts",
      company: "8 Locations",
      testimonial: "The multi-tenant architecture allowed us to scale rapidly without technical headaches. Revenue per location increased 23% in the first year.",
      metrics: {
        savings: "38%",
        efficiency: "55%",
        growth: "31%"
      },
      avatar: "JC"
    },
    {
      name: "Sarah Johnson",
      title: "Operations Director, Premium Dining",
      company: "15 Locations",
      testimonial: "Real-time analytics and centralized management gave us unprecedented visibility. We optimized our entire operation based on data insights.",
      metrics: {
        savings: "42%",
        efficiency: "67%",
        growth: "28%"
      },
      avatar: "SJ"
    }
  ];

  const caseStudyMetrics = [
    { value: "500+", label: "Restaurant Partners", description: "Active on platform" },
    { value: "£1.8B", label: "Transaction Volume", description: "Processed annually" },
    { value: "99.9%", label: "Customer Satisfaction", description: "Retention rate" },
    { value: "18 months", label: "Average ROI", description: "Payback period" }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Client Success</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Proven Results Across
            <span className="block text-blue-600">Restaurant Segments</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            See how restaurant leaders are transforming their operations and building scalable technology businesses with our platform.
          </p>
        </div>

        {/* Success Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {caseStudyMetrics.map((metric, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-blue-600 mb-2">{metric.value}</div>
                <div className="text-lg font-semibold text-slate-900 mb-1">{metric.label}</div>
                <div className="text-slate-600 text-sm">{metric.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Client Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {successStories.map((story, index) => (
            <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 h-full">
              <div className="flex items-center mb-6">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                    {story.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-slate-900">{story.name}</h4>
                  <p className="text-slate-600 text-sm">{story.title}</p>
                  <Badge variant="outline" className="mt-1">{story.company}</Badge>
                </div>
              </div>
              
              <blockquote className="text-slate-700 mb-6 italic">
                "{story.testimonial}"
              </blockquote>
              
              {/* Results Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">{story.metrics.savings}</div>
                  <div className="text-sm text-slate-600">Cost Savings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{story.metrics.efficiency}</div>
                  <div className="text-sm text-slate-600">Efficiency Gain</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{story.metrics.growth}</div>
                  <div className="text-sm text-slate-600">Revenue Growth</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Industry Segments */}
        <div className="p-8 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl">
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-8">Serving All Restaurant Segments</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-lg">
              <div className="text-3xl mb-4">🍕</div>
              <h4 className="font-semibold text-slate-900 mb-2">Quick Service</h4>
              <p className="text-slate-600 text-sm">Fast-casual and counter service restaurants</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg">
              <div className="text-3xl mb-4">🍽️</div>
              <h4 className="font-semibold text-slate-900 mb-2">Full Service</h4>
              <p className="text-slate-600 text-sm">Traditional dine-in restaurants and cafes</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg">
              <div className="text-3xl mb-4">🥂</div>
              <h4 className="font-semibold text-slate-900 mb-2">Fine Dining</h4>
              <p className="text-slate-600 text-sm">Premium restaurants and hospitality</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg">
              <div className="text-3xl mb-4">🚚</div>
              <h4 className="font-semibold text-slate-900 mb-2">Food Trucks</h4>
              <p className="text-slate-600 text-sm">Mobile and pop-up dining concepts</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
