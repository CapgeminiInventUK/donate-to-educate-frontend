import { FC } from 'react';
import styles from './FormIntroPage.module.scss';

interface Props {
  header: string;
  infoText: string;
  listItems: string[];
  secondaryHeading?: string;
  secondaryInfoText?: string;
  secondaryListItems?: string[];
}

const FormIntroPage: FC<Props> = ({
  header,
  infoText,
  listItems,
  secondaryHeading,
  secondaryInfoText,
  secondaryListItems,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.card}>
          <h2 className={styles.header}>{header} </h2>
          <p className={styles.text}> {infoText}</p>
          <ul className={styles.text}>
            {listItems.map((item, id) => (
              <li key={id}>{item}</li>
            ))}
          </ul>
          <h3 className={styles.secondaryHeader}>{secondaryHeading}</h3>
          <p className={styles.text}>{secondaryInfoText}</p>
          <ul className={styles.text}>
            {secondaryListItems?.map((item, id) => <li key={id}>{item}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default FormIntroPage;
