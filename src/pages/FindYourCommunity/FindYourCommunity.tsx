import { FC } from 'react';
import styles from './FindYourCommunity.module.scss';
import TextInput from '@/components/TextInput/TextInput';
import SearchIcon from '@/assets/tiles/Search';

const FindYourCommunity: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <h2>Find your community</h2>
        <h3>Enter your postcode</h3>
        <p>This can be your home, school, or charity postcode</p>

        <div className={styles.searchBar}>
          <TextInput />
          <div className={styles.searchIconContainer}>
            <SearchIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindYourCommunity;
