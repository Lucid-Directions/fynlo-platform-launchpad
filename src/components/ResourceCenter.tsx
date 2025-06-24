
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText, Video, Calendar, Users } from "lucide-react";

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

  const videoResources = [
    {
      title: "Platform Overview for Executives",
      description: "30-minute comprehensive platform demonstration",
      duration: "30:15",
      views: "2.4K views"
    },
    {
      title: "Restaurant Partnership Success Stories",
      description: "Client testimonials and case study presentations",
      duration: "18:42",
      views: "1.8K views"
    },
    {
      title: "Technical Architecture Deep Dive",
      description: "Detailed technical overview for IT professionals",
      duration: "45:30",
      views: "956 views"
    },
    {
      title: "Go-to-Market Strategy Workshop",
      description: "Step-by-step market entry strategy development",
      duration: "52:18",
      views: "1.2K views"
    }
  ];

  const upcomingWebinars = [
    {
      title: "Building a Restaurant Technology Business in 2024",
      date: "December 15, 2024",
      time: "2:00 PM EST",
      presenter: "Sarah Chen, VP Business Development"
    },
    {
      title: "Platform Economics and Revenue Optimization",
      date: "January 8, 2025",
      time: "1:00 PM EST",
      presenter: "Mike Rodriguez, Chief Revenue Officer"
    },
    {
      title: "Multi-Tenant Architecture Advantages",
      date: "January 22, 2025",
      time: "3:00 PM EST",
      presenter: "David Kim, Chief Technology Officer"
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

        {/* Video Library */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-12">Video Resource Library</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videoResources.map((video, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="aspect-video bg-gradient-to-br from-slate-100 to-blue-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Video className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-slate-600 font-medium">{video.duration}</div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">{video.title}</h4>
                  <p className="text-slate-600 mb-4">{video.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">{video.views}</span>
                    <Button variant="outline" size="sm">
                      Watch Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Upcoming Webinars */}
        <div className="p-8 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl">
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-12">Upcoming Educational Webinars</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {upcomingWebinars.map((webinar, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">{webinar.date}</div>
                    <div className="text-sm font-medium text-slate-900">{webinar.time}</div>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold text-slate-900 mb-3">{webinar.title}</h4>
                
                <div className="flex items-center space-x-2 mb-4">
                  <Users className="h-4 w-4 text-slate-500" />
                  <span className="text-sm text-slate-600">{webinar.presenter}</span>
                </div>
                
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Register Now
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Partner Portal CTA */}
        <div className="mt-16 text-center">
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
