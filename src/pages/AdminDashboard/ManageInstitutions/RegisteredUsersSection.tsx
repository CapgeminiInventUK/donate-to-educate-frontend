import { FC, useEffect, useState } from 'react';
import styles from './/RegisteredUsersSection.module.scss';
import InfoTable from '@/components/InfoTable/InfoTable';
import { ManageUserDetails } from '@/types/data';
import { getNameFromUserObject, getUserDataKey } from '@/utils/account';
import { checkForStringAndReturnEmptyIfFalsy, checkIfInTestEnvForAuthMode } from '@/utils/globals';
import { RegisteredUsersSectionProps } from '@/types/props';
import useAuthToken from '@/hooks/useAuthToken';
import { updateUser } from '@/graphql/mutations';
import { UpdateUserMutation } from '@/types/api';
import { client } from '@/graphqlClient';
import { useQuery } from '@tanstack/react-query';
import { GraphQLQuery } from 'aws-amplify/api';
import FormButton from '@/components/FormButton/FormButton';

const RegisteredUsersSection: FC<RegisteredUsersSectionProps> = ({ userData, type }) => {
  const [newUserData, setNewUserData] = useState(userData);
  const { jobTitle, department, phone, email, name, id } = newUserData;
  const [tableValues, setTableValues] = useState<ManageUserDetails>();

  const { token: authToken } = useAuthToken();
  const { refetch } = useQuery({
    queryKey: [`update-user-${type}-${name}`],
    enabled: false,
    queryFn: async () => {
      const result = await client.graphql<GraphQLQuery<UpdateUserMutation>>({
        authMode: checkIfInTestEnvForAuthMode(),
        authToken,
        query: updateUser,
        variables: {
          ...newUserData,
          id,
          userType: type,
        },
      });

      return result;
    },
  });

  useEffect(() => {
    const manageDetails: ManageUserDetails = {
      Name: getNameFromUserObject(newUserData),
      Email: checkForStringAndReturnEmptyIfFalsy(email),
      'Job title or role': jobTitle,
      Phone: phone,
    };

    if (type === 'localAuthority') {
      manageDetails.Department = checkForStringAndReturnEmptyIfFalsy(department);
    }
    setTableValues(manageDetails);
  }, [newUserData]);

  const manageDetailsEditables = ['Job title or role', 'Department', 'Phone'];

  const onChange = (key: string, value: string): void => {
    setNewUserData((prevValue) => ({
      ...prevValue,
      [getUserDataKey(key)]: value,
    }));
  };

  return (
    tableValues && (
      <div className={styles.RegisteredUsersSection}>
        <h2>1 of 3 users registered</h2>
        <InfoTable
          originalTableValues={{ ...tableValues }}
          editableKeys={manageDetailsEditables}
          theme="light"
          onChange={onChange}
          refetch={refetch}
        />
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
