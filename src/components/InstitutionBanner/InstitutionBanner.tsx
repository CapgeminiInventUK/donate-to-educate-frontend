import { FC, useState } from 'react';
import styles from './InstitutionBanner.module.scss';
import Telephone from '@/assets/school/Telephone';
import Email from '@/assets/school/EmailWhite';
import Globe from '@/assets/school/Globe';
import House from '@/assets/school/House';
import Button from '../Button/Button';
import InterfaceArrowTopRight from '@/assets/school/InterfaceArrowTopRight';
import { InstitutionBannerProps } from '@/types/props';
import EditIcon from '@/assets/school/EditIcon';
import FormButton from '../FormButton/FormButton';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from 'aws-amplify/api';
import { UpdateCharityProfileMutation, UpdateSchoolProfileMutation } from '@/types/api';
import { updateCharityProfile, updateSchoolProfile } from '@/graphql/mutations';
import ErrorBanner from '../ErrorBanner/ErrorBanner';
import CancelButton from '../CancelButton/CancelButton';
import { Link } from 'react-router-dom';
import useAuthToken from '@/hooks/useAuthToken';
import AdminView from './AdminView';
import BannerItem from './BannerItem';

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
        authMode: 'userPool',
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
      {hasContactInfo(
        banner?.phone,
        banner?.email,
        banner?.website,
        banner?.uniformPolicy,
        banner?.address,
        isAdminView
      ) && (
        <div className={styles.textContainer}>
          {isAdminView && (
            <>
              <AdminView banner={banner} type={type} editMode={isEditMode} setBanner={setBanner} />
              {!isEditMode ? (
                <FormButton
                  text={
                    <div className={styles.editDiv}>
                      <EditIcon />
                      <span className={styles.editButtonText}>Edit</span>
                    </div>
                  }
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
            </>
          )}
          {!isAdminView && (
            <>
              {(banner?.phone ?? banner?.email ?? banner?.website) && (
                <ul>
                  {banner.phone && (
                    <BannerItem
                      icon={<Telephone />}
                      item={banner.phone}
                      itemType="tel"
                      defaultText=""
                    />
                  )}
                  {banner.email && (
                    <BannerItem
                      icon={<Email />}
                      item={banner.email}
                      itemType="mail"
                      defaultText=""
                    />
                  )}
                  {banner.website && (
                    <BannerItem
                      icon={<Globe />}
                      item={banner.website}
                      itemType="url"
                      defaultText=""
                    />
                  )}
                </ul>
              )}

              {(banner?.uniformPolicy ?? banner?.address) && (
                <ul>
                  {type === 'school' && banner.uniformPolicy && (
                    <>
                      <Link
                        className={styles.uniformPolicyButton}
                        to={banner.uniformPolicy}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div>
                          <span className={styles.buttonLabel}>View uniform policy</span>
                          <InterfaceArrowTopRight className={styles.interfaceArrow} />
                        </div>
                      </Link>
                    </>
                  )}
                  {type === 'charity' && banner.address && (
                    <li>
                      <span>
                        <House />
                      </span>
                      <p className={styles.item}>{banner.address ?? ''}</p>
                    </li>
                  )}
                </ul>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

const hasContactInfo = (
  phone?: string,
  email?: string,
  website?: string,
  uniformPolicy?: string,
  address?: string,
  isAdminView?: boolean
): boolean => {
  return (
    phone !== undefined ||
    email !== undefined ||
    website !== undefined ||
    uniformPolicy !== undefined ||
    address !== undefined ||
    isAdminView === true
  );
};
