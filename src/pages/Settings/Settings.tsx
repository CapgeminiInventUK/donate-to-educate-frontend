import Caution from '@/assets/icons/Caution';
import BackButton from '@/components/BackButton/BackButton';
import FormButton from '@/components/FormButton/FormButton';
import InfoTable from '@/components/InfoTable/InfoTable';
import { useStore } from '@/stores/useStore';
import { capitaliseFirstLetter, countEmptyObjectValues } from '@/utils/globals';
import type { FC } from 'react';
import styles from './Settings.module.scss';
// import { useQuery } from '@tanstack/react-query';
// import { client } from '@/graphqlClient';
// import { GetLocalAuthorityUserQuery } from '@/types/api';
// import { GraphQLQuery } from 'aws-amplify/api';
// import { getLocalAuthorityUser } from '@/graphql/queries';

const Settings: FC = () => {
  const { email, type } = useStore((state) => state.user) ?? {};

  // // TODO - Detect which user type for which query to use
  // /* eslint-disable no-console */
  // console.log(type, 'TYPE');
  // const { isLoading, data, isError, error } = useQuery({
  //   queryKey: [`get-la-user-${email}`],
  //   queryFn: async () => {
  //     const { data } = await client.graphql<GraphQLQuery<GetLocalAuthorityUserQuery>>({
  //       query: getLocalAuthorityUser,
  //       variables: {
  //         email,
  //       },
  //     });

  //     return data;
  //   },
  // });

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   /* eslint-disable no-console */
  //   console.error('Error loading data:', error);
  //   return <div>Error loading data</div>;
  // }

  // const localAuthorityUser = data?.getLocalAuthorityUser;
  // if (!localAuthorityUser) {
  //   /* eslint-disable no-console */
  //   console.error('No user local authority user returned from the query');
  //   return <div>No user local authority user available</div>;
  // }

  // const userEmail = localAuthorityUser.email ?? 'No email given';

  const userEmail = email ?? 'test@test.com';
  const manageDetails = {
    Name: 'Alexander Isak',
    Email: userEmail,
    'Job title or role': 'Head of Education',
    Department: 'Education',
    Phone: '07123456789',
  };

  const manageDetailsEditables = ['Job title or role', 'Department', 'Phone'];

  const accountDetails = {
    'Account 1': 'Alexander Isak',
    'Account 2': 'Fabian Schar',
    'Account 3': '',
  };

  const typename =
    String(type) === 'localAuthority' ? 'Local authority' : capitaliseFirstLetter(String(type));

  const deleteTableData = {
    [typename]: `[${typename} name 1]`,
    'Your account': 'Isak-chemistry@gmail.com',
  };

  return (
    <div className={styles.container}>
      <div className={styles.actionButtons}>
        <BackButton theme="blue" />
      </div>
      <div className={styles.settingsCard}>
        <div className={styles.header}>
          <h1>Settings</h1>
        </div>
        <div className={styles.body}>
          {type === 'charity' && (
            <div className={styles.postcodeSection}>
              <h2>Postcode</h2>
              <InfoTable tableValues={{ Postcode: 'n7 5ke' }} editableKeys={['Postcode']} />
            </div>
          )}
          <div className={styles.manageDetailsSection}>
            <h2>Manage your details</h2>
            <InfoTable tableValues={manageDetails} editableKeys={manageDetailsEditables} />
          </div>
          {(type === 'charity' || type === 'school') && (
            <div className={styles.manageSchoolSection}>
              <h2>Manage your {type}</h2>
              <p>
                Three accounts can manage this {type}, add a colleague and see how they can help.
              </p>
              <InfoTable tableValues={accountDetails} isAccounts={true} />
              <FormButton
                theme={
                  countEmptyObjectValues(accountDetails) > 0
                    ? 'formButtonGreen'
                    : 'formButtonDisabled'
                }
                text="Add user &nbsp;+"
                fullWidth={true}
                onClick={() => window.alert('This function is in development')}
                ariaLabel="add user"
                className={styles.addUserButton}
              />
            </div>
          )}
          <div className={styles.deleteSection}>
            <h2>Delete</h2>
            <InfoTable
              tableValues={deleteTableData}
              editableKeys={manageDetailsEditables}
              isDelete={true}
              title="Danger zone"
              icon={<Caution />}
              className={styles.deleteTable}
              rowClassName={styles.deleteTableRow}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
