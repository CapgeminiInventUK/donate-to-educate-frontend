import { FC, useState } from 'react';
import InfoTable from '@/components/InfoTable/InfoTable';
import styles from './Settings.module.scss';
import { PostcodeEditProps } from '@/types/props';
import { useQuery } from '@tanstack/react-query';
import { checkForStringAndReturnEmptyIfFalsy, checkIfInTestEnvForAuthMode } from '@/utils/globals';
import { client } from '@/graphqlClient';
import { UpdateCharityProfileMutation } from '@/types/api';
import { GraphQLQuery } from 'aws-amplify/api';
import useAuthToken from '@/hooks/useAuthToken';
import { updateCharityProfile } from '@/graphql/mutations';
import TextInput from '@/components/TextInput/TextInput';
import FormButton from '@/components/FormButton/FormButton';
import { isPostalCode } from 'validator';
import { useNavigate } from 'react-router-dom';

const PostcodeEdit: FC<PostcodeEditProps> = ({ postcode, name }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [postcodeError, setPostcodeError] = useState<string>();
  const [newPostcode, setNewPostcode] = useState(postcode);

  const { token: authToken } = useAuthToken();
  const { refetch } = useQuery({
    queryKey: [`updateProfilePostcode-${postcode}-${name}`],
    enabled: false,
    queryFn: async () => {
      const result = await client.graphql<GraphQLQuery<UpdateCharityProfileMutation>>({
        authMode: checkIfInTestEnvForAuthMode(),
        authToken,
        query: updateCharityProfile,
        variables: {
          key: 'postcode',
          value: newPostcode,
        },
      });

      return result;
    },
  });

  const onCancel = (): void => {
    setNewPostcode(postcode);
    setPostcodeError(undefined);
    setIsEditing(false);
  };

  const onSave = (): void => {
    if (isPostalCode(checkForStringAndReturnEmptyIfFalsy(newPostcode), 'GB')) {
      setPostcodeError(undefined);
      if (postcode !== newPostcode) {
        void refetch().then(({ isError }) => {
          if (!isError) {
            navigate('.', { replace: true, state: { postcode: newPostcode } });
            setIsEditing(false);
            setPostcodeError(undefined);
          } else {
            setPostcodeError('Postcode not found');
            setIsEditing(true);
          }
        });
      }
    } else {
      setPostcodeError('Invalid postcode');
    }
  };

  return (
    <div className={styles.postcodeSection}>
      <h2>Postcode</h2>
      {!isEditing ? (
        <InfoTable
          tableValues={{ Postcode: newPostcode }}
          editableKeys={['Postcode']}
          onEdit={() => setIsEditing(true)}
        />
      ) : (
        <div className={styles.postcodeEditContainer}>
          <TextInput
            ariaLabel="postcode"
            value={newPostcode}
            onChange={(value) => {
              setNewPostcode(value);
            }}
            errorMessage={postcodeError}
          />
          <div className={`${styles.postcodeButtons} ${postcodeError ? styles.marginTop : ''}`}>
            <FormButton
              className={styles.formButton}
              text="Save"
              theme={newPostcode ? 'formButtonGreen' : 'formButtonGreenDisabled'}
              onClick={onSave}
              disabled={!newPostcode}
              ariaLabel="save"
            />
            <FormButton
              className={styles.formButton}
              text="Cancel"
              theme="formButtonGrey"
              onClick={onCancel}
              ariaLabel="cancel"
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default PostcodeEdit;
