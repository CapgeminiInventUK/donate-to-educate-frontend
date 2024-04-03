import Image from '@/components/Image/Image';
import excess from '@/assets/yourLocalArea/excess.webp';
import PackagePlusIcon from '@/assets/admin/PackagePlusIcon';
import Paths from '@/config/paths';

export default {
  icon: <PackagePlusIcon />,
  title: 'Help take extra stock',
  body: 'Sometimes schools and charities might have too much stock that urgently needs to find a new home. Help take it off their hands.',
  image: <Image alt="package" image={excess} />,
  colour: 'darkBlue',
  onClickLink: Paths.LOCAL_EXCESS,
};
