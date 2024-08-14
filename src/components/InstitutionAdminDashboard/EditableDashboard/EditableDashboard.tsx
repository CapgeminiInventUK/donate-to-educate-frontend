import Card from '@/components/Card/Card';
import EditableInformationTile from '@/components/EditableInformationTile/EditableInformationTile';
import InformationTile from '@/components/InformationTile/InformationTile';
import { InstitutionBanner } from '@/components/InstitutionBanner/InstitutionBanner';
import { EditableDashboardProps } from '@/types/props';
import { FC, useState } from 'react';
import styles from '../InstitutionAdminDashboard.module.scss';
import useAuthToken from '@/hooks/useAuthToken';
import { UpdateCharityProfileMutation, UpdateSchoolProfileMutation } from '@/types/api';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from 'aws-amplify/api';
import { updateCharityProfile, updateSchoolProfile } from '@/graphql/mutations';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import { openNotification } from '@/utils/formComponents';
import Paths from '@/config/paths';
import { useNavigate } from 'react-router-dom';
import FormButton from '@/components/FormButton/FormButton';
import ActionTiles from './ActionTiles';
import { checkIfInTestEnvForAuthMode } from '@/utils/globals';
import { InstitutionType } from '@/types/data';

const EditableDashboard: FC<EditableDashboardProps> = ({
  banner,
  setBanner,
  type,
  name,
  about,
  setAbout,
  placeholderAboutText,
  profile,
  setPreview,
}) => {
  const navigate = useNavigate();
  const [showBuildProfileBanner, setShowBuildProfileBanner] = useState(true);
  const [previousAbout, setPreviousAbout] = useState<string>();
  const [isEditingAboutUs, setIsEditingAboutUs] = useState(false);

  const { token: authToken } = useAuthToken();

  const { refetch, isError } = useQuery({
    queryKey: [`saveProfile-${about ? about : placeholderAboutText}-${type}-${name}`],
    enabled: false,
    queryFn: async () => {
      const result = await client.graphql<
        GraphQLQuery<UpdateSchoolProfileMutation | UpdateCharityProfileMutation>
      >({
        authMode: checkIfInTestEnvForAuthMode(),
        authToken,
        query: type === InstitutionType.SCHOOL ? updateSchoolProfile : updateCharityProfile,
        variables: {
          key: 'about',
          value: about ? about : placeholderAboutText,
        },
      });

      return result;
    },
  });

  if (isError) {
    return <ErrorBanner />;
  }

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

  return (
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
            heading={
              type === InstitutionType.SCHOOL ? "Build your school's profile" : 'Build your profile'
            }
            subtext={
              type === InstitutionType.SCHOOL
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
          isEditing={isEditingAboutUs}
          text={about}
          setText={setAboutText}
        />
        <ActionTiles profile={profile} type={type} />
        <div className={styles.actionButtons}>
          <FormButton
            theme="formButtonGreen"
            text="Continue"
            ariaLabel="Continue"
            fullWidth={true}
            onClick={() =>
              navigate(type === InstitutionType.SCHOOL ? Paths.SCHOOL_VIEW : Paths.CHARITIES_VIEW)
            }
          />
          <a onClick={() => setPreview(true)} className={styles.previewLink}>
            Preview public profile
          </a>
        </div>
      </Card>
    </>
  );
};
export default EditableDashboard;
