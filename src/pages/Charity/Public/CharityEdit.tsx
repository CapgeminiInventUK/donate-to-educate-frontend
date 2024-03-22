import { FC } from 'react';

import ItemSelection from '@/components/ItemSelection/ItemSelection';
import { useLocation } from 'react-router-dom';
import { ProfileItems } from '@/types/api';

const CharityEdit: FC = () => {
  const location = useLocation();

  const { profile } = (location?.state as { profile: ProfileItems }) ?? {};
  const { items, actionText, whatToExpect } = profile ?? {};

  const parsedItems = JSON.parse(items ?? '{}') as Record<number, string[]>;

  return (
    <ItemSelection
      schoolOrCharity="charity"
      items={parsedItems}
      whatToExpect={whatToExpect ?? ''}
      actionText={actionText ?? ''}
    />
  );
};

export default CharityEdit;
