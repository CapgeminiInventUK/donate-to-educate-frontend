import { FC, useState } from 'react';
import styles from './ShowHide.module.scss';
import ShowEye from '@/assets/tiles/ShowEye';
import HideEye from '@/assets/tiles/HideEye';

const ShowHide: FC = () => {
  const [show, setShow] = useState(false);

  return (
    <div
      className={`${styles.pointer}`}
      onClick={(): void => {
        setShow(!show);
      }}
    >
      {show ? <ShowEye /> : <HideEye />}
    </div>
  );
};
export default ShowHide;
