import { FC, useEffect, useState } from 'react';
import styles from './CharityAdminView.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import { useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import FormButton from '@/components/FormButton/FormButton';
import { InstitutionBanner } from '@/components/InstitutionBanner/InstitutionBanner';
import TextInput from '@/components/TextInput/TextInput';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { updateCharityProfile } from '@/graphql/mutations';
import { GetCharityProfileQuery, UpdateCharityProfileMutation } from '@/types/api';
import { GraphQLQuery } from 'aws-amplify/api';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import { useStore } from '@/stores/useStore';
import { getCharityProfile } from '@/graphql/queries';
import Spinner from '@/components/Spinner/Spinner';
import { isPostalCode } from 'validator';
import SchoolProfile from '@/assets/admin/SchoolProfile';
import Postcode from '@/assets/icons/Postcode';
import useAuthToken from '@/hooks/useAuthToken';
import Tile from '@/components/Tile/Tile';
import Card from '@/components/Card/Card';
import { useMediaQuery } from 'react-responsive';
import { breakpoints, checkIfInTestEnvForAuthMode } from '@/utils/globals';
import School from '@/assets/icons/School';
import Heart from '@/assets/icons/Heart';
import Donate from '@/assets/icons/Donate';
import Stock from '@/assets/icons/Stock';

const CharityView: FC = () => {
  const user = useStore((state) => state.user);
  const { name, id } = user ?? {};
  const [edit, setEdit] = useState(false);
  const isMobile = useMediaQuery({ query: `(max-width: ${breakpoints.screenLarge})` });

  const {
    isLoading,
    data,
    isError,
    refetch: charityProfileRefetch,
  } = useQuery({
    queryKey: [`getProfile-${name}-${id}`],
    enabled: user !== undefined,
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetCharityProfileQuery>>({
        query: getCharityProfile,
        variables: {
          name,
          id,
        },
      });

      return data;
    },
  });

  const [postcode, setPostcode] = useState<string>('');
  const [previousPostcode, setPreviousPostcode] = useState<string>('');
  const [postcodeError, setPostcodeError] = useState<string>();
  const navigate = useNavigate();
  const { token: authToken } = useAuthToken();

  useEffect(() => {
    if (data?.getCharityProfile?.postcode) {
      setPostcode(data?.getCharityProfile.postcode);
    }
  }, [setPostcode, data?.getCharityProfile?.postcode]);

  const { refetch, isError: isRefetchError } = useQuery({
    queryKey: [`updateProfilePostcode-${postcode}-${name}`],
    enabled: false,
    queryFn: async () => {
      const result = await client.graphql<GraphQLQuery<UpdateCharityProfileMutation>>({
        authMode: checkIfInTestEnvForAuthMode(),
        authToken,
        query: updateCharityProfile,
        variables: {
          key: 'postcode',
          value: postcode,
        },
      });

      return result;
    },
  });

  useEffect(() => {
    if (isRefetchError) {
      setPostcodeError('Postcode not found');
      setEdit(true);
    } else {
      setPostcodeError(undefined);
    }
  }, [setPostcodeError, isRefetchError]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorBanner />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.actionButtons}>
        <BackButton theme="blue" onClick={() => navigate(Paths.HOME)} />
      </div>
      <InstitutionBanner type={'charity'} name={name} banner={{}} />
      <Card className={styles.subContainer}>
        <div className={styles.profileBanner}>
          <SchoolProfile />
          <h2>Your charity profile is active</h2>
          <p>View, edit and update your public facing profile.</p>
          <FormButton
            theme="formButtonGreen"
            text={'View and edit profile'}
            ariaLabel="view and edit profile"
            onClick={() => navigate(Paths.CHARITIES_CREATE_EDIT_PROFILE)}
          />
        </div>
        <div className={styles.postcodeContainer}>
          <Postcode />
          <h2>Your postcode</h2>
          <p>
            We will not display this specific postcode on your profile. This is to help Donate to
            Educate make you findable for local families, schools and charities. You can publicly
            display your address on your profile.
          </p>
          <div className={styles.buttons}>
            {!edit ? (
              <>
                <h2>{postcode ?? 'Postcode not given'}</h2>
                <FormButton
                  text={
                    <div className={styles.editDiv}>
                      <span className={styles.editButtonText}>Edit</span>
                    </div>
                  }
                  theme="formButtonDarkBlue"
                  onClick={() => {
                    setPreviousPostcode(postcode);
                    setEdit(true);
                  }}
                  ariaLabel="edit"
                  className={`${styles.editButton}  ${postcode ? styles.editPadding : ''}`}
                />
              </>
            ) : (
              <div className={styles.postcodeEditContainer}>
                <TextInput
                  ariaLabel="postcode"
                  value={postcode}
                  onChange={(postcode) => setPostcode(postcode)}
                  errorMessage={postcodeError}
                  isSmall={isMobile}
                />
                <div className={styles.postcodeButtons}>
                  <FormButton
                    className={styles.formButton}
                    text="Save"
                    theme={postcode ? 'formButtonGreen' : 'formButtonGreenDisabled'}
                    onClick={() => {
                      if (isPostalCode(postcode, 'GB')) {
                        setEdit(false);
                        setPostcodeError(undefined);
                        if (postcode !== previousPostcode) {
                          void refetch().then(() => void charityProfileRefetch());
                        }
                      } else {
                        setPostcodeError('Invalid postcode');
                      }
                    }}
                    disabled={!postcode}
                    ariaLabel="save"
                  />
                  <FormButton
                    className={styles.formButton}
                    text="Cancel"
                    theme="formButtonGrey"
                    onClick={() => {
                      setPostcode(previousPostcode);
                      setPostcodeError(undefined);
                      setEdit(false);
                    }}
                    ariaLabel="cancel"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        {postcode && !edit && (
          <div className={styles.localAreaContainer}>
            <h2>Your local area</h2>
            <div className={styles.tileRow}>
              <Tile
                title="Find a nearby school"
                onClick={() => navigate(Paths.LOCAL_SCHOOLS, { state: { postcode } })}
                body={['See products schools can provide to you or what donations they need']}
                icon={<School />}
                size="medium"
              />
              <Tile
                title="Find nearby charities"
                onClick={() => navigate(Paths.LOCAL_CHARITIES, { state: { postcode } })}
                body={['Find out what they stock, or donate products']}
                icon={<Heart />}
                size="medium"
              />
            </div>
            <div className={styles.tileRow}>
              <Tile
                title="Donate products"
                onClick={() => navigate(Paths.LOCAL_DONATE, { state: { postcode } })}
                body={['Support schools and charities in your area']}
                icon={<Donate />}
                size="medium"
              />
              <Tile
                title="Help take extra stock"
                onClick={() => navigate(Paths.LOCAL_EXCESS, { state: { postcode } })}
                body={[
                  'Sometimes schools and charities might have too much stock that urgently needs to find a new home. Help take it off their hands.',
                ]}
                icon={<Stock />}
                size="medium"
              />
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default CharityView;
