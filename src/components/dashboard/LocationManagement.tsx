import React from 'react';
import { useFeatureAccess } from '@/hooks/useFeatureAccess';
import { UpgradePrompt } from './UpgradePrompt';

export const LocationManagement = () => {
  const { hasFeature } = useFeatureAccess();

  if (!hasFeature('multi_location')) {
    return (
      <UpgradePrompt
        title="Multi-Location Management"
        description="Manage multiple restaurant locations from a single dashboard."
        requiredPlan="omega"
        features={[
          'Multiple location support',
          'Centralized management',
          'Location-specific analytics',
          'Cross-location reporting',
          'Inventory synchronization'
        ]}
      />
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Location Management</h1>
      <p className="text-gray-600">Manage your restaurant locations</p>
      {/* Location management implementation will be added */}
    </div>
  );
};