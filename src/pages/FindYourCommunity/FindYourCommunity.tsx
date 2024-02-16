import { FC, useState } from 'react';
import styles from './FindYourCommunity.module.scss';
import TextInput from '@/components/TextInput/TextInput';
import SearchIcon from '@/assets/tiles/Search';
import Paths from '@/config/paths';
import { useNavigate } from 'react-router';
import BackButton from '@/components/BackButton/BackButton';

const FindYourCommunity: FC = () => {
  const navigate = useNavigate();
  const [postcode, setPostcode] = useState('');

  return (
    <div className={styles.container}>
      <BackButton
        onClick={() => {
          navigate(-1);
        }}
        theme="blue"
      />
      <div className={styles.subContainer}>
        <h2>Find your community</h2>
        <h3>Enter your postcode</h3>
        <p>This can be your home, school, or charity postcode</p>

        <div className={styles.searchBar}>
          <TextInput onChange={(value) => setPostcode(value)} />
          <div
            className={styles.searchIconContainer}
            onClick={() => navigate(Paths.YOUR_LOCAL_AREA, { state: { postcode } })}
          >
            <SearchIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindYourCommunity;
