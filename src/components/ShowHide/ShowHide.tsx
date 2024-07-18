import HideEye from '@/assets/tiles/HideEye';
import ShowEye from '@/assets/tiles/ShowEye';
import { type FC, useState } from 'react';
import styles from './ShowHide.module.scss';

interface ShowHideProps {
  onChangePasswordVisibility: (show: boolean) => void;
}

const ShowHide: FC<ShowHideProps> = ({ onChangePasswordVisibility }) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className={`${styles.pointer}`}
      onClick={(): void => {
        onChangePasswordVisibility(!show);
        setShow(!show);
      }}
    >
      {show ? <HideEye /> : <ShowEye />}
    </div>
  );
};
export default ShowHide;
