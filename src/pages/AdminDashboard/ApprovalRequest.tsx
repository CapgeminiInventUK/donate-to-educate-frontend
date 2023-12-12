import { FC } from 'react';
import styles from './ApprovalRequest.module.scss';
import FormButton from '@/components/FormButton/FormButton';
import { Pill } from '@/components/Pill/Pill';
import BackButton from '@/components/BackButton/BackButton';

interface ApprovalRequestProps {
  setStage: React.Dispatch<React.SetStateAction<string>>;
  type: 'school' | 'charity';
}

const ApprovalRequest: FC<ApprovalRequestProps> = ({ setStage, type }) => {
  return (
    <>
      <BackButton onClick={(): void => setStage('view_requests')} theme="blue" />
      <div className={styles.card}>
        {type === 'school' && (
          <>
            <Pill color="blue" text="SCHOOL" />
            <h1>Ormiston Six Villages Academy</h1>
            <div>01243 546800</div>
            <div>email@ormiston.edu.ac.uk</div>
            <p>Ormiston Six Villages Academy</p>
            <p>Lime Avenue</p>
            <p>Westergate</p>
            <p>West Sussex</p>
            <p>PO20 3UE</p>
            <p>England</p>
            <hr />
            <p>
              To confirm this connection, check that they&apos;re senior staff or a senior contact
              at the school.
            </p>
            <b>The local authority may also review, confirm or decline this request.</b>
            <div className={styles.requestDecisionCard}>
              <div>
                <span>Name</span> Alexander Isak
              </div>
              <hr />
              <div>
                <span>Job title or role</span> Head of Chemistry
              </div>
              <hr />
              <div>
                <span>Email</span> Isak-chemistry@mgail.com
              </div>
              <hr />
              <div>
                <span>Phone</span> 07123456789
              </div>
              <hr />
              <div className={styles.actionButtons}>
                <FormButton
                  theme="formButtonMidBlue"
                  text="Confirm request"
                  onClick={(): void => undefined}
                />
                <FormButton
                  theme="formButtonGrey"
                  text="Decline request"
                  onClick={(): void => undefined}
                />
              </div>
            </div>
          </>
        )}
        {type === 'charity' && <Pill color="grey" text="CHARITY OR VOLUNTEER GROUP" />}
      </div>
    </>
  );
};

export default ApprovalRequest;
