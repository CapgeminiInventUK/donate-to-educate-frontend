import { FC } from 'react';
import styles from './ProductTypeIcon.module.scss';
import { convertNumberToCategory } from '../ItemList/getFullItemList';
import { Popover } from 'antd';
import ProductTypes from '@/assets/icons/ProductTypes';
import { ProductTypeIconProps } from '@/types/props';

const ProductTypeIcon: FC<ProductTypeIconProps> = ({ productType, colour }) => {
  return (
    <span key={productType} className={styles.productType}>
      <Popover content={convertNumberToCategory(productType)} trigger="hover">
        <span className={styles.innerSpan}>
          <ProductTypes type={productType} colour={colour} />
        </span>
      </Popover>
    </span>
  );
};
export default ProductTypeIcon;
