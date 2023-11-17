import { FC, useEffect, useState } from 'react';
import styles from './AdminDashboard.module.scss';
import Button from '@/components/Button/Button';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router';

const signOut = async (): Promise<void> => {
  await Auth.signOut();
};
// Need to make this a protected route only for logged in users of type admin.
const AdminDashboard: FC = () => {
  const navigate = useNavigate();
  const [shouldSignOut, setShouldSignOut] = useState(false);

  useEffect(() => {
    if (shouldSignOut) {
      void signOut()
        .then(() => {
          setShouldSignOut(false);
          navigate('/login');
        })
        // eslint-disable-next-line no-console
        .catch(console.error);
    }
  }, [shouldSignOut, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.adminCard}>
        <div className={styles.header}>
          <h1>Admin Dashboard</h1>
          <div>
            <Button theme="darkBlue" text="Settings" onClick={(): void => undefined} />
            <Button theme="darkBlue" text="Sign out" onClick={(): void => setShouldSignOut(true)} />
          </div>
        </div>
        <div className={styles.body}>
          <h2>Hello, team</h2>
          <hr />
          <div className={styles.cardContainer}>
            <div className={styles.card}>
              <h3>Manage local authorities</h3>
              <div>0 joined</div>
              <div>153 to join</div>
              <div>View, add and edit your local authorities.</div>
              <Button theme="midBlue" text="Start" onClick={(): void => undefined} />
            </div>
            <div className={styles.card}>
              <h3>Manage schools, charities and volunteers</h3>
              <div>4 requests</div>
              <div>View who&apos;s asked to join Donate to Educate.</div>
              <Button theme="midBlue" text="Start" onClick={(): void => undefined} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
