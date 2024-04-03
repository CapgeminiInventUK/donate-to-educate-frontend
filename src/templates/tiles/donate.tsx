import Donate from '@/assets/yourLocalArea/Donate';
import Image from '@/components/Image/Image';
import donateImg from '@/assets/yourLocalArea/donate.webp';
import Paths from '@/config/paths';

export default {
  icon: <Donate />,
  title: 'Donate products',
  body: 'Support schools and charities in your area',
  image: <Image alt="donate" image={donateImg} />,
  colour: 'lightBlue',
  onClickLink: Paths.LOCAL_DONATE,
};
