import { CaretDownFilled, CaretUpFilled } from '@ant-design/icons';
import styles from '../JoinRequests.module.scss';

export const getSortIcon = ({
  sortOrder,
}: {
  sortOrder: 'descend' | 'ascend' | null;
}): JSX.Element => {
  return (
    <div className={styles.sorters}>
      <CaretUpFilled className={sortOrder === 'ascend' ? styles.sortActive : ''} />
      <CaretDownFilled className={sortOrder === 'descend' ? styles.sortActive : ''} />
    </div>
  );
};

export const getRequestsFromData = <T,>(data: T[]): JSX.Element => {
  const items = data.length;
  const text = items === 1 ? ' request' : ' requests';
  return (
    <span className={styles.requestsLeftBorder}>
      {items}
      {text}
    </span>
  );
};
