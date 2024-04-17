import { FC, useState } from 'react';
import styles from './RequestItems.module.scss';
import RadioGroup from '@/components/RadioGroup/RadioGroup';
import TextInput from '@/components/TextInput/TextInput';
import TextArea from '@/components/TextArea/TextArea';
import FormButton from '@/components/FormButton/FormButton';
import BackButton from '@/components/BackButton/BackButton';
import { RequestFormState } from '@/types/data';
import { useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import { ItemsIconType } from '@/components/ItemList/getIcons';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from 'aws-amplify/api';
import { insertItemQuery } from '@/graphql/mutations';
import { InsertItemQueryMutation } from '@/types/api';
import ErrorBanner from '../ErrorBanner/ErrorBanner';
import Card from '@/components/Card/Card';

export interface RequestItemsProps {
  radioButtonLabels: string[];
  radioButtonValues: string[];
  buttonText: string;
  heading: string;
  subHeading: string;
  notesHeading: string;
  notesSubHeading: string;
  type: ItemsIconType;
  organisationType: 'school' | 'charity';
  id: string;
  name: string;
}

const RequestItems: FC<RequestItemsProps> = ({
  radioButtonLabels,
  radioButtonValues,
  buttonText,
  heading,
  subHeading,
  notesHeading,
  notesSubHeading,
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
    notes: '',
  });

  const { refetch, isError } = useQuery({
    queryKey: [`itemQuery-${JSON.stringify(formState)}-${type}`],
    enabled: false,
    queryFn: async () => {
      const result = await client.graphql<GraphQLQuery<InsertItemQueryMutation>>({
        query: insertItemQuery,
        variables: {
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          message: formState.notes,
          type,
          who: formState.who,
          organisationType,
          organisationName,
          organisationId: id,
          ...(formState?.connection && { connection: formState.connection }),
        },
      });
      return result;
    },
  });

  const { name, email, phone, notes, connection } = formState;

  if (isError) {
    return <ErrorBanner />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <BackButton theme="blue" />
        <Card className={`${styles.requestItemsCard} ${styles[type]}`}>
          <p className={styles.mainHeading}>{heading}</p>
          <p>{subHeading}</p>

          <h3 className={styles.subHeading}>What best describes you?</h3>
          <RadioGroup
            labels={radioButtonLabels}
            name="schoolProductRadios"
            values={radioButtonValues}
            handleChange={(value: string): void =>
              setFormState((prevState) => ({
                ...prevState,
                who: value,
              }))
            }
          />
          {formState.who === 'somethingElse' && (
            <div className={styles.connection}>
              <TextInput
                subHeading="Describe your role or connection to Donate to Educate"
                onChange={(value) => {
                  setFormState((prevState) => ({
                    ...prevState,
                    connection: value,
                  }));
                }}
                ariaLabel="connection"
                value={connection}
                isLarge
              />
            </div>
          )}
          <br />
          <TextInput
            header="Name"
            onChange={(value) => {
              setFormState((prevState) => ({
                ...prevState,
                name: value,
              }));
            }}
            ariaLabel="name"
            value={name}
            isLarge={true}
          />
          <TextInput
            header="Email"
            onChange={(value) => {
              setFormState((prevState) => ({
                ...prevState,
                email: value,
              }));
            }}
            ariaLabel="email"
            value={email}
            isLarge={true}
          />
          <TextInput
            header="Phone"
            onChange={(value) => {
              setFormState((prevState) => ({
                ...prevState,
                phone: value,
              }));
            }}
            ariaLabel="phone"
            value={phone}
          />
          <TextArea
            characterLimit={1000}
            header={notesHeading}
            subHeading={notesSubHeading}
            onChange={(value) => {
              setFormState((prevState) => ({
                ...prevState,
                notes: value,
              }));
            }}
            ariaLabel="notes"
            value={notes}
          />
          <FormButton
            text={buttonText}
            theme={'formButtonGreen'}
            fullWidth={true}
            onClick={() => {
              void refetch().then(() => {
                navigate(
                  organisationType === 'school'
                    ? Paths.SCHOOLS_DASHBOARD_ITEMS_CONFIRMATION
                    : Paths.CHARITY_DASHBOARD_ITEMS_CONFIRMATION,
                  {
                    state: { name: organisationName },
                  }
                );
              });
            }}
            ariaLabel="submit"
          />
        </Card>
      </div>
    </div>
  );
};

export default RequestItems;
