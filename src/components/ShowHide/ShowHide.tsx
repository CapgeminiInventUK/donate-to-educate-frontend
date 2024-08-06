import { FC, useState } from 'react';
import styles from './ShowHide.module.scss';
import ShowEye from '@/assets/tiles/ShowEye';
import HideEye from '@/assets/tiles/HideEye';
import { ShowHideProps } from '@/types/props';

const ShowHide: FC<ShowHideProps> = ({ onChangePasswordVisibility }) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className={`${styles.pointer}`}
      onClick={(): void => {
        onChangePasswordVisibility(!show);
        setShow(!show);
      }}
      aria-label="hide-show-password"
    >
      {show ? <HideEye /> : <ShowEye />}
    </div>
  );
};
export default ShowHide;
