import { FC, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { ProfileItems, UpdateSchoolProfileMutation } from '@/types/api';
import { updateSchoolProfile } from '@/graphql/mutations';
import { GraphQLQuery } from 'aws-amplify/api';
import { ContentType } from '@/types/props';
import Paths from '@/config/paths';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import useAuthToken from '@/hooks/useAuthToken';
import { checkIfInTestEnvForAuthMode } from '@/utils/globals';
import { InstitutionType, ItemsIconType } from '@/types/data';
import {
  getKeyFromType,
  getPageContent,
} from '@/components/InstitutionAdminDashboard/ProductsListPage/utils';
import ProductsListPage from '@/components/InstitutionAdminDashboard/ProductsListPage/ProductsListPage';

const SchoolEdit: FC = () => {
  const { state } = useLocationStateOrRedirect<{ type: ItemsIconType; profile: ProfileItems }>(
    Paths.SCHOOLS_CREATE_EDIT_PROFILE
  );
  const { type, profile } = state;

  const [items, setItems] = useState<Record<number, string[]>>(
    JSON.parse(profile?.items ?? '{}') as Record<number, string[]>
  );
  const { token: authToken } = useAuthToken();
  const { howItWorks, actionText } = getPageContent(type, InstitutionType.SCHOOL);
  const [content, setContent] = useState<ContentType>({
    actionText,
    whatToExpect: howItWorks,
  });

  const { refetch, isError } = useQuery({
    queryKey: [`saveProfileSchool-${type}`],
    enabled: false,
    queryFn: async () => {
      const result = await client.graphql<GraphQLQuery<UpdateSchoolProfileMutation>>({
        authMode: checkIfInTestEnvForAuthMode(),
        authToken,
        query: updateSchoolProfile,
        variables: {
          key: getKeyFromType(type),
          value: JSON.stringify({
            ...content,
            items: JSON.stringify(items),
            productTypes: Object.keys(items),
          }),
        },
      });

      return result;
    },
  });

  if (isError) {
    return <ErrorBanner />;
  }

  return (
    <ProductsListPage
      institutionType={InstitutionType.SCHOOL}
      path={Paths.SCHOOLS_CREATE_EDIT_PROFILE}
      items={items}
      setItems={setItems}
      type={type}
      content={content}
      setContent={setContent}
      refetch={refetch}
    />
  );
};

export default SchoolEdit;
