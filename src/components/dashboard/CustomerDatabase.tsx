import React from 'react';
import { useFeatureAccess } from '@/hooks/useFeatureAccess';
import { UpgradePrompt } from './UpgradePrompt';

export const CustomerDatabase = () => {
  const { hasFeature } = useFeatureAccess();

  if (!hasFeature('customer_database')) {
    return (
      <UpgradePrompt
        title="Customer Database"
        description="Manage customer profiles, order history, and loyalty programs."
        requiredPlan="beta"
        features={[
          'Customer profiles',
          'Order history tracking',
          'Customer preferences',
          'Contact management',
          'Loyalty program support'
        ]}
      />
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Customer Database</h1>
      <p className="text-gray-600">Manage your customer relationships</p>
      {/* Customer database implementation will be added */}
    </div>
  );
};