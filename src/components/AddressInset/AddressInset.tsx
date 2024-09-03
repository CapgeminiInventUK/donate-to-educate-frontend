import { FC } from 'react';
import { AddressInsetProps, CommonInputProps } from '@/types/props';
import { findFullValueFromFormData } from '@/utils/formUtils';
import styles from './AddressInset.module.scss';

const AddressInset: FC<AddressInsetProps> = ({ componentData, formData, addressDetails }) => {
  const { formMeta: { field = '' } = {} } = (componentData ?? {}) as CommonInputProps;
  const data = findFullValueFromFormData(formData, field);
  const { name, localAuthority, postcode, street, town } = addressDetails ?? data ?? {};

  if (!name && !localAuthority && !postcode) {
    return <></>;
  }

  return (
    <div aria-label={'address-inset'} className={styles.container}>
      {!!name && <p>{String(name)}</p>}
      {!!street && <p>{String(street)}</p>}
      {!!town && <p>{String(town)}</p>}
      {!!localAuthority && <p>{String(localAuthority)}</p>}
      {!!postcode && <p>{String(postcode)}</p>}
    </div>
  );
};

export default AddressInset;
