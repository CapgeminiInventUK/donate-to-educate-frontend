import Hat from '@/assets/yourLocalArea/Hat';
import school from '@/assets/yourLocalArea/school.png';
import Image from '@/components/Image/Image';
import Paths from '@/config/paths';

export default {
  icon: <Hat />,
  title: "Find your child's school",
  body: 'Request or donate products',
  image: <Image alt="hat" image={school} />,
  colour: 'darkBlue',
  onClickLink: Paths.LOCAL_SCHOOLS,
};
