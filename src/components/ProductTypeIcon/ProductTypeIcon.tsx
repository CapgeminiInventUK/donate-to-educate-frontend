import { FC } from 'react';
import styles from './ProductTypeIcon.module.scss';
import { convertNumberToCategory } from '../ItemList/getFullItemList';
import { Popover } from 'antd';
import ProductTypes from '@/assets/icons/ProductTypes';

interface ProductTypeIcon {
  productType: number;
}

const ProductTypeIcon: FC<ProductTypeIcon> = ({ productType }) => {
  return (
    <span key={productType} className={styles.productType}>
      <Popover content={convertNumberToCategory(productType)} trigger="hover">
        <span className={styles.innerSpan}>
          <ProductTypes type={productType} />
        </span>
      </Popover>
    </span>
  );
};
export default ProductTypeIcon;
