
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Users, Zap } from "lucide-react";

export const Implementation = () => {
  const implementationSteps = [
    {
      step: "1",
      title: "Platform Deployment",
      duration: "2-4 weeks",
      description: "Complete technical setup and configuration of your platform instance",
      deliverables: [
        "Custom platform configuration",
        "Payment processing integration",
        "Security and compliance setup",
        "Initial testing and validation",
        "Go-live certification"
      ],
      icon: <Zap className="h-8 w-8 text-blue-600" />
    },
    {
      step: "2",
      title: "Training & Certification",
      duration: "1-2 weeks",
      description: "Comprehensive education program for your team and restaurant partners",
      deliverables: [
        "Platform operation training",
        "Sales and marketing certification",
        "Technical support training",
        "Business development workshops",
        "Ongoing education resources"
      ],
      icon: <Users className="h-8 w-8 text-emerald-600" />
    },
    {
      step: "3",
      title: "Market Launch",
      duration: "2-6 weeks",
      description: "Strategic go-to-market execution with comprehensive support",
      deliverables: [
        "Marketing campaign launch",
        "Lead generation activation",
        "First customer onboarding",
        "Performance monitoring setup",
        "Success metric tracking"
      ],
      icon: <CheckCircle className="h-8 w-8 text-purple-600" />
    }
  ];

  const supportTiers = [
    {
      name: "Standard Support",
      description: "Essential support for platform operations",
      features: [
        "Email support (24-48 hour response)",
        "Knowledge base access",
        "Monthly check-in calls",
        "Platform updates and maintenance",
        "Basic reporting and analytics"
      ],
      availability: "Business hours"
    },
    {
      name: "Premium Support",
      description: "Enhanced support for growing businesses",
      features: [
        "Priority phone and email support",
        "Dedicated account manager",
        "Weekly business reviews",
        "Custom training sessions",
        "Advanced analytics and insights"
      ],
      availability: "Extended hours"
    },
    {
      name: "Enterprise Support",
      description: "White-glove support for large-scale operations",
      features: [
        "24/7 dedicated support team",
        "On-site training and support",
        "Custom feature development",
        "Executive business reviews",
        "Priority product roadmap input"
      ],
      availability: "24/7/365"
    }
  ];

  const serviceLevels = [
    { metric: "99.9%", label: "Platform Uptime", description: "Guaranteed SLA" },
    { metric: "<2hrs", label: "Critical Issue Response", description: "Maximum response time" },
    { metric: "24/7", label: "System Monitoring", description: "Proactive issue detection" },
    { metric: "30 days", label: "Implementation Time", description: "Average go-live timeline" }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">Implementation & Support</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Enterprise Implementation
            <span className="block text-blue-600">and Support Services</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive implementation methodology and ongoing support services designed to ensure your platform success from day one.
          </p>
        </div>

        {/* Implementation Timeline */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-12">Implementation Timeline</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {implementationSteps.map((step, index) => (
              <Card key={index} className="relative hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="absolute -top-4 left-6">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                </div>
                
                <CardHeader className="pt-8">
                  <div className="flex items-center space-x-4 mb-4">
                    {step.icon}
                    <div>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                      <Badge variant="outline" className="mt-2">
                        <Clock className="h-3 w-3 mr-1" />
                        {step.duration}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-slate-600">{step.description}</p>
                </CardHeader>
                
                <CardContent>
                  <h5 className="font-semibold text-slate-900 mb-3">Key Deliverables:</h5>
                  <ul className="space-y-2">
                    {step.deliverables.map((deliverable, deliverableIndex) => (
                      <li key={deliverableIndex} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700 text-sm">{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Service Level Commitments */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-12">Service Level Commitments</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceLevels.map((level, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{level.metric}</div>
                  <div className="text-lg font-semibold text-slate-900 mb-1">{level.label}</div>
                  <div className="text-slate-600 text-sm">{level.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Support Tiers */}
        <div>
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-12">Ongoing Support Services</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {supportTiers.map((tier, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-slate-900">{tier.name}</CardTitle>
                  <p className="text-slate-600">{tier.description}</p>
                  <Badge variant="outline" className="w-fit">
                    {tier.availability}
                  </Badge>
                </CardHeader>
                
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
