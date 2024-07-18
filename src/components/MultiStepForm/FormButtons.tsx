import Paths from '@/config/paths';
import { SummaryPageColour } from '@/types/data';
import type { FormButtonsProps } from '@/types/props';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import FormButton from '../FormButton/FormButton';
import styles from './MultiStepForm.module.scss';

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
          aria-label="home-link-container"
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
