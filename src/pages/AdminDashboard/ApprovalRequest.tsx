import { FC } from 'react';
import styles from './ApprovalRequest.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import SchoolUserRequest from './SchoolUserRequest';
import CharityVolunteerGroupRequest from './CharityVolunteerGroupRequest';

interface ApprovalRequestProps {
  setStage: React.Dispatch<React.SetStateAction<string>>;
  type: 'school' | 'charity';
}

const ApprovalRequest: FC<ApprovalRequestProps> = ({ setStage, type }) => {
  return (
    <>
      <BackButton onClick={(): void => setStage('view_requests')} theme="blue" />
      <div className={styles.card}>
        {type === 'school' && <SchoolUserRequest />}
        {type === 'charity' && <CharityVolunteerGroupRequest />}
      </div>
    </>
  );
};

export default ApprovalRequest;
