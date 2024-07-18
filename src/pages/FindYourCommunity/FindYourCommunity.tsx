import BackButton from '@/components/BackButton/BackButton';
import Card from '@/components/Card/Card';
import TextInputSearch from '@/components/TextInputSearch/TextInputSearch';
import Paths from '@/config/paths';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import { FormErrors } from '@/types/data';
import { type FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import isPostalCode from 'validator/lib/isPostalCode';
import styles from './FindYourCommunity.module.scss';

const FindYourCommunity: FC = () => {
  const navigate = useNavigate();
  const [postcode, setPostcode] = useState('');
  const [error, setError] = useState<FormErrors>();
  const { state } = useLocationStateOrRedirect<{ error: Error | null }>();

  useEffect(() => {
    if (state?.error) {
      setError(FormErrors.POSTCODE_NOT_FOUND);
      window.history.replaceState({}, '');
    }
  }, [state]);

  return (
    <div className={styles.container}>
      <BackButton
        theme="blue"
        onClick={() => (state?.error ? navigate(Paths.HOME) : navigate(-1))}
      />
      <Card className={styles.subContainer}>
        <h1>Find your community</h1>

        <TextInputSearch
          ariaLabel="postcode"
          header="Enter your postcode"
          subHeading="This can be your home, school, or charity postcode in England and Wales"
          onChange={(value) => {
            setError(undefined);
            setPostcode(value);
          }}
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
