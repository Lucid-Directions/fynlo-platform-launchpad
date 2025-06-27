
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Hero = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  const handleRequestDemo = () => {
    // For now, navigate to auth - can be updated to a dedicated demo request page later
    navigate('/auth');
  };

  return (
    <section className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 border-b">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/ae344ce5-1c9f-41c8-b990-94ddff083a5a.png" 
            alt="Fynlo Logo" 
            className="h-24 w-auto md:h-32"
          />
        </div>
        <div className="flex items-center space-x-4">
          {!user && (
            <Button variant="ghost" onClick={handleGetStarted}>
              Sign In
            </Button>
          )}
        </div>
      </nav>

      {/* Hero Content */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900">
            The Next Generation
            <span className="block text-blue-600">
              Payment Platform
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-gray-600 max-w-3xl mx-auto">
            Join industry leaders building scalable restaurant technology businesses. 
            Enterprise-grade, multi-tenant POS platform with industry-leading 1.9% processing rates.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold"
              onClick={handleRequestDemo}
            >
              Request Enterprise Demo
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-4 text-lg font-semibold"
            >
              View Platform Overview
            </Button>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            Trusted by restaurant groups across 12+ markets
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-lg border bg-gray-50">
              <div className="text-3xl font-bold text-blue-600 mb-2">1.9%</div>
              <div className="text-gray-600">Processing Rate vs 2.9% Industry Standard</div>
            </div>
            <div className="p-6 rounded-lg border bg-gray-50">
              <div className="text-3xl font-bold text-green-600 mb-2">Zero</div>
              <div className="text-gray-600">Hardware Investment Required</div>
            </div>
            <div className="p-6 rounded-lg border bg-gray-50">
              <div className="text-3xl font-bold text-purple-600 mb-2">Cloud</div>
              <div className="text-gray-600">Enterprise-Grade Platform</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
