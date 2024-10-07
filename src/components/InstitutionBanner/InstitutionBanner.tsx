import { FC, useState } from 'react';
import styles from './InstitutionBanner.module.scss';
import Button from '../Button/Button';
import { InstitutionBannerProps } from '@/types/props';
import FormButton from '../FormButton/FormButton';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from 'aws-amplify/api';
import { UpdateCharityProfileMutation, UpdateSchoolProfileMutation } from '@/types/api';
import { updateCharityProfile, updateSchoolProfile } from '@/graphql/mutations';
import ErrorBanner from '../ErrorBanner/ErrorBanner';
import CancelButton from '../CancelButton/CancelButton';
import useAuthToken from '@/hooks/useAuthToken';
import AdminView from './AdminView';
import { checkIfInTestEnvForAuthMode } from '@/utils/globals';
import { hasContactInfo } from './utils';
import PublicView from './PublicView';
import Settings from '@/assets/icons/Settings';
import Paths from '@/config/paths';
import { Link } from 'react-router-dom';
import { InstitutionType } from '@/types/data';
import { useStore } from '@/stores/useStore';

export const InstitutionBanner: FC<InstitutionBannerProps> = ({
  isAdminView = false,
  banner,
  setBanner,
  type,
  name,
  postcode,
  isPublic,
  localAuthority,
  hasBorder = true,
}) => {
  const [isEditMode, toggleEditMode] = useState(false);
  const [previousBanner, setPreviousBanner] = useState(banner);
  const { token: authToken } = useAuthToken();

  const { refetch, isError } = useQuery({
    queryKey: [`saveBanner-${JSON.stringify(banner)}-${type}-${name}`],
    enabled: false,
    queryFn: async () => {
      const result = await client.graphql<
        GraphQLQuery<UpdateSchoolProfileMutation | UpdateCharityProfileMutation>
      >({
        authMode: checkIfInTestEnvForAuthMode(),
        authToken,
        query: type === InstitutionType.SCHOOL ? updateSchoolProfile : updateCharityProfile,
        variables: {
          key: 'header',
          value: JSON.stringify(banner),
        },
      });
      return result;
    },
  });

  if (isError) {
    return <ErrorBanner />;
  }

  const onCancel = (): void => {
    setBanner && setBanner(previousBanner);
    toggleEditMode(false);
  };

  const onSave = async (): Promise<void> => {
    toggleEditMode(false);
    await refetch().then(() => {
      setPreviousBanner(banner);
      void useStore.getState().getCurrentUser();
    });
  };

  return (
    <div
      className={`${styles.bannerContainer} ${styles[type]} ${isAdminView ? styles.adminView : ''} ${hasBorder ? styles.hasBorder : ''}`}
    >
      <h1>{name}</h1>
      {hasContactInfo(banner, isAdminView) ? (
        <div className={styles.textContainer}>
          {isAdminView && (
            <div className={styles.editSection}>
              <AdminView banner={banner} type={type} editMode={isEditMode} setBanner={setBanner} />
              {!isEditMode ? (
                <FormButton
                  text={<span className={styles.editButtonText}>Edit</span>}
                  theme="formButtonGrey"
                  onClick={() => toggleEditMode(true)}
                  ariaLabel="edit"
                />
              ) : (
                <>
                  <div className={styles.footerButtons}>
                    <Button
                      theme="darkBlue"
                      className={styles.saveButton}
                      onClick={() => {
                        void onSave();
                      }}
                      text="Save"
                      ariaLabel="save"
                    />
                    <CancelButton onClick={onCancel} theme={'white'} />
                  </div>
                </>
              )}
            </div>
          )}
          {!isAdminView && <PublicView banner={banner} type={type} />}
        </div>
      ) : (
        !isPublic && (
          <Link
            className={styles.settingsButton}
            to={Paths.SETTINGS}
            state={{ postcode, localAuthority }}
          >
            Settings <Settings />
          </Link>
        )
      )}
    </div>
  );
};
