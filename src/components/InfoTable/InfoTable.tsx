import React from 'react';
import styles from './InfoTable.module.scss';
import { InfoTableProps } from '@/types/props';

const InfoTable: React.FC<InfoTableProps> = ({
  tableValues,
  editableKeys = [],
  isAccounts = false,
  isDelete = false,
  title,
  icon,
  className,
  rowClassName,
}) => {
  return (
    <div className={`${styles.infoTable} ${className ? className : ''}`}>
      {(title ?? icon) && (
        <h3>
          <span className={styles.icon}>{icon}</span>
          <span className={styles.title}>{title}</span>
        </h3>
      )}
      {Object.entries(tableValues).map(([key, value]) => (
        <div className={`${styles.row} ${rowClassName ? rowClassName : ''}`} key={key}>
          <div className={styles.key}>{key}</div>
          <div className={styles.value}>
            {value ? value : isAccounts && <span className={styles.pill}>FREE</span>}
          </div>
          {editableKeys.includes(key) && (
            <a href="#" className={styles.edit}>
              Edit
            </a>
          )}
          {isDelete && (
            <span
              className={styles.delete}
              onClick={() => window.alert('This function is in development')}
            >
              Delete
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default InfoTable;
