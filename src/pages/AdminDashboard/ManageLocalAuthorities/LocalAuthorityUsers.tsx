import Paths from '@/config/paths';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import { InstitutionProfile } from '@/types/data';
import { FC } from 'react';
import ManageInstitution from '@/components/ManageInstitutions/ManageInstitution/ManageInstitution';

const LocalAuthorityUsers: FC = () => {
  const { state } = useLocationStateOrRedirect<{ id: string; name: string; registered: boolean }>(
    Paths.ADMIN_DASHBOARD_LA_VIEW_USERS
  );

  const profile: InstitutionProfile = { ...state, localAuthority: state.name };

  return <ManageInstitution type="localAuthority" institutionProfile={profile} />;
};
export default LocalAuthorityUsers;
