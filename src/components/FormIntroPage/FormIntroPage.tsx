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
      <h2 className={styles.header}>{header} </h2>
      <p className={styles.text}> {infoText}</p>
      <ul className={styles.list}>
        {listItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <h3 className={styles.secondaryHeader}>{secondaryHeading}</h3>
      <p className={styles.text}>{secondaryInfoText}</p>
      <ul className={styles.list}>
        {secondaryListItems?.map((item, id) => <li key={id}>{item}</li>)}
      </ul>
    </div>
  );
};
export default FormIntroPage;
