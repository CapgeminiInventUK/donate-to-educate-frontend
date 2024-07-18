import ProductTypes from '@/assets/icons/ProductTypes';
import type { ProductTypeIconProps } from '@/types/props';
import { Popover } from 'antd';
import type { FC } from 'react';
import { convertNumberToCategory } from '../ItemList/getFullItemList';
import styles from './ProductTypeIcon.module.scss';

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
