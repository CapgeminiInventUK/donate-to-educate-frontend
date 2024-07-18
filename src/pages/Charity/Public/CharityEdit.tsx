import ItemSelection from '@/components/ItemSelection/ItemSelection';
import Paths from '@/config/paths';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import type { ProfileItems } from '@/types/api';
import { checkForStringAndReturnEmptyIfFalsy } from '@/utils/globals';
import type { FC } from 'react';

const CharityEdit: FC = () => {
  const { state } = useLocationStateOrRedirect<{
    profile: ProfileItems;
    name: string;
    id: string;
    previewMode?: boolean;
  }>(Paths.CHARITY_DASHBOARD);

  const { profile, id, name, previewMode } = state ?? {};
  const { items, actionText, whatToExpect } = profile ?? {};

  const parsedItems = JSON.parse(items ?? '{}') as Record<number, string[]>;

  return (
    <ItemSelection
      schoolOrCharity="charity"
      items={parsedItems}
      whatToExpect={checkForStringAndReturnEmptyIfFalsy(whatToExpect)}
      actionText={checkForStringAndReturnEmptyIfFalsy(actionText)}
      id={id}
      name={name}
      previewMode={previewMode}
    />
  );
};

export default CharityEdit;
