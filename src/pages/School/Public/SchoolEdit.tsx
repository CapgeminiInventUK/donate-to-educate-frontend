import { FC } from 'react';
import ItemSelection from '@/components/ItemSelection/ItemSelection';
import { ProfileItems } from '@/types/api';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import Paths from '@/config/paths';

const SchoolEdit: FC = () => {
  const { state } = useLocationStateOrRedirect<{
    profile: ProfileItems;
    name: string;
    id: string;
    previewMode?: boolean;
  }>(Paths.SCHOOLS_DASHBOARD);

  const { profile, id, name, previewMode } = state ?? {};
  const { items, actionText, whatToExpect } = profile ?? {};

  const parsedItems = JSON.parse(items ?? '{}') as Record<number, string[]>;
  return (
    <ItemSelection
      schoolOrCharity="school"
      items={parsedItems}
      actionText={actionText ?? ''}
      whatToExpect={whatToExpect ?? ''}
      id={id ?? ''}
      name={name ?? ''}
      previewMode={previewMode}
    />
  );
};

export default SchoolEdit;
