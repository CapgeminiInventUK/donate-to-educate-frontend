import Paths from '@/config/paths';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import { InstitutionProfile, InstitutionType } from '@/types/data';
import { FC } from 'react';
import ManageInstitution from '../ManageInstitutions/ManageInstitution';

const CharityUsers: FC = () => {
  const { state } = useLocationStateOrRedirect<{ institution: InstitutionProfile }>(
    Paths.ADMIN_DASHBOARD
  );

  return (
    <ManageInstitution type={InstitutionType.CHARITY} institutionProfile={state.institution} />
  );
};
export default CharityUsers;
