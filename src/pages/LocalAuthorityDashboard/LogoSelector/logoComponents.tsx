import barking from '@assets/countyLogos/barking.svg';
import barnet from '@assets/countyLogos/barnet.svg';
import barnsley from '@assets/countyLogos/barnsley.svg';
import bath from '@assets/countyLogos/bath.svg';
import bedford from '@assets/countyLogos/bedford.svg';
import westSussex from '@assets/countyLogos/westSussex.svg';

const logoComponents: Record<string, React.ReactNode> = {
  'Barking and Dagenham': barking,
  Barnet: barnet,
  Barnsley: barnsley,
  'Bath and North East Somerset': bath,
  Bedford: bedford,
  'West Sussex': westSussex,
};

export default logoComponents;
