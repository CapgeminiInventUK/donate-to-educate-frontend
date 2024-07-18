import { updateCharityProfile, updateSchoolProfile } from '@/graphql/mutations';
import { client } from '@/graphqlClient';
import useAuthToken from '@/hooks/useAuthToken';
import type { UpdateCharityProfileMutation, UpdateSchoolProfileMutation } from '@/types/api';
import type { InstitutionBannerProps } from '@/types/props';
import { checkIfInTestEnvForAuthMode } from '@/utils/globals';
import { useQuery } from '@tanstack/react-query';
import type { GraphQLQuery } from 'aws-amplify/api';
import { type FC, useState } from 'react';
import Button from '../Button/Button';
import CancelButton from '../CancelButton/CancelButton';
import ErrorBanner from '../ErrorBanner/ErrorBanner';
import FormButton from '../FormButton/FormButton';
import AdminView from './AdminView';
import styles from './InstitutionBanner.module.scss';
import PublicView from './PublicView';
import { hasContactInfo } from './utils';

export const InstitutionBanner: FC<InstitutionBannerProps> = ({
  isAdminView = false,
  banner,
  setBanner,
  type,
  name,
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
        query: type === 'school' ? updateSchoolProfile : updateCharityProfile,
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
    setBanner?.(previousBanner);
    toggleEditMode(false);
  };

  const onSave = async (): Promise<void> => {
    toggleEditMode(false);
    await refetch().then(() => setPreviousBanner(banner));
  };

  return (
    <div className={`${styles.bannerContainer} ${styles[type]}`}>
      <h1>{name}</h1>
      {hasContactInfo(banner, isAdminView) && (
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
      )}
    </div>
  );
};
