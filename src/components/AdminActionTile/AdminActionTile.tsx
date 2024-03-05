import { FC } from 'react';
import styles from './AdminActionTile.module.scss';
import Button from '../Button/Button';
import { AdminActionTileProps } from '@/types/props';
import PlusIcon from '@/assets/school/PlusIcon';

const AdminActionTile: FC<AdminActionTileProps> = ({
  heading,
  icon,
  onClick,
}: AdminActionTileProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        {icon}
        <div>
          <h3>{heading}</h3>
        </div>
      </div>

      <div className={styles.buttonDiv}>
        <Button
          theme="darkBlue"
          className={styles.addSectionButton}
          onClick={onClick}
          text={
            <div className={styles.addSectionDiv}>
              <span className={styles.addSectionButtonText}>Add section</span>
              <PlusIcon />
            </div>
          }
          ariaLabel="add section"
        />
      </div>
    </div>
  );
};

export default AdminActionTile;
