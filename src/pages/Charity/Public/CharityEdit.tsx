import { FC } from 'react';
import ItemSelection from '@/components/ItemSelection/ItemSelection';
import { ProfileItems } from '@/types/api';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import Paths from '@/config/paths';

const CharityEdit: FC = () => {
  const { state } = useLocationStateOrRedirect<{ profile: ProfileItems; name: string; id: string }>(
    Paths.CHARITY_DASHBOARD
  );

  // eslint-disable-next-line no-console
  console.log('edit', state);

  const { profile, id, name } = state;
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
    />
  );
};

export default CharityEdit;
