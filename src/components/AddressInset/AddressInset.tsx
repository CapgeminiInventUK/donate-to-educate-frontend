import { FC } from 'react';
import { AddressInsetProps, CommonInputProps } from '@/types/props';
import { findFullValueFromFormData } from '@/utils/formUtils';
import styles from './AddressInset.module.scss';

const AddressInset: FC<AddressInsetProps> = ({ componentData, formData }) => {
  const { formMeta: { field = '' } = {} } = componentData as CommonInputProps;
  const data = findFullValueFromFormData(formData, field);

  if (!data) {
    return <></>;
  }
  const { name, localAuthority, postcode } = data;
  return (
    <div className={styles.container}>
      {!!name && <p>{String(name)}</p>}
      {!!localAuthority && <p>{String(localAuthority)}</p>}
      {!!postcode && <p>{String(postcode)}</p>}
    </div>
  );
};

export default AddressInset;
