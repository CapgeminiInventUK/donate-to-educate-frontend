import { FC } from 'react';
import styles from './RegisteredUsersSection.module.scss';
import InfoTable from '@/components/InfoTable/InfoTable';
import { ManageUserDetails } from '@/types/data';
import { getNameFromUserObject } from '@/utils/account';
import { checkForStringAndReturnEmptyIfFalsy } from '@/utils/globals';
import { RegisteredUsersSectionProps } from '@/types/props';
import { useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import FormButton from '@/components/FormButton/FormButton';
import AdminManageLa from '../AdminManageLa/AdminManageLa';

const RegisteredUsersSection: FC<RegisteredUsersSectionProps> = ({
  userData,
  type,
  institutionProfile,
  registered,
}) => {
  const navigate = useNavigate();
  const { id, name, localAuthority } = institutionProfile;

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

  const handleNavigation = (): void => {
    navigate(
      type === 'school'
        ? Paths.ADD_SCHOOL_USER
        : type === 'charity'
          ? Paths.ADD_CHARITY_USER
          : Paths.ADD_LOCAL_AUTHORITY_USER,
      {
        state: {
          type,
          name,
          id,
          localAuthority,
          urn: id,
        },
      }
    );
  };

  return (
    tableValues && (
      <div className={styles.registeredUsersSection}>
        <h2>{tableValues.length} of 3 users registered</h2>
        {tableValues.map((user, key) => (
          <InfoTable key={key} originalTableValues={{ ...user }} theme="light" />
        ))}
        {type === 'localAuthority' && registered && <AdminManageLa name={name} />}
        <FormButton
          theme={'formButtonGreen'}
          text="Add user &nbsp;+"
          fullWidth={true}
          onClick={handleNavigation}
          ariaLabel="add user"
          className={styles.addUserButton}
        />
      </div>
    )
  );
};

export default RegisteredUsersSection;
