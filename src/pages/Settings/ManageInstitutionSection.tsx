import styles from './Settings.module.scss';
import InfoTable from '@/components/InfoTable/InfoTable';
import FormButton from '@/components/FormButton/FormButton';
import { countEmptyObjectValues } from '@/utils/globals';
import { FC } from 'react';
import { ManageInstitutionSectionProps } from '@/types/props';

const ManageInstitutionSection: FC<ManageInstitutionSectionProps> = ({ type }) => {
  // TODO - When multiple users, get these user details from BE
  const accountDetails = {
    'Account 1': 'Account user one',
    'Account 2': 'Account user two',
    'Account 3': '',
  };

  return (
    type && (
      <div className={styles.manageInstitutionSection}>
        <h2>Manage your {type}</h2>
        <p>Three accounts can manage this {type}, add a colleague and see how they can help.</p>
        <InfoTable originalTableValues={accountDetails} isAccounts={true} />
        <FormButton
          theme={
            countEmptyObjectValues(accountDetails) > 0 ? 'formButtonGreen' : 'formButtonDisabled'
          }
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

export default ManageInstitutionSection;
