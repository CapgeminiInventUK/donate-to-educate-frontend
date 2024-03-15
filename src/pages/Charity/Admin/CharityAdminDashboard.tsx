import { FC } from 'react';

import InstitutionAdminDashboard from '@/components/InstitutionAdminDashboard/InstitutionAdminDashboard';

const CharityAdminDashboard: FC = () => {
  return (
    <InstitutionAdminDashboard
      type="charity"
      name="Oxfam"
      profile={{ __typename: 'SchoolProfile', name: '', id: '', localAuthority: '', postcode: '' }}
    />
  );
};

export default CharityAdminDashboard;
