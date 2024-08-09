import { FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraphQLQuery } from 'aws-amplify/api';
import { client } from '@/graphqlClient';
import { registerLocalAuthority } from '@/graphql/mutations';
import { useQuery } from '@tanstack/react-query';
import TextInput from '@/components/TextInput/TextInput';
import FormButton from '@/components/FormButton/FormButton';
import TextArea from '@/components/TextArea/TextArea';
import BackButton from '@/components/BackButton/BackButton';
import Paths from '@/config/paths';
import { RegisterLocalAuthorityMutation } from '@/types/api';
import styles from './LocalAuthoritySignUp.module.scss';
import { validateForm } from '@/utils/formValidationUtils';
import FormErrors from '@/components/FormErrors/FormErrors';
import { FormState } from '@/types/data';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import { breakpoints, checkIfValidObjectWithData, scrollToTheTop } from '@/utils/globals';
import { useMediaQuery } from 'react-responsive';

const LocalAuthoritySignUp: FC = () => {
  const isSmallScreen = useMediaQuery({ query: `(max-width: ${breakpoints.screenSmall})` });
  const [formState, setFormState] = useState<FormState>({
    firstName: '',
    lastName: '',
    jobTitle: '',
    department: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>();

  const navigate = useNavigate();
  const { state } = useLocationStateOrRedirect<{ la: string; id: string }>(Paths.ADMIN_DASHBOARD);

  const { refetch, isError } = useQuery({
    queryKey: [`register-${state.la}-${state.id}-${JSON.stringify(formState)}`],
    enabled: false,
    queryFn: async () =>
      await client.graphql<GraphQLQuery<RegisterLocalAuthorityMutation>>({
        query: registerLocalAuthority,
        variables: {
          name: state.la,
          nameId: state.id,
          ...formState,
        },
      }),
  });

  const onSubmit = (event: FormEvent<Element>): void => {
    event.preventDefault();

    const errors = validateForm(formState);

    if (checkIfValidObjectWithData(errors)) {
      setFormErrors(errors);
      scrollToTheTop();
      return;
    }

    setFormErrors(undefined);

    void refetch().then(() =>
      navigate(Paths.ADMIN_DASHBOARD_SIGN_UP_CONFIRMATION, { state: { name: state.la } })
    );
  };

  if (isError) {
    return <ErrorBanner />;
  }

  const formFields = [
    { header: 'First name', key: 'firstName' },
    { header: 'Last name', key: 'lastName' },
    { header: 'Job title or role', key: 'jobTitle' },
    { header: 'Department', key: 'department' },
    { header: 'Email', key: 'email' },
    { header: 'Phone', key: 'phone' },
  ];

  return (
    <div className={styles.container}>
      <BackButton theme="blue" />
      <div className={styles.adminCard}>
        <div className={styles.header}>
          <h1>Local Authority Profile</h1>
        </div>
        <div className={styles.body}>
          <form onSubmit={onSubmit}>
            <div className={styles.formCard}>
              {formErrors && <FormErrors formErrors={formErrors} />}
              <h2>{state.la}</h2>
              <hr />
              {formFields.map(({ header, key }) => (
                <TextInput
                  key={key}
                  header={header}
                  onChange={(value) => {
                    setFormState((prevState) => ({
                      ...prevState,
                      [key]: value,
                    }));
                  }}
                  ariaLabel={key}
                  isLarge={!isSmallScreen}
                />
              ))}
              <TextArea
                onChange={(value) => {
                  setFormState((prevState) => ({
                    ...prevState,
                    notes: value,
                  }));
                }}
                header="Notes about this user (optional)"
                subHeading="This information can only be seen by Donate to Educate administrators."
                characterLimit={1000}
                ariaLabel="notes"
              />
              <FormButton
                text={'Create account'}
                theme={'formButtonMidBlue'}
                ariaLabel="create account"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LocalAuthoritySignUp;
