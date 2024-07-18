import ToolTip from '@/assets/admin/ToolTip';
import DeclineDeleteModal from '@/components/DeclineDeleteModal/DeclineDeleteModal';
import FormButton from '@/components/FormButton/FormButton';
import type { UserRequestDetailsProps } from '@/types/props';
import { type FC, useState } from 'react';
import styles from '../ApprovalRequest.module.scss';

const UserRequestDetails: FC<UserRequestDetailsProps> = ({
  type,
  user,
  setMyStage,
  charity,
  charityName,
  la,
}) => {
  const [showModal, setShowModal] = useState(false);
  const { name, title, phone, email } = user;
  const { charityAddress, aboutCharity } = charity ?? {};
  const text =
    type === 'school'
      ? 'senior staff or a senior contact at the school.'
      : 'working at the charity or volunteer group and have somewhere to store products.';

  return (
    <>
      <p>To confirm this connection, check that they&apos;re {text}</p>
      <div className={styles.contactInfo}>
        <ToolTip className={styles.infoToolTip} />
        <b>The local authority may also review, confirm or decline this request.</b>
      </div>
      <div className={styles.requestDecisionCard}>
        {type === 'charity' && <h3>Details</h3>}
        <div className={styles.informationLine}>
          <b>Name</b>
          <span>{name}</span>
        </div>
        <hr />
        <div className={styles.informationLine}>
          <b>Job title or role</b>
          <span>{title}</span>
        </div>
        <hr />
        <div className={styles.informationLine}>
          <b>Email</b>
          <span>{email}</span>
        </div>
        <hr />
        <div className={styles.informationLine}>
          <b>Phone</b>
          <span>{phone}</span>
        </div>
        <hr />
        {type === 'charity' && (
          <>
            <h3>Charity or volunteer group</h3>
            <div className={styles.informationLine}>
              <b>Name</b>
              <span>{charityName}</span>
            </div>
            <hr />
            <div className={styles.informationLine}>
              <b>Local Authority</b>
              <span>{la}</span>
            </div>
            <hr />
            <div className={styles.informationLine}>
              <b>Main Address</b>
              <span className={styles.address}>{charityAddress}</span>
            </div>
            <hr />
            <div className={styles.informationLine}>
              <b>About</b>
              <span>{aboutCharity}</span>
            </div>
            <hr />
          </>
        )}
        <div className={styles.actionButtons}>
          <FormButton
            theme="formButtonMidBlue"
            text="Confirm request"
            onClick={(): void => {
              setMyStage('approved');
            }}
            ariaLabel="confirm request"
          />
          <FormButton
            theme="formButtonGrey"
            text="Decline request"
            onClick={(): void => setShowModal(true)}
            ariaLabel="decline request"
          />
        </div>
      </div>
      <DeclineDeleteModal
        setShowModal={setShowModal}
        showModal={showModal}
        onConfirm={() => setMyStage('denied')}
        bodyText=" If you cannot identify this connection or confirm they are connected to the school, you
      may decline them."
        confirmText="Decline request"
      />
    </>
  );
};
export default UserRequestDetails;
