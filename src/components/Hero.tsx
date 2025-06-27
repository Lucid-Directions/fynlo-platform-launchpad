

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

  return (
    <section className="min-h-screen bg-white">
      {/* Enhanced Professional Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/ae344ce5-1c9f-41c8-b990-94ddff083a5a.png" 
                alt="Fynlo Logo" 
                className="h-16 w-auto md:h-20"
              />
            </div>
            
            {/* Professional Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#platform" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Platform
              </a>
              <a href="#solutions" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Solutions
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Pricing
              </a>
              <a href="#resources" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Resources
              </a>
            </div>

            {/* Enhanced Sign In Button */}
            <div className="flex items-center space-x-4">
              {!user && (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={handleGetStarted}
                    className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium px-4 py-2 transition-all"
                  >
                    Sign In
                  </Button>
                  <Button 
                    onClick={handleGetStarted}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 shadow-sm transition-all"
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            Enterprise Payment Solutions
            <span className="block text-blue-600 mt-2">
              Built for Scale
            </span>
          </h1>
          
          <p className="text-lg md:text-xl mb-12 text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Empowering restaurant technology companies with enterprise-grade, multi-tenant POS infrastructure. 
            Trusted by industry leaders with competitive 1.9% processing rates and zero hardware investment.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold bg-blue-600 hover:bg-blue-700"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-4 text-lg font-semibold border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600"
            >
              Platform Overview
            </Button>
          </div>

          <div className="mt-8 text-sm text-gray-500 font-medium">
            Trusted by restaurant technology leaders across 12+ markets
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8 rounded-xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl font-bold text-blue-600 mb-3">1.9%</div>
              <div className="text-gray-700 font-medium">Processing Rate</div>
              <div className="text-sm text-gray-500 mt-1">vs 2.9% Industry Standard</div>
            </div>
            <div className="p-8 rounded-xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl font-bold text-green-600 mb-3">Zero</div>
              <div className="text-gray-700 font-medium">Hardware Investment</div>
              <div className="text-sm text-gray-500 mt-1">Cloud-Based Infrastructure</div>
            </div>
            <div className="p-8 rounded-xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl font-bold text-purple-600 mb-3">99.9%</div>
              <div className="text-gray-700 font-medium">Uptime Guarantee</div>
              <div className="text-sm text-gray-500 mt-1">Enterprise-Grade Reliability</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

