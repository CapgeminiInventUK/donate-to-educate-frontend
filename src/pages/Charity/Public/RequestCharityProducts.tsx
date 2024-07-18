import RequestItems from '@/components/RequestItems/RequestItems';
import Paths from '@/config/paths';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import type { ItemsIconType } from '@/types/data';
import type { FC } from 'react';

const RequestCharityProducts: FC = () => {
  const { state } = useLocationStateOrRedirect<{
    type: ItemsIconType;
    id: string;
    name: string;
    postcode?: string;
  }>(Paths.HOME);
  const { type, id, name } = state;

  return <RequestItems type={type} organisationType="charity" id={id} name={name} />;
};

export default RequestCharityProducts;
