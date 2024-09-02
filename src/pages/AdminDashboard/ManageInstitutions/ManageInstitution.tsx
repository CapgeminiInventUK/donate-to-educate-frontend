import { ManageInstitutionProps } from '@/types/props';
import { FC } from 'react';
import BackButton from '@/components/BackButton/BackButton';
import styles from './ManageInstitution.module.scss';
import { InstitutionType } from '@/types/data';
// import { GraphQLQuery } from 'aws-amplify/api';
// import { client } from '@/graphqlClient';
// import { useQuery } from '@tanstack/react-query';
// import { GetSchoolProfileQuery, GetCharityProfileQuery } from '@/types/api';
// import { getSchoolProfile, getCharityProfile } from '@/graphql/queries';
// import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
// import Spinner from '@/components/Spinner/Spinner';
import School from '@/assets/icons/School';
import Donate from '@/assets/icons/Donate';
import Phone from '@/assets/icons/Phone';
import Email from '@/assets/icons/email';
import RegisteredUsersSection from './RegisteredUsersSection';
import DangerZone from '@/pages/Settings/DangerZone';
import { checkForStringAndReturnEmptyIfFalsy } from '@/utils/globals';

const ManageInstitution: FC<ManageInstitutionProps> = ({ type, institutionProfile }) => {
  const content = {
    [InstitutionType.SCHOOL]: {
      icon: <School />,
      text: type,
    },
    [InstitutionType.CHARITY]: {
      icon: <Donate />,
      text: type,
    },
  };

  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ['registeredCharities'],
  //   queryFn: async () => {
  //     const { data } = await client.graphql<
  //       GraphQLQuery<GetSchoolProfileQuery | GetCharityProfileQuery>
  //     >({
  //       query: type === InstitutionType.SCHOOL ? getSchoolProfile : getCharityProfile,
  //       variables: {
  //         name: institutionProfile.name,
  //         id: institutionProfile.id,
  //       },
  //     });

  //     return data;
  //   },
  // });

  const userDetails = {
    name: 'John Doe',
    jobTitle: 'Software Engineer',
    email: `${type}@test.com`,
    phone: '072345543854',
    institutionName: institutionProfile.name,
    id: type === InstitutionType.CHARITY ? '12fb794a-8be7-4588-8180-29c47b38771a' : '125807',
    department: 'Computer Science',
    firstName: 'John',
    lastName: 'Doe',
  };

  // if (isLoading) {
  //   return <Spinner />;
  // }

  // if (isError) {
  //   return <ErrorBanner />;
  // }

  return (
    <div className={styles.container}>
      <BackButton theme="blue" />
      <div className={styles.body}>
        <div className={styles.log}>{content.school.icon}</div>
        <h1 className={styles.title}>{institutionProfile.name}</h1>
        <div className={styles.contactArea}>
          <div className={styles.contactAreaItem}>
            <Phone /> 01883234874
          </div>
          <div className={styles.contactAreaItem}>
            <Email /> email@ormiston.edu.ac.uk
          </div>
        </div>
        <div className={styles.addressArea}>
          <div>{checkForStringAndReturnEmptyIfFalsy(institutionProfile?.name)}</div>
          <div>{checkForStringAndReturnEmptyIfFalsy(institutionProfile?.street)}</div>
          <div>{checkForStringAndReturnEmptyIfFalsy(institutionProfile?.town)}</div>
          <div>{checkForStringAndReturnEmptyIfFalsy(institutionProfile?.localAuthority)}</div>
          <div>{checkForStringAndReturnEmptyIfFalsy(institutionProfile?.postcode)}</div>
        </div>
        <RegisteredUsersSection userData={userDetails} type={type} />
        <DangerZone userData={userDetails} type={type} />
      </div>
    </div>
  );
};
export default ManageInstitution;
