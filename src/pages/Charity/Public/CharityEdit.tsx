import { FC } from 'react';
import ItemSelection from '@/components/ItemSelection/ItemSelection';
import { ProfileItems } from '@/types/api';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import Paths from '@/config/paths';

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
      whatToExpect={whatToExpect ?? ''}
      actionText={actionText ?? ''}
      id={id ?? ''}
      name={name ?? ''}
      previewMode={previewMode}
    />
  );
};

export default CharityEdit;
