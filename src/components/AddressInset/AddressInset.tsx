import type { AddressInsetProps, CommonInputProps } from '@/types/props';
import { findFullValueFromFormData } from '@/utils/formUtils';
import type { FC } from 'react';
import styles from './AddressInset.module.scss';

const AddressInset: FC<AddressInsetProps> = ({ componentData, formData }) => {
  const {
    formMeta: { field = '' } = {},
  } = componentData as CommonInputProps;
  const data = findFullValueFromFormData(formData, field);
  const { name, localAuthority, postcode } = data ?? {};

  if (!name && !localAuthority && !postcode) {
    return <></>;
  }

  return (
    <div aria-label={'address-inset'} className={styles.container}>
      {!!name && <p>{String(name)}</p>}
      {!!localAuthority && <p>{String(localAuthority)}</p>}
      {!!postcode && <p>{String(postcode)}</p>}
    </div>
  );
};

export default AddressInset;
