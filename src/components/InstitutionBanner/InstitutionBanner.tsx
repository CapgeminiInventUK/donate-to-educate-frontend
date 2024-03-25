import { FC, useState } from 'react';
import styles from './InstitutionBanner.module.scss';
import SchoolHat from '@/assets/school/SchoolHat';
import Telephone from '@/assets/school/Telephone';
import Email from '@/assets/school/EmailWhite';
import Globe from '@/assets/school/Globe';
import House from '@/assets/school/House';
import Button from '../Button/Button';
import InterfaceArrowTopRight from '@/assets/school/InterfaceArrowTopRight';
import { InstitutionBannerProps } from '@/types/props';
import EditIcon from '@/assets/school/EditIcon';
import TextInput from '../TextInput/TextInput';
import FormButton from '../FormButton/FormButton';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from 'aws-amplify/api';
import { UpdateCharityProfileMutation, UpdateSchoolProfileMutation } from '@/types/api';
import { updateCharityProfile, updateSchoolProfile } from '@/graphql/mutations';
import useGetAuthToken from '@/hooks/useGetAuthToken';
import ErrorBanner from '../ErrorBanner/ErrorBanner';

export const InstitutionBanner: FC<InstitutionBannerProps> = ({
  isAdminView = false,
  phone,
  email,
  website,
  uniformPolicy,
  address,
  type,
  name,
  onClick,
}) => {
  const [isEditMode, toggleEditMode] = useState(false);
  const [banner, setBanner] = useState({
    phone,
    email,
    website,
    uniformPolicy,
    address,
  });
  const authToken = useGetAuthToken();

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
        banner.phone,
        banner.email,
        banner.website,
        banner.uniformPolicy,
        banner.address,
        isAdminView
      ) && (
        <div className={styles.textContainer}>
          <ul>
            {(banner.phone ?? isAdminView) && (
              <li>
                <span>
                  <Telephone />
                </span>
                {!isEditMode ? (
                  <p className={styles.italicized}>
                    {banner.phone ?? "You haven't added your phone number"}
                  </p>
                ) : (
                  <TextInput
                    onChange={(value) => {
                      setBanner((prevState) => ({
                        ...prevState,
                        phone: value,
                      }));
                    }}
                    ariaLabel="Phone Number"
                    value={banner.phone}
                  />
                )}
              </li>
            )}
            {(banner.email ?? isAdminView) && (
              <li>
                <span>
                  <Email />
                </span>
                {!isEditMode ? (
                  <p className={styles.italicized}>
                    {banner.email ?? "You haven't added your email"}
                  </p>
                ) : (
                  <TextInput
                    onChange={(value) => {
                      setBanner((prevState) => ({
                        ...prevState,
                        email: value,
                      }));
                    }}
                    ariaLabel="Email address"
                    value={banner.email}
                  />
                )}
              </li>
            )}
            {(website ?? isAdminView) && (
              <li>
                <span>
                  <Globe />
                </span>
                {!isEditMode ? (
                  <p className={styles.italicized}>
                    {banner.website ?? "You haven't added your website"}
                  </p>
                ) : (
                  <TextInput
                    onChange={(value) => {
                      setBanner((prevState) => ({
                        ...prevState,
                        website: value,
                      }));
                    }}
                    ariaLabel="website"
                    value={banner.website}
                  />
                )}
              </li>
            )}
          </ul>

          <ul>
            <li>
              {uniformPolicy && type === 'school' && !isAdminView && (
                <>
                  <span>
                    <SchoolHat />
                  </span>
                  <Button
                    theme="light"
                    className={styles.uniformPolicyButton}
                    text={
                      <div>
                        <span className={styles.buttonLabel}>View uniform policy</span>
                        <InterfaceArrowTopRight className={styles.interfaceArrow} />
                      </div>
                    }
                    ariaLabel="uniform policy"
                    onClick={() => (onClick ? onClick() : undefined)}
                  />
                </>
              )}
              {type === 'school' && isAdminView && (
                <>
                  <span>
                    <SchoolHat />
                  </span>
                  {!isEditMode ? (
                    <p className={styles.italicized}>
                      {banner.uniformPolicy ?? "You haven't added your school's uniform policy"}
                    </p>
                  ) : (
                    <TextInput
                      onChange={(value) => {
                        setBanner((prevState) => ({
                          ...prevState,
                          uniformPolicy: value,
                        }));
                      }}
                      ariaLabel="uniform policy"
                      value={banner.uniformPolicy}
                    />
                  )}
                </>
              )}
              {type === 'charity' && (
                <>
                  <span>
                    <House />
                  </span>
                  {!isEditMode ? (
                    <p className={styles.italicized}>{banner.address ?? 'Address not given'}</p>
                  ) : (
                    <TextInput
                      onChange={(value) => {
                        setBanner((prevState) => ({
                          ...prevState,
                          address: value,
                        }));
                      }}
                      ariaLabel="address"
                      value={banner.address}
                    />
                  )}
                </>
              )}
            </li>
            {isAdminView && (
              <li>
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
                  <FormButton
                    text="Save"
                    theme="formButtonGreen"
                    onClick={() => {
                      toggleEditMode(false);
                      void refetch();
                    }}
                    ariaLabel="save"
                  />
                )}
              </li>
            )}
          </ul>
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
