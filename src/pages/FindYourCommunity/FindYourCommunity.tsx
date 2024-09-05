import { FC, useEffect, useState } from 'react';
import styles from './FindYourCommunity.module.scss';
import Paths from '@/config/paths';
import { useNavigate } from 'react-router';
import BackButton from '@/components/BackButton/BackButton';
import isPostalCode from 'validator/lib/isPostalCode';
import { FormErrors } from '@/types/data';
import TextInputSearch from '@/components/TextInputSearch/TextInputSearch';
import Card from '@/components/Card/Card';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';

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
      <Card>
        <h1>Find your community</h1>

        <div className={styles.subContainer}>
          <p>You can use this service to:</p>
          <ul>
            <li>search for charities and schools in your local area</li>
            <li>see what products are available to request</li>
            <li>donate products to help the next child</li>
          </ul>
        </div>

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
