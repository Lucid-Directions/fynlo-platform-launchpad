import { useAuth } from '@/contexts/AuthContext';

export const useFeatureAccess = () => {
  const { fynloUserData, userRole } = useAuth();

  const hasFeature = (featureKey: string): boolean => {
    if (!fynloUserData) return false;
    
    // Platform owners have access to all features
    if (fynloUserData.is_platform_owner) return true;
    
    // Check if feature is in enabled_features array
    return fynloUserData.enabled_features.includes(featureKey);
  };

  const hasSubscriptionLevel = (level: 'alpha' | 'beta' | 'omega'): boolean => {
    if (!fynloUserData) return false;
    
    // Platform owners always have access
    if (fynloUserData.is_platform_owner) return true;
    
    const levelHierarchy = { alpha: 1, beta: 2, omega: 3 };
    return levelHierarchy[fynloUserData.subscription_plan] >= levelHierarchy[level];
  };

  const isPlatformOwner = (): boolean => {
    return fynloUserData?.is_platform_owner || false;
  };

  const getSubscriptionPlan = () => {
    return fynloUserData?.subscription_plan || 'alpha';
  };

  const getRestaurantId = () => {
    return fynloUserData?.restaurant_id;
  };

  const isAdmin = (): boolean => {
    return userRole === 'admin' || fynloUserData?.is_platform_owner || false;
  };

  return {
    hasFeature,
    hasSubscriptionLevel,
    isPlatformOwner,
    getSubscriptionPlan,
    getRestaurantId,
    isAdmin,
    fynloUserData,
  };
};