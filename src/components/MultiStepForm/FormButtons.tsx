import { FC } from 'react';
import { SummaryPageColour } from '@/types/data';
import styles from './MultiStepForm.module.scss';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import FormButton from '../FormButton/FormButton';
import { FormButtonsProps } from '@/types/props';

const FormButtons: FC<FormButtonsProps> = ({
  isLastPage,
  isUnhappyPath,
  summaryPageBg,
  cyaPageNumber,
  pageNumber,
  isSchoolRegistered,
  declarationSigned,
  onLocalAuthorityRegisterRequest,
  formComponentInternalLink,
}) => {
  const navigate = useNavigate();
  const returnHome = (): void => {
    navigate(Paths.HOME);
  };

  return (
    <>
      {isLastPage ? (
        <div
          className={`${isUnhappyPath && summaryPageBg !== SummaryPageColour.BLUE ? styles.returnHomeLinkUnhappy : styles.returnHomeLink}`}
        >
          <Button
            theme={'link'}
            text={'Return to homepage'}
            onClick={returnHome}
            ariaLabel="home"
          />
        </div>
      ) : !isUnhappyPath &&
        (!cyaPageNumber || (cyaPageNumber && pageNumber < cyaPageNumber + 1)) ? (
        <FormButton
          text={pageNumber === 0 ? 'Join' : 'Next'}
          theme={
            pageNumber === 1 && isSchoolRegistered ? 'formButtonDisabled' : 'formButtonDarkBlue'
          }
          ariaLabel={pageNumber === 0 ? 'Join' : 'Next'}
          useArrow={pageNumber === 0}
          disabled={pageNumber === 1 && isSchoolRegistered}
        />
      ) : (
        !isUnhappyPath && (
          <FormButton
            text={'Send application'}
            theme={!declarationSigned ? 'formButtonDisabled' : 'formButtonGreen'}
            ariaLabel="send"
            disabled={!declarationSigned}
          />
        )
      )}
      {isUnhappyPath && onLocalAuthorityRegisterRequest && (
        <FormButton text={'Send'} theme={'formButtonDarkBlue'} useArrow={true} ariaLabel="send" />
      )}
      {formComponentInternalLink && (
        <div className={styles.link}>
          <Button
            text={formComponentInternalLink.text}
            theme={formComponentInternalLink.theme}
            onClick={() => {
              formComponentInternalLink.onClick();
            }}
            ariaLabel="internal link"
          />
        </div>
      )}
    </>
  );
};
export default FormButtons;
