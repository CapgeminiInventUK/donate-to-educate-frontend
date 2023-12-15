import Email from '@/assets/tiles/Email';
import Phone from '@/assets/admin/Phone';
import ToolTip from '@/assets/admin/ToolTip';
import FormButton from '@/components/FormButton/FormButton';
import { Pill } from '@/components/Pill/Pill';

import styles from './ApprovalRequest.module.scss';
import { FC } from 'react';

const SchoolUserRequest: FC = () => {
  return (
    <>
      <Pill color="blue" text="SCHOOL" />
      <h1>Ormiston Six Villages Academy</h1>
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
      </div>
      <hr />
      <p>
        To confirm this connection, check that they&apos;re senior staff or a senior contact at the
        school.
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

export default SchoolUserRequest;
