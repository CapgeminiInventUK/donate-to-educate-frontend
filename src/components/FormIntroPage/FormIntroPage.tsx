import { FC } from 'react';
import styles from './FormIntroPage.module.scss';
import { FormIntroPageProps } from '@/types/props';

const FormIntroPage: FC<FormIntroPageProps> = ({
  header,
  infoText,
  listItems,
  secondaryHeading,
  secondaryInfoText,
  secondaryListItems,
}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>{header} </h1>
      <p className={styles.text}> {infoText}</p>
      {listItems && (
        <ol className={styles.list}>
          {listItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      )}
      {secondaryHeading && <h2 className={styles.secondaryHeader}>{secondaryHeading}</h2>}
      {secondaryInfoText && <p className={styles.text}>{secondaryInfoText}</p>}
      {secondaryListItems && (
        <ol className={styles.list}>
          {secondaryListItems?.map((item, id) => <li key={id}>{item}</li>)}
        </ol>
      )}
    </div>
  );
};
export default FormIntroPage;
