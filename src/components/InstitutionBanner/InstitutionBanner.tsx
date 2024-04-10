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
import ErrorBanner from '../ErrorBanner/ErrorBanner';
import CancelButton from '../CancelButton/CancelButton';
import { Link } from 'react-router-dom';
import { Banner } from '@/types/data';
import useAuthToken from '@/hooks/useAuthToken';

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
              {getAdminView(banner, type, isEditMode, setBanner)}
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
                  {banner.phone && getBannerItem(<Telephone />, banner.phone, 'tel', '')}
                  {banner.email && getBannerItem(<Email />, banner.email, 'mail', '')}
                  {banner.website && getBannerItem(<Globe />, banner.website, 'url', '')}
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

const getAdminView = (
  banner: Banner,
  type: string,
  editMode: boolean,
  setBanner?: React.Dispatch<React.SetStateAction<Banner>>
): JSX.Element => {
  const { phone, email, website, uniformPolicy, address } = banner;
  return (
    <div className={styles.textContainer}>
      {!editMode ? (
        <>
          <ul>
            {getBannerItem(<Telephone />, phone, 'tel', "You haven't added your phone number")}
            {getBannerItem(<Email />, email, 'mail', "You haven't added your email")}
            {getBannerItem(<Globe />, website, 'url', "You haven't added your website")}
          </ul>
          <ul>
            {type === 'school' &&
              getBannerItem(
                <SchoolHat />,
                uniformPolicy,
                'url',
                "You haven't added your school's uniform policy"
              )}
            {type === 'charity' && (
              <li>
                <span>
                  <House />
                </span>
                <p className={styles.item}>{address ?? 'Address not given'}</p>
              </li>
            )}
          </ul>
        </>
      ) : (
        <>
          <ul>
            {getEditModeItem(<Telephone />, 'phone', phone, setBanner)}
            {getEditModeItem(<Email />, 'email', email, setBanner)}
            {getEditModeItem(<Globe />, 'website', website, setBanner)}
          </ul>

          <ul>
            {type === 'school' &&
              getEditModeItem(<SchoolHat />, 'uniformPolicy', uniformPolicy, setBanner)}
            {type === 'charity' && getEditModeItem(<House />, 'address', address, setBanner)}
          </ul>
        </>
      )}
    </div>
  );
};

const getEditModeItem = (
  icon: JSX.Element,
  itemName: string,
  item: string | undefined,
  setBanner?: React.Dispatch<React.SetStateAction<Banner>>
): JSX.Element => {
  return (
    <li>
      <span>{icon}</span>
      <TextInput
        onChange={(value) => {
          setBanner &&
            setBanner((prevState) => ({
              ...prevState,
              [itemName]: value,
            }));
        }}
        ariaLabel={itemName}
        value={item}
        className={styles.noPaddingBottom}
      />
    </li>
  );
};

const getBannerItem = (
  icon: JSX.Element,
  item: string | undefined,
  itemType: string,
  defaultText: string
): JSX.Element => {
  return (
    <li>
      <span>{icon}</span>
      {item ? (
        <Link
          to={getLinkFromType(itemType, item)}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.item}
        >
          {item}
        </Link>
      ) : (
        <p className={styles.item}>{defaultText}</p>
      )}
    </li>
  );
};

const getLinkFromType = (type: string, item?: string): string => {
  switch (type) {
    case 'tel':
      return `tel: ${item}`;
    case 'mail':
      return `mailto: ${item}`;
    default:
      return item?.includes('https://') === true || item?.includes('http://') == true
        ? `${item}`
        : `https://${item}`;
  }
};
