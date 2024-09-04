import { FC } from 'react';
import styles from './/RegisteredUsersSection.module.scss';
import InfoTable from '@/components/InfoTable/InfoTable';
import { ManageUserDetails } from '@/types/data';
import { getNameFromUserObject } from '@/utils/account';
import { checkForStringAndReturnEmptyIfFalsy } from '@/utils/globals';
import { RegisteredUsersSectionProps } from '@/types/props';
import FormButton from '@/components/FormButton/FormButton';

const RegisteredUsersSection: FC<RegisteredUsersSectionProps> = ({ userData, type }) => {
  const tableValues = userData.map((user) => {
    const manageDetails: ManageUserDetails = {
      Name: getNameFromUserObject(user),
      Email: checkForStringAndReturnEmptyIfFalsy(user.email),
      'Job title or role': user.jobTitle,
      Phone: user.phone,
    };
    if (type === 'localAuthority') {
      manageDetails.Department = checkForStringAndReturnEmptyIfFalsy(user.department);
      manageDetails['Notes about this user'] = checkForStringAndReturnEmptyIfFalsy(user.notes);
    }
    return manageDetails;
  });

  return (
    tableValues && (
      <div className={styles.RegisteredUsersSection}>
        <h2>{tableValues.length} of 3 users registered</h2>
        {tableValues.map((user, key) => (
          <InfoTable key={key} originalTableValues={{ ...user }} theme="light" />
        ))}
        <FormButton
          theme={'formButtonGreen'}
          text="Add user &nbsp;+"
          fullWidth={true}
          onClick={() => window.alert('This function is in development')}
          ariaLabel="add user"
          className={styles.addUserButton}
        />
      </div>
    )
  );
};

export default RegisteredUsersSection;
