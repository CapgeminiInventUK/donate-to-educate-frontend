import { FC } from 'react';
import styles from './InfoTable.module.scss';
import { InfoTableProps } from '@/types/props';
import Button from '../Button/Button';
import { checkForStringAndReturnEmptyIfFalsy } from '@/utils/globals';

const InfoTable: FC<InfoTableProps> = ({
  tableValues,
  editableKeys = [],
  isAccounts = false,
  isDelete = false,
  title,
  icon,
  className,
  rowClassName,
  onEdit,
  onDelete,
}) => {
  return (
    <div className={`${styles.infoTable} ${checkForStringAndReturnEmptyIfFalsy(className)}`}>
      {(title ?? icon) && (
        <h3>
          <span className={styles.icon}>{icon}</span>
          <span className={styles.title}>{title}</span>
        </h3>
      )}
      {Object.entries(tableValues).map(([key, value]) => (
        <div
          className={`${styles.row} ${checkForStringAndReturnEmptyIfFalsy(rowClassName)}`}
          key={key}
        >
          <div className={styles.key}>{key}</div>
          <div className={styles.value}>
            {value ? value : isAccounts && <span className={styles.pill}>FREE</span>}
          </div>
          {editableKeys.includes(key) && (
            <Button
              text="Edit"
              onClick={() => onEdit && onEdit()}
              className={styles.edit}
              theme="link"
              ariaLabel="edit-button"
            />
          )}
          {isDelete && (
            <Button
              text="Delete"
              theme="light"
              ariaLabel="delete-button"
              className={styles.delete}
              onClick={() => onDelete && onDelete()}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default InfoTable;
