import { FC } from 'react';
import styles from './Settings.module.scss';
import InfoTable from '@/components/InfoTable/InfoTable';
import { ManageUserDetails } from '@/types/data';
import { getNameFromUserObject } from '@/utils/account';
import { checkForStringAndReturnEmptyIfFalsy } from '@/utils/globals';
import { ManageDetailsSectionProps } from '@/types/props';

const ManageDetailsSection: FC<ManageDetailsSectionProps> = ({ userData, type }) => {
  const { jobTitle, department, phone, email } = userData;

  const manageDetails: ManageUserDetails = {
    Name: getNameFromUserObject(userData),
    Email: checkForStringAndReturnEmptyIfFalsy(email),
    'Job title or role': jobTitle,
    Phone: phone,
  };

  if (type === 'localAuthority') {
    manageDetails.Department = checkForStringAndReturnEmptyIfFalsy(department);
  }

  const manageDetailsEditables = ['Job title or role', 'Department', 'Phone'];

  return (
    <div className={styles.manageDetailsSection}>
      <h2>Manage your details</h2>
      <InfoTable tableValues={{ ...manageDetails }} editableKeys={manageDetailsEditables} />
    </div>
  );
};

export default ManageDetailsSection;
