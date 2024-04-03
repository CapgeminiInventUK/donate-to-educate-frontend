import Heart from '@/assets/yourLocalArea/Heart';
import charity from '@/assets/yourLocalArea/charity.webp';
import Image from '@/components/Image/Image';
import Paths from '@/config/paths';

export default {
  icon: <Heart />,
  title: 'Find nearby charities',
  body: 'Find out what they stock or donate products',
  image: <Image alt="heart" image={charity} />,
  colour: 'midBlue',
  onClickLink: Paths.LOCAL_CHARITIES,
};
