import styles from './Settings.module.scss';
import InfoTable from '@/components/InfoTable/InfoTable';
import FormButton from '@/components/FormButton/FormButton';
import { FC } from 'react';
import { ManageInstitutionSectionProps } from '@/types/props';
import { getNameFromUserObject, getUserDetailsObjectFromQuery } from '@/utils/account';
import Paths from '@/config/paths';
import { useNavigate } from 'react-router-dom';

const ManageInstitutionSection: FC<ManageInstitutionSectionProps> = ({
  type,
  allUsers,
  localAuthority,
}) => {
  const navigate = useNavigate();
  const { institutionName, id } = getUserDetailsObjectFromQuery(allUsers[0], type);

  const accountDetails = allUsers.reduce(
    (acc, user, index) => {
      acc = { ...acc, [`Account ${index + 1}`]: getNameFromUserObject(user) };
      return acc;
    },
    { 'Account 1': '', 'Account 2': '', 'Account 3': '' }
  );

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
          name: institutionName,
          id,
          localAuthority: type === 'localAuthority' ? institutionName : localAuthority,
          urn: id,
        },
      }
    );
  };

  return (
    type && (
      <div className={styles.manageInstitutionSection}>
        <h2>Manage your {type}</h2>
        <p>Three accounts can manage this {type}, add a colleague and see how they can help.</p>
        <InfoTable originalTableValues={accountDetails} isAccounts={true} />
        <FormButton
          disabled={allUsers.length > 2}
          theme={allUsers.length < 3 ? 'formButtonGreen' : 'formButtonGreenDisabled'}
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

export default ManageInstitutionSection;
