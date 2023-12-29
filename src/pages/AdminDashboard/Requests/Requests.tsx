import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button/Button';
import BackButton from '@/components/BackButton/BackButton';
import { GetJoinRequestsQuery } from '@/types/api';
import JoinRequests from './JoinRequests/JoinRequests';
import dashboardStyles from '../AdminDashboard.module.scss';
import ApprovalRequest from './ApprovalRequest/ApprovalRequest';
import Paths from '@/config/paths';

interface RequestsProps {
  data?: GetJoinRequestsQuery;
}

const Requests: FC<RequestsProps> = ({ data }) => {
  const [stage, setStage] = useState('view_requests');
  const navigate = useNavigate();

  return (
    <div className={dashboardStyles.container}>
      <div className={dashboardStyles.adminCard}>
        <div className={dashboardStyles.header}>
          <h1>Requests to join</h1>
          <Button
            theme="link"
            text="Sign out"
            className={dashboardStyles.actionButtons}
            onClick={(): void => {
              return;
            }} // setShouldSignOut(true)}
          />
        </div>
      </div>
      <div className={dashboardStyles.body}>
        {stage === 'view_requests' && (
          <>
            <BackButton
              onClick={(): void => navigate(Paths.ADMIN_DASHBOARD_LA_MANAGE)}
              theme="white"
            />
            <Button
              theme="midBlue"
              text="Approve request school"
              onClick={(): void => {
                setStage('request_approval_school');
              }}
            />
            <Button
              theme="midBlue"
              text="Approve request charity"
              onClick={(): void => {
                setStage('request_approval_charity');
              }}
            />
            <JoinRequests setStage={setStage} data={data} />
          </>
        )}
        {stage === 'request_approval_school' && (
          <ApprovalRequest setStage={setStage} type="school" />
        )}
        {stage === 'request_approval_charity' && (
          <ApprovalRequest setStage={setStage} type="charity" />
        )}
      </div>
    </div>
  );
};

export default Requests;
