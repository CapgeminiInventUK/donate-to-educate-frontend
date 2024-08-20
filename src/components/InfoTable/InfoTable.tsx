import { FC, useState } from 'react';
import styles from './InfoTable.module.scss';
import { InfoTableProps } from '@/types/props';
import Button from '../Button/Button';
import { checkForStringAndReturnEmptyIfFalsy } from '@/utils/globals';
import EditingRow from './EditingRow';

const InfoTable: FC<InfoTableProps> = ({
  originalTableValues,
  editableKeys = [],
  isAccounts = false,
  isDelete = false,
  title,
  icon,
  className,
  rowClassName,
  onEdit,
  onDelete,
  onChange,
  refetch,
}) => {
  const [editingKey, setEditingKey] = useState<string>();
  const [newTableValues, setNewTableValues] = useState(originalTableValues);

  return (
    <div className={`${styles.infoTable} ${checkForStringAndReturnEmptyIfFalsy(className)}`}>
      {(title ?? icon) && (
        <h3>
          <span className={styles.icon}>{icon}</span>
          <span className={styles.title}>{title}</span>
        </h3>
      )}
      {newTableValues &&
        Object.entries(newTableValues).map(([key, value]) => (
          <div
            className={`${styles.row} ${checkForStringAndReturnEmptyIfFalsy(rowClassName)}`}
            key={key}
          >
            <div className={styles.key}>{key}</div>
            {editingKey === key ? (
              <EditingRow
                field={key}
                originalTableValues={originalTableValues}
                setNewTableValues={setNewTableValues}
                onChange={onChange}
                refetch={refetch}
                value={value}
                setEditingKey={setEditingKey}
              />
            ) : (
              <div className={styles.value}>
                {value ? value : isAccounts && <span className={styles.pill}>FREE</span>}
              </div>
            )}
            {editableKeys.includes(key) && editingKey !== key && (
              <Button
                text="Edit"
                onClick={() => (onEdit ? onEdit() : setEditingKey(key))}
                className={styles.edit}
                theme="link"
                ariaLabel="edit-button"
              />
            )}{' '}
            {!editableKeys.includes(key) && <div></div>}
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
