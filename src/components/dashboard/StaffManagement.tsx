import React from 'react';
import { useFeatureAccess } from '@/hooks/useFeatureAccess';
import { UpgradePrompt } from './UpgradePrompt';

export const StaffManagement = () => {
  const { hasFeature } = useFeatureAccess();

  if (!hasFeature('staff_management')) {
    return (
      <UpgradePrompt
        title="Staff Management"
        description="Manage staff accounts, permissions, and performance tracking."
        requiredPlan="beta"
        features={[
          'Staff account management',
          'Role-based permissions',
          'Performance tracking',
          'Shift scheduling',
          'Time tracking'
        ]}
      />
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
      <p className="text-gray-600">Manage your restaurant staff and permissions</p>
      {/* Staff management implementation will be added */}
    </div>
  );
};