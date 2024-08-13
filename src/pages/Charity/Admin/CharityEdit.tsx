import { FC, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { ProfileItems, UpdateCharityProfileMutation } from '@/types/api';
import { updateCharityProfile } from '@/graphql/mutations';
import { GraphQLQuery } from 'aws-amplify/api';
import { ContentType } from '@/types/props';
import Paths from '@/config/paths';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import useAuthToken from '@/hooks/useAuthToken';
import { checkIfInTestEnvForAuthMode } from '@/utils/globals';
import { ItemsIconType } from '@/types/data';
import InstitutionEdit from '@/components/InstitutionAdminDashboard/InstitutionEdit/InstitutionEdit';
import {
  getKeyFromType,
  getPageContent,
} from '@/components/InstitutionAdminDashboard/InstitutionEdit/utils';

const CharityEdit: FC = () => {
  const { state } = useLocationStateOrRedirect<{
    type: ItemsIconType;
    profile: ProfileItems;
  }>(Paths.CHARITIES_CREATE_EDIT_PROFILE);
  const { type, profile } = state;

  const [items, setItems] = useState<Record<number, string[]>>(
    JSON.parse(profile?.items ?? '{}') as Record<number, string[]>
  );
  const { token: authToken } = useAuthToken();
  const { howItWorks, actionText } = getPageContent(type, 'charity');
  const [content, setContent] = useState<ContentType>({
    actionText,
    whatToExpect: howItWorks,
  });

  const { refetch, isError } = useQuery({
    queryKey: [`saveProfileCharity-${type}`],
    enabled: false,
    queryFn: async () => {
      const result = await client.graphql<GraphQLQuery<UpdateCharityProfileMutation>>({
        authMode: checkIfInTestEnvForAuthMode(),
        authToken,
        query: updateCharityProfile,
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
    <InstitutionEdit
      institutionType={'charity'}
      path={Paths.CHARITIES_CREATE_EDIT_PROFILE}
      items={items}
      setItems={setItems}
      type={type}
      content={content}
      setContent={setContent}
      refetch={refetch}
    />
  );
};

export default CharityEdit;
