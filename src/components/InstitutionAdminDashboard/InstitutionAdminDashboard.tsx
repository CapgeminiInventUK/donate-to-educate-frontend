import styles from './InstitutionAdminDashboard.module.scss';
import { FC, useState } from 'react';
import BackButton from '@/components/BackButton/BackButton';
import { InstitutionBanner } from '@/components/InstitutionBanner/InstitutionBanner';
import Hanger from '@/assets/school/Hanger';
import Heart from '@/assets/school/Heart';
import ExtraStock from '@/assets/school/ExtraStock';
import InformationTile from '@/components/InformationTile/InformationTile';
import EditableInformationTile from '@/components/EditableInformationTile/EditableInformationTile';
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
import { openNotification } from '@/utils/formComponents';
import ActionTile from '../ActionTile/ActionTile';

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
  const placeholderAboutText = `${name} has pre-loved school products to help children thrive at school.\n\nRequest the things you need ${type === 'school' ? 'or donate products' : ''} to help the next child. ${type === 'school' ? 'Charities' : 'You'} can also take our extra stock to share with the communities that need it most.`;

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
  const [showBuildProfileBanner, setShowBuildProfileBanner] = useState(true);

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
    openNotification();
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
    if (preview) {
      setPreview(false);
    } else if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    } else {
      navigate(-1);
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
              {showBuildProfileBanner && (
                <InformationTile
                  heading={type === 'school' ? "Build your school's profile" : 'Build your profile'}
                  subtext={
                    type === 'school'
                      ? 'Add, edit and save details about how your school can help children and the community.'
                      : 'Use your profile to tell visitors how your organisation can help children, schools, and the community get the needed products.'
                  }
                  dismiss={() =>
                    setShowBuildProfileBanner((showBuildProfileBanner) => !showBuildProfileBanner)
                  }
                />
              )}

              <EditableInformationTile
                editContent={toggleIsEditingAboutUs}
                onCancel={cancelAboutUs}
                saveOnClick={saveAboutUs}
                heading="About us"
                subtext={''}
                isEditing={isEditingAboutUs}
                text={about}
                setText={setAboutText}
              />

              <div className={styles.tilesWrapper}>
                <div className={styles.productsTilesContainer}>
                  <ActionTile
                    heading="Product requests"
                    subheading="Allow visitors to request products from you."
                    icon={<Hanger colour="white" />}
                    theme={request ? 'lightBlue' : 'grey'}
                    isAdmin={true}
                    buttonText={request ? 'Edit products' : 'Enable requests'}
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
                  ></ActionTile>
                  <ActionTile
                    heading="Accept donations"
                    subheading="Allow visitors to donate products to you."
                    icon={<Heart />}
                    theme={donate ? 'midBlue' : 'grey'}
                    isAdmin={true}
                    buttonText={donate ? 'Edit donations' : 'Enable donations'}
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
                  ></ActionTile>
                  <ActionTile
                    heading="Share extra stock"
                    subheading="Allow schools and charities to take extra stock off your hands."
                    icon={<ExtraStock colour="#050E33" />}
                    theme={excess ? 'darkBlue' : 'grey'}
                    isAdmin={true}
                    buttonText={request ? 'Edit extra stock' : 'Enable sharing'}
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
                  ></ActionTile>
                </div>
              </div>
              <div className={styles.actionButtons}>
                <FormButton
                  theme="formButtonGreen"
                  text="Continue"
                  ariaLabel="Continue"
                  fullWidth={true}
                  onClick={() =>
                    navigate(type === 'school' ? Paths.SCHOOL_VIEW : Paths.CHARITIES_VIEW)
                  }
                />
                <a onClick={() => setPreview(true)} className={styles.previewLink}>
                  Preview public profile
                </a>
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
