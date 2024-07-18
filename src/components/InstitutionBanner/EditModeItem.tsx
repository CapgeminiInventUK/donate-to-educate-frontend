import type { EditModeItemProps } from '@/types/props';
import { breakpoints } from '@/utils/globals';
import type { FC } from 'react';
import { useMediaQuery } from 'react-responsive';
import TextInput from '../TextInput/TextInput';
import styles from './InstitutionBanner.module.scss';

const EditModeItem: FC<EditModeItemProps> = ({ icon, itemName, item, setBanner, placeholder }) => {
  const isMobile = useMediaQuery({
    query: `(max-width: ${breakpoints.screenMedium})`,
  });
  return (
    <li>
      <span>{icon}</span>
      <TextInput
        placeholder={placeholder}
        onChange={(value) => {
          setBanner?.((prevState) => ({
            ...prevState,
            [itemName]: value,
          }));
        }}
        ariaLabel={itemName}
        value={item}
        className={styles.noMarginBottom}
        isLarge={!isMobile}
      />
    </li>
  );
};

export default EditModeItem;
