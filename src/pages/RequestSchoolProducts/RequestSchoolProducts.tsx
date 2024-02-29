/* eslint-disable no-console */
import { FC, useState } from 'react';
import styles from './RequestSchoolProducts.module.scss';
import RadioGroup from '@/components/RadioGroup/RadioGroup';
import TextInput from '@/components/TextInput/TextInput';
import TextArea from '@/components/TextArea/TextArea';
import FormButton from '@/components/FormButton/FormButton';
import BackButton from '@/components/BackButton/BackButton';
import { RequestFormState } from '@/types/data';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import { ItemsIconType } from '@/components/ItemList/getIcons';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from 'aws-amplify/api';
import { insertItemQuery } from '@/graphql/mutations';
import { InsertItemQueryMutation } from '@/types/api';

interface TextContent {
  radioButtonLabels: string[];
  radioButtonValues: string[];
  buttonText: string;
  heading: string;
  subHeading: string;
}

const getTextContent = (type: string): TextContent => {
  switch (type) {
    case 'tick':
      return {
        radioButtonLabels: [
          'I am a parent or guardian',
          'I work at another school',
          'I work for a charity or volunteer group',
          'Something else',
        ],
        radioButtonValues: [
          'parentGuardian',
          'anotherSchool',
          'charityVolunteerGroup',
          'somethingElse',
        ],
        buttonText: 'Request products',
        heading: 'Request school products',
        subHeading:
          "Tell us which things you need and we'll contact you to arrange the next steps as soon as we can.",
      };
    case 'heart':
      return {
        radioButtonLabels: [
          'I work for a charity or volunteer group',
          'I am a parent or guardian',
          'I am a member of the public',
          'I work at another school',
          'Something else',
        ],
        radioButtonValues: [
          'charityVolunteerGroup',
          'parentGuardian',
          'public',
          'anotherSchool',
          'somethingElse',
        ],
        buttonText: 'Donate products',
        heading: 'Donate school products',
        subHeading:
          "Tell us which things you'd like to donate and we'll contact you to arrange the next steps as soon as we can.",
      };
    case 'plus':
      return {
        radioButtonLabels: [
          'I work for a charity or volunteer group',
          'I am a parent or guardian',
          'I work at another school',
          'Something else',
        ],
        radioButtonValues: [
          'charityVolunteerGroup',
          'parentGuardian',
          'anotherSchool',
          'somethingElse',
        ],
        buttonText: 'Take extra stock',
        heading: 'Take extra stock',
        subHeading:
          "Tell us which things you'd like to take from us and we'll contact you to arrange the next steps as soon as we can.",
      };
    default:
      throw new Error(`Unknown type ${type}`);
  }
};

const RequestSchoolProducts: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formState, setFormState] = useState<RequestFormState>({
    who: '',
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [type] = useState<string>((location?.state as { type: ItemsIconType }).type);

  const { refetch } = useQuery({
    queryKey: ['itemQuery'],
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
        },
      });
      return result;
    },
  });

  if (!(location.state && 'type' in location.state)) {
    return <Navigate to={Paths.HOME} />;
  }

  const { name, email, phone, notes } = formState;
  const { radioButtonLabels, radioButtonValues, buttonText, heading, subHeading } =
    getTextContent(type);

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <BackButton theme="blue" />
        <div className={`${styles.card} ${styles[type]}`}>
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
          <h3 className={styles.fieldHeadings}>Name</h3>
          <TextInput
            onChange={(value) => {
              setFormState((prevState) => ({
                ...prevState,
                name: value,
              }));
            }}
            value={name}
            isLarge={true}
          />
          <h3 className={styles.fieldHeadings}>Email</h3>
          <TextInput
            onChange={(value) => {
              setFormState((prevState) => ({
                ...prevState,
                email: value,
              }));
            }}
            value={email}
            isLarge={true}
          />
          <h3 className={styles.fieldHeadings}>Phone</h3>
          <TextInput
            onChange={(value) => {
              setFormState((prevState) => ({
                ...prevState,
                phone: value,
              }));
            }}
            value={phone}
          />
          <h3 className={styles.textAreaHeadings}>Tell us what you need</h3>
          <TextArea
            characterLimit={1000}
            subHeading="Include the school products and sizes you would like"
            onChange={(value) => {
              setFormState((prevState) => ({
                ...prevState,
                notes: value,
              }));
            }}
            value={notes}
          />
          <FormButton
            text={buttonText}
            theme={'formButtonGreen'}
            fullWidth={true}
            onClick={() => {
              refetch().then(console.log).catch(console.error);
              navigate(Paths.SCHOOLS_DASHBOARD_ITEMS_CONFIRMATION, {
                state: { name: 'Test School Name' },
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RequestSchoolProducts;
