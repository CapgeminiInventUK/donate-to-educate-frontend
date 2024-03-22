import { FC } from 'react';
import ItemSelection from '@/components/ItemSelection/ItemSelection';
import { useLocation } from 'react-router-dom';
import { ProfileItems } from '@/types/api';

const SchoolEdit: FC = () => {
  const location = useLocation();

  const { profile } = (location?.state as { profile: ProfileItems }) ?? {};
  const { items, actionText, whatToExpect } = profile ?? {};

  const parsedItems = JSON.parse(items ?? '{}') as Record<number, string[]>;
  return (
    <ItemSelection
      schoolOrCharity="school"
      items={parsedItems}
      actionText={actionText ?? ''}
      whatToExpect={whatToExpect ?? ''}
    />
  );
};

export default SchoolEdit;
