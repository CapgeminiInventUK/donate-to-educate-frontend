import { FC, useState } from 'react';
import styles from './FindYourCommunity.module.scss';
import Paths from '@/config/paths';
import { useNavigate } from 'react-router';
import BackButton from '@/components/BackButton/BackButton';
import isPostalCode from 'validator/lib/isPostalCode';
import { FormErrors } from '@/types/data';
import TextInputSearch from '@/components/TextInputSearch/TextInputSearch';
import Card from '@/components/Card/Card';

const FindYourCommunity: FC = () => {
  const navigate = useNavigate();
  const [postcode, setPostcode] = useState('');
  const [error, setError] = useState<string>();

  return (
    <div className={styles.container}>
      <BackButton theme="blue" />
      <Card className={styles.subContainer}>
        <h2>Find your community</h2>

        <TextInputSearch
          ariaLabel="postcode"
          header="Enter your postcode"
          subHeading="This can be your home, school, or charity postcode in England and Wales"
          onChange={(value) => setPostcode(value)}
          errorMessage={error}
          onClick={() => {
            isPostalCode(postcode, 'GB')
              ? navigate(Paths.YOUR_LOCAL_AREA, { state: { postcode } })
              : setError(FormErrors.POSTCODE_ERROR_MESSAGE);
          }}
        />
      </Card>
    </div>
  );
};

export default FindYourCommunity;
