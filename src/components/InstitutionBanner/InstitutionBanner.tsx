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

export const InstitutionBanner: FC<InstitutionBannerProps> = ({
  isAdminView = false,
  banner,
  setBanner,
  type,
  name,
}) => {
  const [isEditMode, toggleEditMode] = useState(false);
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
                        toggleEditMode(false);
                        void refetch();
                      }}
                      text="Save"
                      ariaLabel="save"
                    />
                    <CancelButton onClick={() => toggleEditMode(false)} theme={'white'} />
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
