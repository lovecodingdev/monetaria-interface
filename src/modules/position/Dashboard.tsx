import React from 'react';
import { RewardTable } from './RewardTable';
import HeaderDashboard from './HeaderDashboard';

export const Dashboard = () => {
  return (
    <div>
      <HeaderDashboard />
      <RewardTable />
    </div>
  );
};
