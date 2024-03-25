import { FC } from 'react';
import styles from './YourLocalArea.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import { useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import Hat from '@/assets/yourLocalArea/Hat';
import Heart from '@/assets/yourLocalArea/Heart';
import Donate from '@/assets/yourLocalArea/Donate';
import Image from '@/components/Image/Image';
import heartImg from '@/assets/yourLocalArea/heart.webp';
import donateImg from '@/assets/yourLocalArea/donate.webp';
import hatImg from '@/assets/yourLocalArea/hat.webp';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';

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

const tiles = [
  {
    icon: <Hat />,
    title: "Find your child's school",
    body: 'Request or donate products',
    image: <Image alt="hat" image={hatImg} />,
    colour: 'darkBlue',
    onClickLink: Paths.LOCAL_SCHOOLS,
  },
  {
    icon: <Heart />,
    title: 'Find nearby charities',
    body: 'Find out what they stock or donate products',
    image: <Image alt="heart" image={heartImg} />,
    colour: 'midBlue',
    onClickLink: Paths.LOCAL_CHARITIES,
  },
  {
    icon: <Donate />,
    title: 'Donate products',
    body: 'Support schools and charities in your area',
    image: <Image alt="donate" image={donateImg} />,
    colour: 'lightBlue',
    onClickLink: Paths.LOCAL_DONATE,
  },
];

export default YourLocalArea;
