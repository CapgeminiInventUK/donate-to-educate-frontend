import { EditModeItemProps } from '@/types/props';
import { FC } from 'react';
import { useMediaQuery } from 'react-responsive';
import TextInput from '../TextInput/TextInput';
import styles from './InstitutionBanner.module.scss';
import { breakpoints } from '@/utils/globals';

const EditModeItem: FC<EditModeItemProps> = ({ icon, itemName, item, setBanner, placeholder }) => {
  const isMobile = useMediaQuery({ query: `(max-width: ${breakpoints.screenMedium})` });
  return (
    <li>
      <span>{icon}</span>
      <TextInput
        placeholder={placeholder}
        onChange={(value) => {
          setBanner &&
            setBanner((prevState) => ({
              ...prevState,
              [itemName]: value,
            }));
        }}
        ariaLabel={itemName}
        value={item}
        className={styles.noPaddingBottom}
        isLarge={!isMobile}
      />
    </li>
  );
};

export default EditModeItem;
