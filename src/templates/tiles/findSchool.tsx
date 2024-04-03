import Hat from '@/assets/yourLocalArea/Hat';
import hatImg from '@/assets/yourLocalArea/hat.webp';
import Image from '@/components/Image/Image';
import Paths from '@/config/paths';

export default {
  icon: <Hat />,
  title: "Find your child's school",
  body: 'Request or donate products',
  image: <Image alt="hat" image={hatImg} />,
  colour: 'darkBlue',
  onClickLink: Paths.LOCAL_SCHOOLS,
};
