import styles from './InstitutionAdminDashboard.module.scss';
import { FC, useState } from 'react';
import BackButton from '@/components/BackButton/BackButton';
import { InstitutionBanner } from '@/components/InstitutionBanner/InstitutionBanner';
import Hanger from '@/assets/school/Hanger';
import Heart from '@/assets/school/Heart';
import ExtraStock from '@/assets/school/ExtraStock';
import InformationTile from '@/components/InformationTile/InformationTile';
import EditableInformationTile from '@/components/EditableInformationTile/EditableInformationTile';
import AdminActionTile from '@/components/AdminActionTile/AdminActionTile';
import FormButton from '@/components/FormButton/FormButton';
import { useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import { UpdateCharityProfileMutation, UpdateSchoolProfileMutation } from '@/types/api';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from 'aws-amplify/api';
import { updateCharityProfile, updateSchoolProfile } from '@/graphql/mutations';
import PublicDashboard from '../PublicDashboard/PublicDashboard';
import ErrorBanner from '../ErrorBanner/ErrorBanner';
import { Banner } from '@/types/data';
import { InstitutionAdminDashboardProps } from '@/types/props';
import useAuthToken from '@/hooks/useAuthToken';
import Card from '@/components/Card/Card';

const InstitutionAdminDashboard: FC<InstitutionAdminDashboardProps> = ({ type, profile, name }) => {
  const {
    donate,
    excess,
    request,
    about: currentAbout,
    postcode,
    header,
    name: organisationName,
    id,
  } = profile;
  const placeholderAboutText = `${name} has pre-loved school products to help children thrive at school.\nRequest the things you need ${type === 'school' ? 'or donate products' : ''} to help the next child. ${type === 'school' ? 'Charities' : 'You'} can also take our extra stock to share with the communities that need it most.`;

  const [banner, setBanner] = useState<Banner>({
    phone: header?.phone ?? undefined,
    email: header?.email ?? undefined,
    website: header?.website ?? undefined,
    uniformPolicy:
      header && 'uniformPolicy' in header ? header?.uniformPolicy ?? undefined : undefined,
    address: header && 'address' in header ? header?.address ?? undefined : undefined,
  });
  const navigate = useNavigate();
  const [about, setAbout] = useState(currentAbout ? currentAbout : placeholderAboutText);
  const [previousAbout, setPreviousAbout] = useState<string>();
  const [pageNumber, setPageNumber] = useState(0);
  const [isEditingAboutUs, setIsEditingAboutUs] = useState(false);
  const [preview, setPreview] = useState(false);
  const { token: authToken } = useAuthToken();

  const { refetch, isError } = useQuery({
    queryKey: [`saveProfile-${about ? about : placeholderAboutText}-${type}-${name}`],
    enabled: false,
    queryFn: async () => {
      const result = await client.graphql<
        GraphQLQuery<UpdateSchoolProfileMutation | UpdateCharityProfileMutation>
      >({
        authMode: 'userPool',
        authToken,
        query: type === 'school' ? updateSchoolProfile : updateCharityProfile,
        variables: {
          key: 'about',
          value: about ? about : placeholderAboutText,
        },
      });

      return result;
    },
  });

  const toggleIsEditingAboutUs = (): void => {
    !isEditingAboutUs && savePreviousAbout();
    setIsEditingAboutUs((isEditingAboutUs) => !isEditingAboutUs);
  };

  const saveAboutUs = (): void => {
    if (!about) {
      setAbout(placeholderAboutText);
    }
    void refetch();
    toggleIsEditingAboutUs();
  };

  const setAboutText = (text: string): void => {
    setAbout(text);
  };

  const cancelAboutUs = (): void => {
    previousAbout ? setAbout(previousAbout) : setAbout(placeholderAboutText);
    toggleIsEditingAboutUs();
  };

  const savePreviousAbout = (): void => {
    setPreviousAbout(about);
  };

  const onBackButtonClick = (): void => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
  };

  if (isError) {
    return <ErrorBanner />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.actionButtons}>
          <BackButton onClick={onBackButtonClick} theme="blue" />
        </div>
        {!preview && (
          <>
            <InstitutionBanner
              isAdminView
              type={type}
              name={name}
              banner={banner}
              setBanner={setBanner}
            />
            <Card className={styles.institutionCard}>
              <InformationTile
                heading={type === 'school' ? "Build your school's profile" : 'Build your profile'}
                subtext={
                  type === 'school'
                    ? 'Add, edit and save details about how your school can help children and the community.'
                    : 'Use your profile to tell visitors how your organisation can help children, schools, and the community get the needed products.'
                }
              />

              <EditableInformationTile
                editContent={toggleIsEditingAboutUs}
                onCancel={cancelAboutUs}
                saveOnClick={saveAboutUs}
                heading="About us"
                subtext={''}
                isEditing={isEditingAboutUs}
                text={about}
                setText={setAboutText}
                // onFocus={savePreviousAbout}
              />

              <div className={styles.productsTilesContainer}>
                <AdminActionTile
                  type="tick"
                  isPresent={!!request}
                  heading="Let visitors request products from you"
                  icon={<Hanger height="2.875rem" width="2.875rem" colour={'#11356f'} />}
                  onClick={() =>
                    navigate(type === 'school' ? Paths.SCHOOL_EDIT : Paths.CHARITIES_EDIT, {
                      state: {
                        type: 'tick',
                        profile: request,
                        name: organisationName,
                        id,
                        postcode,
                      },
                    })
                  }
                />
                <AdminActionTile
                  type="heart"
                  isPresent={!!donate}
                  heading="Let visitors donate products to you"
                  icon={
                    <Heart
                      height="2.875rem"
                      width="2.875rem"
                      colour={donate ? '#FEFCFD' : '#11356f'}
                    />
                  }
                  onClick={() =>
                    navigate(type === 'school' ? Paths.SCHOOL_EDIT : Paths.CHARITIES_EDIT, {
                      state: {
                        type: 'heart',
                        profile: donate,
                        name: organisationName,
                        id,
                        postcode,
                      },
                    })
                  }
                />
              </div>
              <div className={styles.extraStockTileContainer}>
                <AdminActionTile
                  type="plus"
                  isPresent={!!excess}
                  heading="Let charities take your extra stock to share with the community"
                  subheading="Charities can take our extra products to share them with people who need it."
                  icon={
                    <ExtraStock
                      height="2.875rem"
                      width="2.875rem"
                      colour={excess ? '#FEFCFD' : '#11356f'}
                    />
                  }
                  onClick={() =>
                    navigate(type === 'school' ? Paths.SCHOOL_EDIT : Paths.CHARITIES_EDIT, {
                      state: {
                        type: 'plus',
                        profile: excess,
                        name: organisationName,
                        id,
                        postcode,
                      },
                    })
                  }
                />
              </div>
              <div className={styles.actionButtons}>
                <FormButton
                  theme="formButtonGreen"
                  text="Continue"
                  ariaLabel="Continue"
                  onClick={() =>
                    navigate(type === 'school' ? Paths.SCHOOL_VIEW : Paths.CHARITIES_VIEW)
                  }
                />
                <FormButton
                  theme="formButtonMidBlue"
                  text="Preview profile"
                  ariaLabel="preview profile"
                  onClick={() => setPreview(true)}
                />
              </div>
            </Card>
          </>
        )}
        {preview && (
          <>
            <PublicDashboard
              type={type}
              name={name}
              excess={excess}
              donate={donate}
              request={request}
              about={about}
              header={header && { ...banner, __typename: header?.__typename }}
              setPreview={setPreview}
              postcode={postcode}
              organisationId={id}
              organisationName={organisationName}
              previewMode={preview}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default InstitutionAdminDashboard;
