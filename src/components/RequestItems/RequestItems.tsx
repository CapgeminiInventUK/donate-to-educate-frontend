import BackButton from '@/components/BackButton/BackButton';
import Card from '@/components/Card/Card';
import FormButton from '@/components/FormButton/FormButton';
import Paths from '@/config/paths';
import { insertItemQuery } from '@/graphql/mutations';
import { client } from '@/graphqlClient';
import type { InsertItemQueryMutation } from '@/types/api';
import type { RequestFormState } from '@/types/data';
import type { RequestItemsProps } from '@/types/props';
import { checkAllObjectValuesTruthy } from '@/utils/globals';
import { useQuery } from '@tanstack/react-query';
import type { GraphQLQuery } from 'aws-amplify/api';
import { type FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorBanner from '../ErrorBanner/ErrorBanner';
import styles from './RequestItems.module.scss';
import RequestItemsFormInputs from './RequestItemsFormInputs';
import getTextContent from './getTextContent';

const RequestItems: FC<RequestItemsProps> = ({
  type,
  organisationType,
  id,
  name: organisationName,
}) => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState<RequestFormState>({
    who: '',
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const { buttonText, heading, subHeading } = getTextContent(type, organisationType);

  const { refetch, isError } = useQuery({
    queryKey: [`itemQuery-${JSON.stringify(formState)}-${type}`],
    enabled: false,
    queryFn: async () => {
      const result = await client.graphql<GraphQLQuery<InsertItemQueryMutation>>({
        query: insertItemQuery,
        variables: {
          ...formState,
          type,
          organisationType,
          organisationName,
          organisationId: id,
        },
      });
      return result;
    },
  });

  const onFormChange = (key: string, value: string): void => {
    setFormState((prevState) => {
      if (key === 'who' && value !== 'somethingElse') {
        delete prevState.connection;
      }
      return { ...prevState, [key]: value };
    });
  };

  const onFormSubmit = (): void => {
    void refetch().then(() => {
      navigate(
        organisationType === 'school'
          ? Paths.SCHOOLS_DASHBOARD_ITEMS_CONFIRMATION
          : Paths.CHARITY_DASHBOARD_ITEMS_CONFIRMATION,
        {
          state: { name: organisationName, id },
        }
      );
    });
  };

  if (isError) {
    return <ErrorBanner />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <BackButton theme="blue" />
        <Card className={`${styles.requestItemsCard} ${styles[type]}`}>
          <h2 className={styles.mainHeading}>{heading}</h2>
          <p>{subHeading}</p>
          <RequestItemsFormInputs
            type={type}
            organisationType={organisationType}
            formState={formState}
            onFormChange={onFormChange}
          />
          <FormButton
            text={buttonText}
            theme={
              checkAllObjectValuesTruthy(formState) ? 'formButtonGreenDisabled' : 'formButtonGreen'
            }
            fullWidth={true}
            disabled={checkAllObjectValuesTruthy(formState)}
            onClick={onFormSubmit}
            ariaLabel="submit"
          />
        </Card>
      </div>
    </div>
  );
};

export default RequestItems;
