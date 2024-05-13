import { FC } from 'react';
import { CheckYourAnswersProps } from '@/types/props';
import styles from './CheckYourAnswers.module.scss';
import { checkYourAnswersDataMap } from '@/utils/formUtils';
import Button from '../Button/Button';

const CheckYourAnswers: FC<CheckYourAnswersProps> = ({
  sections,
  formName,
  formData,
  setPageNumber,
}) => {
  const cyaData = checkYourAnswersDataMap(formName, formData);
  const handleClick = (page?: number): void => {
    if (!page || !setPageNumber) {
      return;
    }
    setPageNumber(page);
  };

  // eslint-disable-next-line no-console
  console.log(cyaData);

  return sections.map((section, index) => (
    <div key={index} className={styles.container}>
      <h3 className={styles.header}>{section}</h3>
      {cyaData?.[section].map(({ field, value, page }, index) => (
        <div key={index} className={styles.row}>
          <div className={styles.field}>{field}</div>
          <div className={`${styles.value} ${field === 'Address' ? styles.addressCell : ''}`}>
            {value}
          </div>
          <div
            className={`${styles.changeLink} ${
              field === 'Address' ? styles.changeAddressLink : ''
            }`}
          >
            <Button
              theme="link"
              onClick={() => handleClick(page)}
              text="Change"
              ariaLabel="change"
            />
          </div>
        </div>
      ))}
    </div>
  ));
};
export default CheckYourAnswers;
