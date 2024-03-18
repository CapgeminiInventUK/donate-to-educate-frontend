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
import { SchoolProfile, UpdateSchoolProfileMutation } from '@/types/api';
import LogoutButton from '../LogoutButton/LogoutButton';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from 'aws-amplify/api';
import { updateSchoolProfile } from '@/graphql/mutations';
import useGetAuthToken from '@/hooks/useGetAuthToken';
import PublicDashboard from '../PublicDashboard/PublicDashboard';

interface InstitutionAdminDashboardProps {
  type: 'school' | 'charity';
  name: string;
  profile: SchoolProfile;
}

const InstitutionAdminDashboard: FC<InstitutionAdminDashboardProps> = ({ type, profile, name }) => {
  const { donate, excess, request, about: currentAbout, postcode, header } = profile;
  const navigate = useNavigate();
  const [about, setAbout] = useState(currentAbout ?? '');
  const [pageNumber, setPageNumber] = useState(0);
  const [isEditingAboutUs, setIsEditingAboutUs] = useState(false);
  const [preview, setPreview] = useState(false);
  const authToken = useGetAuthToken();

  const { refetch } = useQuery({
    queryKey: ['saveProfile'],
    enabled: false,
    queryFn: async () => {
      const result = await client.graphql<GraphQLQuery<UpdateSchoolProfileMutation>>({
        authMode: 'userPool',
        authToken,
        query: updateSchoolProfile,
        variables: {
          key: 'about',
          value: about,
        },
      });

      return result;
    },
  });

  const toggleIsEditingAboutUs = (): void => {
    setIsEditingAboutUs((isEditingAboutUs) => !isEditingAboutUs);
  };

  const saveAboutUs = (): void => {
    // eslint-disable-next-line no-console
    refetch().catch(console.error);
    toggleIsEditingAboutUs();
  };

  const onBackButtonClick = (): void => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.actionButtons}>
          <BackButton onClick={onBackButtonClick} theme="blue" />
          <LogoutButton />
        </div>
        {!preview && (
          <>
            <InstitutionBanner
              isAdminView
              type={type}
              name={name}
              phone={header?.phone ?? undefined}
              email={header?.email ?? undefined}
              website={header?.website ?? undefined}
              uniformPolicy={header?.uniformPolicy ?? undefined}
            />
            <div className={styles.card}>
              <InformationTile
                heading={type === 'school' ? "Build your school's profile" : 'Build your profile'}
                subtext={
                  type === 'school'
                    ? 'Add, edit and save details about how your school can help children and the community.'
                    : 'Use your profile to tell visitors how your organisation can help children, schools, and the community get the needed products.'
                }
              />

              <EditableInformationTile
                onClick={toggleIsEditingAboutUs}
                saveOnClick={saveAboutUs}
                heading="About us"
                subtext={''}
                isEditing={isEditingAboutUs}
                text={about}
                setText={setAbout}
              />

              <div className={styles.productsTilesContainer}>
                <AdminActionTile
                  type="tick"
                  isPresent={!!request}
                  heading="Let visitors request products from you"
                  icon={<Hanger height="2.875rem" width="2.875rem" />}
                  onClick={() =>
                    navigate(type === 'school' ? Paths.SCHOOL_EDIT : Paths.CHARITIES_EDIT, {
                      state: { type: 'tick' },
                    })
                  }
                />
                <AdminActionTile
                  type="heart"
                  isPresent={!!donate}
                  heading="Let visitors donate products to you"
                  icon={<Heart height="2.875rem" width="2.875rem" colour="#11356f" />}
                  onClick={() =>
                    navigate(type === 'school' ? Paths.SCHOOL_EDIT : Paths.CHARITIES_EDIT, {
                      state: { type: 'heart' },
                    })
                  }
                />
              </div>
              <div className={styles.extraStockTileContainer}>
                <AdminActionTile
                  type="plus"
                  isPresent={!!excess}
                  heading="Let charities take your extra stock to share with the community"
                  icon={<ExtraStock height="2.875rem" width="2.875rem" colour="#11356f" />}
                  onClick={() =>
                    navigate(type === 'school' ? Paths.SCHOOL_EDIT : Paths.CHARITIES_EDIT, {
                      state: { type: 'plus' },
                    })
                  }
                />
              </div>
              <div className={styles.actionButtons}>
                <FormButton
                  theme="formButtonGreen"
                  text="Save profile and continue"
                  ariaLabel="save profile and continue"
                  onClick={() =>
                    navigate(type === 'school' ? Paths.SCHOOL_VIEW : Paths.CHARITIES_VIEW, {
                      state: { name, postcode },
                    })
                  }
                />
                <FormButton
                  theme="formButtonMidBlue"
                  text="Preview profile"
                  ariaLabel="preview profile"
                  onClick={() => setPreview(true)}
                />
              </div>
            </div>
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
              header={header}
              setPreview={setPreview}
              postcode={postcode}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default InstitutionAdminDashboard;
