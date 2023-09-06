import { useState, ChangeEvent } from 'react';
import { PreviewProps } from '@/types/props';
import styles from './Preview.module.scss';

export const Preview = <T extends Record<string, unknown>>({
  Component,
  componentName,
  initialProps,
}: PreviewProps<T>): JSX.Element => {
  const [props, setProps] = useState<T>(initialProps);

  const handleChange =
    (key: keyof T) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      setProps((prevProps) => ({ ...prevProps, [key]: event.target.value }));
    };

  return (
    <div className={styles.preview}>
      <h2>{componentName}</h2>
      {Object.keys(initialProps).map((key: keyof T & string) => (
        <div key={key}>
          <label>
            {key}:
            <input
              type="text"
              value={props[key] as unknown as string}
              onChange={handleChange(key)}
            />
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
