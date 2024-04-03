import { FC } from 'react';
import styles from './YourLocalArea.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import { useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import findSchool from '@/templates/tiles/findSchool';
import findNearbyCharities from '@/templates/tiles/findNearbyCharities';
import donate from '@/templates/tiles/donate';

const YourLocalArea: FC = () => {
  const navigate = useNavigate();
  const { state } = useLocationStateOrRedirect<{ postcode: string }>(Paths.FIND_YOUR_COMMUNITY);

  return (
    <div className={styles.container}>
      <BackButton theme="blue" />
      <div className={styles.subContainer}>
        <h2>Your local area in {state.postcode.toUpperCase()}</h2>
        {tiles.map(({ icon, title, body, image, colour, onClickLink }) => {
          return (
            <div
              key={title}
              className={`${styles.tile} ${styles[colour]}`}
              onClick={() => navigate(onClickLink, { state: { postcode: state.postcode } })}
            >
              {icon}
              <div className={styles.content}>
                <h2 className={styles.header}>{title}</h2>
                <div>{body}</div>
              </div>
              {image}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const tiles = [findSchool, findNearbyCharities, donate];

export default YourLocalArea;
