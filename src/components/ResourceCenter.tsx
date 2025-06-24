
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

export const ResourceCenter = () => {
  const businessResources = [
    {
      title: "Platform Business Case Template",
      description: "Comprehensive ROI model and market analysis framework",
      type: "Excel Template",
      size: "2.4 MB",
      icon: <FileText className="h-6 w-6 text-blue-600" />
    },
    {
      title: "Restaurant Market Analysis Guide",
      description: "Step-by-step guide to analyzing your local restaurant market",
      type: "PDF Guide",
      size: "1.8 MB",
      icon: <FileText className="h-6 w-6 text-emerald-600" />
    },
    {
      title: "Platform Demo Presentation",
      description: "Professional presentation deck for restaurant prospects",
      type: "PowerPoint",
      size: "15.2 MB",
      icon: <FileText className="h-6 w-6 text-purple-600" />
    },
    {
      title: "Implementation Timeline Template",
      description: "Project management template for platform deployment",
      type: "Excel Template",
      size: "1.2 MB",
      icon: <FileText className="h-6 w-6 text-orange-600" />
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Resource Center</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Platform Resources and
            <span className="block text-blue-600">Business Development Tools</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Access comprehensive resources, tools, and educational content designed to accelerate your platform business development and market success.
          </p>
        </div>

        {/* Business Resources */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-12">Business Development Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {businessResources.map((resource, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-slate-50 rounded-lg flex-shrink-0">
                    {resource.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">{resource.title}</h4>
                    <p className="text-slate-600 mb-3">{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Badge variant="outline">{resource.type}</Badge>
                        <span className="text-sm text-slate-500">{resource.size}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Partner Portal CTA */}
        <div className="text-center">
          <div className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4">Access the Partner Portal</h3>
            <p className="text-blue-100 mb-6">
              Get exclusive access to advanced resources, training materials, and business development tools designed specifically for platform partners.
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-4 text-lg font-semibold">
              Request Portal Access
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
