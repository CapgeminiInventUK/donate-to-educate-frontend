import SchoolHat from '@/assets/school/SchoolHat';
import Telephone from '@/assets/school/Telephone';
import Email from '@/assets/school/EmailWhite';
import Globe from '@/assets/school/Globe';
import House from '@/assets/school/House';
import { Banner } from '@/types/data';

export const getIcon = (item: string): JSX.Element => {
  switch (item) {
    case 'phone':
      return <Telephone />;
    case 'email':
      return <Email />;
    case 'website':
      return <Globe />;
    case 'uniformPolicy':
      return <SchoolHat />;
    case 'address':
      return <House />;
    default:
      return <></>;
  }
};

export const getItemTypeString = (itemType: string): string => {
  switch (itemType) {
    case 'uniformPolicy':
      return "school's uniform policy";
    case 'address':
      return "charity's address";
    case 'phone':
      return 'phone number';
    default:
      return itemType;
  }
};

export const getLinkFromType = (type: string, item?: string): string => {
  switch (type) {
    case 'phone':
      return `tel: ${item}`;
    case 'mail':
      return `mailto: ${item}`;
    default:
      return item?.includes('https://') === true || item?.includes('http://') == true
        ? `${item}`
        : `https://${item}`;
  }
};

export const hasContactInfo = (banner: Banner, isAdminView?: boolean): boolean => {
  const { phone, email, website, uniformPolicy, address } = banner;
  return (
    phone !== undefined ||
    email !== undefined ||
    website !== undefined ||
    uniformPolicy !== undefined ||
    address !== undefined ||
    isAdminView === true
  );
};

export const getBannerKeys = (banner: Banner, type: 'school' | 'charity'): string[] => {
  return Object.keys(banner).filter((key) => {
    if (
      (type === 'school' && key !== 'address') ||
      (type === 'charity' && key !== 'uniformPolicy')
    ) {
      return key;
    }
  });
};
