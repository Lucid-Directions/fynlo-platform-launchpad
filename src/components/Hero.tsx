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

  const handleSignIn = () => {
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
            className="h-16 w-auto"
          />
        </div>
        <div className="flex items-center space-x-4">
          {!user && (
            <>
              <Button variant="ghost" onClick={handleSignIn}>
                Sign In
              </Button>
              <Button onClick={handleGetStarted}>
                Get Started
              </Button>
            </>
          )}
        </div>
      </nav>

      {/* Hero Content */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900">
            The Future of
            <span className="block text-blue-600">
              Business Management
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-gray-600 max-w-3xl mx-auto">
            Streamline your business operations with our comprehensive CRM platform. 
            Manage customers, track sales, and grow your business efficiently.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold"
              onClick={handleGetStarted}
            >
              {user ? 'Go to Dashboard' : 'Get Started'}
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-4 text-lg font-semibold"
            >
              Watch Demo
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-lg border bg-gray-50">
              <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime Guarantee</div>
            </div>
            <div className="p-6 rounded-lg border bg-gray-50">
              <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600">Customer Support</div>
            </div>
            <div className="p-6 rounded-lg border bg-gray-50">
              <div className="text-3xl font-bold text-purple-600 mb-2">Secure</div>
              <div className="text-gray-600">Data Protection</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
