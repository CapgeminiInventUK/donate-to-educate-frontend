import { FC } from 'react';
import styles from './AdminActionTile.module.scss';
import Button from '../Button/Button';
import { AdminActionTileProps, FormButtonThemes } from '@/types/props';
import PlusIcon from '@/assets/school/PlusIcon';
import FormButton from '../FormButton/FormButton';

const AdminActionTile: FC<AdminActionTileProps> = ({
  heading,
  icon,
  onClick,
  isPresent,
  type,
}: AdminActionTileProps) => {
  return (
    <div className={`${styles.container} ${isPresent ? styles[type] : ''}`}>
      <div className={styles.heading}>
        {icon}
        <div>
          <h3>{heading}</h3>
        </div>
      </div>

      <div className={styles.buttonDiv}>
        {!isPresent && (
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
        )}
        {isPresent && (
          <FormButton
            theme={getButtonThemeFromType(type)}
            text="Edit"
            onClick={onClick}
            ariaLabel="edit"
          />
        )}
      </div>
    </div>
  );
};

const getButtonThemeFromType = (type: string): FormButtonThemes => {
  switch (type) {
    case 'tick':
      return 'formButtonMidBlue';
    case 'heart':
      return 'formButtonDarkBlue';
    case 'plus':
      return 'formButtonLightBlue';
    default:
      throw new Error(`Unknown type ${type}`);
  }
};
export default AdminActionTile;
