import React from 'react';
import { useFeatureAccess } from '@/hooks/useFeatureAccess';

export const BusinessManagement = () => {
  const { isPlatformOwner } = useFeatureAccess();

  if (!isPlatformOwner()) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
          <p className="text-gray-600">This page is only available to platform administrators.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Business Management</h1>
      <p className="text-gray-600">Manage all businesses on the Fynlo platform</p>
      {/* Business management implementation will be added */}
    </div>
  );
};