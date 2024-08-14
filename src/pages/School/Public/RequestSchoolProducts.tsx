import { FC } from 'react';
import Paths from '@/config/paths';
import RequestItems from '@/components/RequestItems/RequestItems';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import { InstitutionType, ItemsIconType } from '@/types/data';

const RequestSchoolProducts: FC = () => {
  const { state } = useLocationStateOrRedirect<{
    type: ItemsIconType;
    id: string;
    name: string;
    postcode?: string;
  }>(Paths.HOME);
  const { type, id, name, postcode } = state;

  return (
    <RequestItems
      type={type}
      organisationType={InstitutionType.SCHOOL}
      id={id}
      name={`${name} - ${postcode}`}
    />
  );
};

export default RequestSchoolProducts;
