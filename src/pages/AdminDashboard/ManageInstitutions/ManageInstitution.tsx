import { ManageInstitutionProps } from '@/types/props';
import { FC } from 'react';

const ManageInstitution: FC<ManageInstitutionProps> = ({ type, institutionProfile }) => {
  // eslint-disable-next-line no-console
  console.log(type, institutionProfile);
  return <div>ManageInstitution</div>;
};
export default ManageInstitution;
