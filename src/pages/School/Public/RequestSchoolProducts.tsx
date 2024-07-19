import RequestItems from '@/components/RequestItems/RequestItems';
import Paths from '@/config/paths';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import type { ItemsIconType } from '@/types/data';
import type { FC } from 'react';

const RequestSchoolProducts: FC = () => {
  const { state } = useLocationStateOrRedirect<{
    type: ItemsIconType;
    id: string;
    name: string;
    postcode?: string;
  }>(Paths.HOME);
  const { type, id, name, postcode } = state;

  return (
    <RequestItems type={type} organisationType="school" id={id} name={`${name} - ${postcode}`} />
  );
};

export default RequestSchoolProducts;
