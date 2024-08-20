import { CaretUpFilled, CaretDownFilled } from '@ant-design/icons';
import styles from '../JoinRequests.module.scss';
import { Pill } from '@/components/Pill/Pill';
import { PillColours } from '@/types/data';
import { JoinRequest } from '@/types/api';

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

export const getRequestsFromData = <T,>(data: T[], typeText: string): JSX.Element => {
  const items = data.length;
  const text = items === 1 ? ' request' : ' requests';
  return <Pill colour={PillColours.GREEN} text={`${items} ${typeText} ${text}`} />;
};

export const separateSchoolNameAndPostcode = (data: JoinRequest[] = []): JoinRequest[] => {
  return data.map((item) => {
    if (item.school) {
      const [schoolName, postCode] = item.school.split(' - ');

      return {
        ...item,
        school: schoolName,
        postcode: postCode,
      };
    }
    return item;
  });
};
