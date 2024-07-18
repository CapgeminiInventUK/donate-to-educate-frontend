import ItemSelection from '@/components/ItemSelection/ItemSelection';
import Paths from '@/config/paths';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import type { ProfileItems } from '@/types/api';
import { checkForStringAndReturnEmptyIfFalsy } from '@/utils/globals';
import type { FC } from 'react';

const SchoolEdit: FC = () => {
  const { state } = useLocationStateOrRedirect<{
    profile: ProfileItems;
    name: string;
    id: string;
    previewMode?: boolean;
    postcode?: string;
  }>(Paths.SCHOOLS_DASHBOARD);

  const { profile, id, name, previewMode, postcode } = state ?? {};
  const { items, actionText, whatToExpect } = profile ?? {};

  const parsedItems = JSON.parse(items ?? '{}') as Record<number, string[]>;
  return (
    <ItemSelection
      schoolOrCharity="school"
      items={parsedItems}
      actionText={checkForStringAndReturnEmptyIfFalsy(actionText)}
      whatToExpect={checkForStringAndReturnEmptyIfFalsy(whatToExpect)}
      id={checkForStringAndReturnEmptyIfFalsy(id)}
      name={checkForStringAndReturnEmptyIfFalsy(name)}
      previewMode={previewMode}
      postcode={postcode}
    />
  );
};

export default SchoolEdit;
