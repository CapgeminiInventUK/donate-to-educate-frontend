import { FC } from 'react';
import styles from './Settings.module.scss';
import Caution from '@/assets/icons/Caution';
import InfoTable from '@/components/InfoTable/InfoTable';
import { UserDetails } from '@/types/data';
import { capitaliseFirstLetter, checkForStringAndReturnEmptyIfFalsy } from '@/utils/globals';

interface DangerZoneProps {
  userData: UserDetails;
  type?: string;
}

const DangerZone: FC<DangerZoneProps> = ({ userData, type }) => {
  const { name, institutionName, email } = userData;

  const typename =
    String(type) === 'localAuthority' ? 'Local authority' : capitaliseFirstLetter(String(type));

  const institution = String(type) === 'localAuthority' ? name : institutionName;

  const deleteTableData = {
    [typename]: String(institution),
    'Your account': checkForStringAndReturnEmptyIfFalsy(email),
  };

  return (
    <div className={styles.deleteSection}>
      <h2>Delete</h2>
      <InfoTable
        tableValues={deleteTableData}
        editableKeys={[]}
        isDelete={true}
        title="Danger zone"
        icon={<Caution />}
        className={styles.deleteTable}
        rowClassName={styles.deleteTableRow}
      />
    </div>
  );
};

export default DangerZone;
