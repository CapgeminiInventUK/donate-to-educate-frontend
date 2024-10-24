import { FC } from 'react';
import Paths from '@/config/paths';
import RequestItems from '@/components/RequestItems/RequestItems';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import { InstitutionType, ItemsIconType } from '@/types/data';

const RequestCharityProducts: FC = () => {
  const { state } = useLocationStateOrRedirect<{
    type: ItemsIconType;
    id: string;
    name: string;
    postcode?: string;
  }>(Paths.HOME);
  const { type, id, name } = state;

  return (
    <RequestItems type={type} organisationType={InstitutionType.CHARITY} id={id} name={name} />
  );
};

export default RequestCharityProducts;
