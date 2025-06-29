
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/">
              <img 
                src="/lovable-uploads/ae344ce5-1c9f-41c8-b990-94ddff083a5a.png" 
                alt="Fynlo Logo" 
                className="h-24 w-auto md:h-28"
              />
            </Link>
          </div>
          
          {/* Professional Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/platform" 
              className={`font-medium transition-colors ${
                isActive('/platform') 
                  ? 'text-brand-orange' 
                  : 'text-brand-black hover:text-brand-orange'
              }`}
            >
              Platform
            </Link>
            <Link 
              to="/solutions" 
              className={`font-medium transition-colors ${
                isActive('/solutions') 
                  ? 'text-brand-orange' 
                  : 'text-brand-black hover:text-brand-orange'
              }`}
            >
              Solutions
            </Link>
            <Link 
              to="/pricing" 
              className={`font-medium transition-colors ${
                isActive('/pricing') 
                  ? 'text-brand-orange' 
                  : 'text-brand-black hover:text-brand-orange'
              }`}
            >
              Pricing
            </Link>
            <Link 
              to="/resources" 
              className={`font-medium transition-colors ${
                isActive('/resources') 
                  ? 'text-brand-orange' 
                  : 'text-brand-black hover:text-brand-orange'
              }`}
            >
              Resources
            </Link>
          </div>

          {/* Enhanced Sign In Button with Brand Colors */}
          <div className="flex items-center space-x-4">
            {!user && (
              <>
                <Button 
                  variant="ghost" 
                  onClick={handleGetStarted}
                  className="text-brand-black hover:text-brand-orange hover:bg-orange-50 font-medium px-4 py-2 transition-all"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={handleGetStarted}
                  className="bg-brand-orange hover:bg-orange-600 text-white font-medium px-6 py-2 shadow-sm transition-all"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
