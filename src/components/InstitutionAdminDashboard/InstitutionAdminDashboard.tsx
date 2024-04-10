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
import {
  CharityProfile,
  SchoolProfile,
  UpdateCharityProfileMutation,
  UpdateSchoolProfileMutation,
} from '@/types/api';
import LogoutButton from '../LogoutButton/LogoutButton';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from 'aws-amplify/api';
import { updateCharityProfile, updateSchoolProfile } from '@/graphql/mutations';
import PublicDashboard from '../PublicDashboard/PublicDashboard';
import ErrorBanner from '../ErrorBanner/ErrorBanner';
import { useStore } from '@/stores/useStore';

interface InstitutionAdminDashboardProps {
  type: 'school' | 'charity';
  name: string;
  profile: SchoolProfile | CharityProfile;
}

const InstitutionAdminDashboard: FC<InstitutionAdminDashboardProps> = ({ type, profile, name }) => {
  const { donate, excess, request, about: currentAbout, postcode, header } = profile;
  const navigate = useNavigate();
  const [about, setAbout] = useState(currentAbout ?? '');
  const [pageNumber, setPageNumber] = useState(0);
  const [isEditingAboutUs, setIsEditingAboutUs] = useState(false);
  const [preview, setPreview] = useState(false);
  const authToken = useStore((state) => state.user?.token);

  const { refetch, isError } = useQuery({
    queryKey: [`saveProfile-${about}-${type}-${name}`],
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
    void refetch();
    toggleIsEditingAboutUs();
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
              uniformPolicy={
                header && 'uniformPolicy' in header ? header?.uniformPolicy ?? undefined : undefined
              }
              address={header && 'address' in header ? header?.address ?? undefined : undefined}
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
                  icon={<Hanger height="2.875rem" width="2.875rem" colour={'#11356f'} />}
                  onClick={() =>
                    navigate(type === 'school' ? Paths.SCHOOL_EDIT : Paths.CHARITIES_EDIT, {
                      state: { type: 'tick', profile: request },
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
                      state: { type: 'heart', profile: donate },
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
                      state: { type: 'plus', profile: excess },
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
