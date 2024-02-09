import { FC } from 'react';
import styles from './FindYourCommunity.module.scss';
import TextInput from '@/components/TextInput/TextInput';
import SearchIcon from '@/assets/tiles/Search';
import RightArrowBlue from '@/assets/icons/form-button-right-arrow-blue.svg';

const FindYourCommunity: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.breadCrumbs}>
          <p className={styles.donateToEducate}>Donate to Educate</p>
          <img src={RightArrowBlue} alt="Right arrow" height={'30'} width={'30'} />
          <p>Find your community</p>
        </div>
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
