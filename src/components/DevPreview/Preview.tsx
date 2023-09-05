import { useState, ChangeEvent, ComponentType } from 'react';

interface PreviewProps<T> {
  Component: ComponentType<T>;
  componentName: string;
  initialProps: T;
}

export const Preview = <T extends Record<string, unknown>>({
  Component,
  componentName,
  initialProps,
}: PreviewProps<T>): JSX.Element => {
  const [props, setProps] = useState<T>(initialProps);

  const handleChange =
    (key: keyof T) =>
    (e: ChangeEvent<HTMLInputElement>): void => {
      setProps((prevProps) => ({ ...prevProps, [key]: e.target.value }));
    };

  return (
    <div style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
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
      <Component {...props} />
    </div>
  );
};

export default Preview;
