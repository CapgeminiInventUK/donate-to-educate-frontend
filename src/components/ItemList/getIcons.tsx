import Heart from '@/assets/ItemList/Heart';
import Plus from '@/assets/ItemList/Plus';
import Arts from '@/assets/ItemList/Sections/Arts';
import Computing from '@/assets/ItemList/Sections/Computing';
import Sports from '@/assets/ItemList/Sections/Sports';
import Study from '@/assets/ItemList/Sections/Study';
import Toiletries from '@/assets/ItemList/Sections/Toiletries';
import Uniform from '@/assets/ItemList/Sections/Uniform';
import Tick from '@/assets/ItemList/Tick';
import type { ItemsIconType, SectionsIconType } from '@/types/data';

export const getItemsIcon = (type: ItemsIconType): JSX.Element => {
  switch (type) {
    case 'tick':
      return <Tick />;
    case 'heart':
      return <Heart />;
    case 'plus':
      return <Plus />;
  }
};

export const getSectionsIcon = (type: SectionsIconType): JSX.Element => {
  switch (type) {
    case 'Clothing and uniform':
      return <Uniform />;
    case 'Sports':
      return <Sports />;
    case 'Art and music':
      return <Arts />;
    case 'Study':
      return <Study />;
    case 'Toiletries':
      return <Toiletries />;
    case 'Computing and technology':
      return <Computing />;
  }
};
