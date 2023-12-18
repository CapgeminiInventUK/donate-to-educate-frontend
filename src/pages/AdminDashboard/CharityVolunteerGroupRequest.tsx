import ToolTip from '@/assets/admin/ToolTip';
import FormButton from '@/components/FormButton/FormButton';
import { Pill } from '@/components/Pill/Pill';

import styles from './ApprovalRequest.module.scss';
import { FC } from 'react';

const CharityVolunteerGroupRequest: FC = () => {
  return (
    <>
      <Pill color="lightBlue" text="CHARITY OR VOLUNTEER GROUP" />
      <h1>Ormiston Six Villages Academy</h1>

      <hr />
      <p>
        To confirm this connection, check that they&lsquo;re working at the charity or volunteer
        group and have somewhere to store products.
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
  );
};

export default CharityVolunteerGroupRequest;
