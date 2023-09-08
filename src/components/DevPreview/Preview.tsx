import { useState, ChangeEvent } from 'react';
import { PreviewProps, PropTypes } from '@/types/props';
import styles from './Preview.module.scss';
import Checkbox from '@components/Checkbox/Checkbox';

export const Preview = <T extends PropTypes>({
  Component,
  componentName,
  initialProps,
}: PreviewProps<T>): JSX.Element => {
  const [props, setProps] = useState<T>(initialProps);

  const handleChange =
    (key: keyof T) =>
    (event: ChangeEvent<HTMLInputElement | (HTMLInputElement & { checked: boolean })>): void => {
      setProps((prevProps) => ({ ...prevProps, [key]: event.target.value }));
    };

  return (
    <div className={styles.preview}>
      <h2>{componentName}</h2>
      {Object.entries(initialProps).map(([key, value]) => (
        <div key={key}>
          <label>
            {key}:
            {typeof value === 'string' ? (
              <input
                type="text"
                value={props[key as keyof T]}
                onChange={handleChange(key as keyof T)}
              />
            ) : typeof value === 'boolean' ? (
              <Checkbox
                label={key}
                checked={props[key as keyof T]}
                onChange={(checked: boolean): void =>
                  setProps((prevProps) => ({ ...prevProps, [key]: checked }))
                }
              />
            ) : (
              <div>{props[key as keyof T]}</div>
            )}
          </label>
        </div>
      ))}
      <div className={styles.dottedBorder}>
        <Component {...props} />
      </div>
    </div>
  );
};

export default Preview;
