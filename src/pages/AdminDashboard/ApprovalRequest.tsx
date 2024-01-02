import { FC, useState } from 'react';
import styles from './ApprovalRequest.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import Email from '@/assets/tiles/Email';
import Phone from '@/assets/admin/Phone';
import DeclineModal from './DeclineModal';
import ResultBanner from './ResultBanner';
import FormButton from '@/components/FormButton/FormButton';
import ToolTip from '@/assets/admin/ToolTip';
import { Pill } from '@/components/Pill/Pill';

interface ApprovalRequestProps {
  setStage: React.Dispatch<React.SetStateAction<string>>;
  type: 'school' | 'charity';
  name: string;
}

type myStageType = 'deciding' | 'approved' | 'denied';

const ApprovalRequest: FC<ApprovalRequestProps> = ({ setStage, name, type }) => {
  const [showModal, setShowModal] = useState(false);

  const [myStage, setMyStage] = useState<myStageType>('deciding');

  return (
    <>
      <BackButton onClick={(): void => setStage('view_requests')} theme="blue" />
      <div className={styles.card}>
        {myStage === 'deciding' ? (
          <>
            <Pill
              color={type == 'school' ? 'blue' : 'lightBlue'}
              text={type == 'school' ? 'SCHOOL' : 'CHARITY OR VOLUNTEER GROUP'}
            />
            <h1>{name}</h1>
            {type === 'school' && (
              <>
                <div className={styles.contactInfo}>
                  <Phone />
                  <div>01243 546800</div>
                </div>
                <div className={styles.contactInfo}>
                  <Email />
                  <div>email@ormiston.edu.ac.uk</div>
                </div>
                <div className={styles.detailsCard}>
                  <p>Ormiston Six Villages Academy</p>
                  <p>Lime Avenue</p>
                  <p>Westergate</p>
                  <p>West Sussex</p>
                  <p>PO20 3UE</p>
                  <p>England</p>
                </div>{' '}
              </>
            )}
            <hr />
            <p>
              {' '}
              {type == 'school'
                ? "To confirm this connection, check that they're senior staff or a senior contact at the school."
                : "To confirm this connection, check that they're working at the charity or volunteer group and have somewhere to store products."}
            </p>
            <div className={styles.contactInfo}>
              <ToolTip className={styles.infoToolTip} />
              <b>The local authority may also review, confirm or decline this request.</b>
            </div>
            <div className={styles.requestDecisionCard}>
              <div className={styles.informationLine}>
                <b>Name</b>
                <span>Alexander Isak</span>
              </div>
              <hr />
              <div className={styles.informationLine}>
                <b>Job title or role</b>
                <span>Head of Chemistry</span>
              </div>
              <hr />
              <div className={styles.informationLine}>
                <b>Email</b>
                <span>Isak-chemistry@mgail.com</span>
              </div>
              <hr />
              <div className={styles.informationLine}>
                <b>Phone</b>
                <span>07123456789</span>
              </div>
              <hr />
              <div className={styles.actionButtons}>
                <FormButton
                  theme="formButtonMidBlue"
                  text="Confirm request"
                  onClick={(): void => {
                    //console.log('confirm button pressed');
                    setMyStage('approved');
                  }}
                />
                <FormButton
                  theme="formButtonGrey"
                  text="Decline request"
                  onClick={(): void => setShowModal(true)}
                />
              </div>
            </div>
            <DeclineModal
              setShowModal={setShowModal}
              showModal={showModal}
              doSomething={() => {
                //console.log('bro said to hold this stick');
                setMyStage('denied');
              }}
            />
          </>
        ) : myStage === 'approved' ? (
          <ResultBanner name="Some Name" type="approved" />
        ) : (
          <ResultBanner type="declined" />
        )}
      </div>
    </>
  );
};

export default ApprovalRequest;