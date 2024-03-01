import { FC, useEffect, useState } from 'react';
import styles from './SignUpCharity.module.scss';
import MultiStepForm from '@components/MultiStepForm/MultiStepForm';
import {
  ComponentType,
  FormDataItem,
  FormMeta,
  FormNames,
  FormSections,
  FormTemplate,
  SubmittedFormData,
} from '@/types/data';
import LogoBlue from '@/assets/logo/LogoBlue';
import SchoolQuestion from '@/assets/Form/SchoolQuestion';
import LogoWhite from '@/assets/logo/LogoWhite';
import { client } from '@/graphqlClient';
import { GetLocalAuthoritiesQuery, InsertJoinRequestMutationVariables } from '@/types/api';
import { useQuery } from '@tanstack/react-query';
import { GraphQLQuery } from 'aws-amplify/api';
import { getLocalAuthorities } from '@/graphql/queries';
import { checkYourAnswersDataMap, getFormDataForSubmission } from '@/utils/formUtils';
import { insertJoinRequest } from '@/graphql/mutations';

const SignUpCharity: FC = () => {
  const [formData, setFormData] = useState<FormDataItem[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedLocalAuthority, setSelectedLocalAuthority] = useState('');
  const [formDataForSubmission, setFormDataForSubmission] = useState<SubmittedFormData>();

  const onChange = (value: string | number | boolean, formMeta: FormMeta | undefined): void => {
    const { page = 0, field = '', section } = formMeta ?? {};
    const removeOldValue = formData.filter(({ field: oldField }) => oldField !== field);
    setFormData([...removeOldValue, { field, value, section, page }]);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['la'],
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetLocalAuthoritiesQuery>>({
        query: getLocalAuthorities,
      });

      return data;
    },
  });

  if (error) {
    throw new Error('Failed to fetch LocalAuthorities data.');
  }

  const { refetch } = useQuery({
    queryKey: ['register'],
    enabled: false,
    queryFn: async () => {
      const result = await client.graphql<GraphQLQuery<InsertJoinRequestMutationVariables>>({
        query: insertJoinRequest,
        variables: {
          name: formDataForSubmission?.name,
          localAuthority: selectedLocalAuthority,
          type: FormNames.CHARITY,
          email: formDataForSubmission?.email,
          school: formDataForSubmission?.school,
          jobTitle: formDataForSubmission?.jobTitle,
          phone: formDataForSubmission?.phone,
          charityName: formDataForSubmission?.charityName,
          charityAddress: formDataForSubmission?.charityAddress,
          aboutCharity: formDataForSubmission?.aboutCharity,
        },
      });
      return result;
    },
  });

  const options = data?.getLocalAuthorities.map(({ code, name }) => ({
    value: code,
    label: name,
  }));

  useEffect(() => {
    if (pageNumber === 6) {
      const refinedData = checkYourAnswersDataMap(FormNames.CHARITY, formData);
      refinedData &&
        setFormDataForSubmission(getFormDataForSubmission(refinedData, FormNames.CHARITY));
    }
    formData[1]?.value && setSelectedLocalAuthority(String(formData[1].value));
  }, [pageNumber, formData]);

  const formTemplate: FormTemplate[] = [
    {
      formComponents: [
        {
          componentType: ComponentType.INTRO,
          componentData: {
            header: 'Join Donate to Educate',
            infoText: 'To support us and help families and schools, you need to:',
            listItems: [
              'work at a charity or be a volunteer',
              'have a work address or premises to store school products',
              'provide us with your contact details',
              'review and agree to our GDPR statements and policies',
              'agree that we can share your information with your local authority or local council to confirm your identity',
            ],
            secondaryHeading: 'What to expect',
            secondaryInfoText: `One you give us your details, we will:`,
            secondaryListItems: [
              `send you details to your local authority or local council`,
              `your local authority or local council will confirm your identity`,
              `you will get an email to confirm whether you can join`,
            ],
          },
        },
      ],
    },
    {
      header: 'Name of charity or volunteer group',
      formComponents: [
        {
          componentType: ComponentType.TEXT,
          componentData: {
            isLarge: true,
            formMeta: {
              page: 1,
              field: 'Name',
              section: FormSections.CHARITY_SECTION,
            },
          },
        },
      ],
    },
    {
      header: "What is the name of your charity or volunteer group's local council?",
      formComponents: [
        {
          componentType: ComponentType.DROPDOWN,
          componentData: {
            subHeading: 'If you have locations across the country, choose one main local council.',
            options,
            isLarge: true,
            formMeta: {
              page: 2,
              field: 'Main local council',
              section: FormSections.CHARITY_SECTION,
            },
          },
          formComponentLink: {
            linkText: 'Find my local council (opens in a new tab).',
            linkUrl: 'https://www.gov.uk/find-local-council',
          },
        },
      ],
    },
    {
      header: 'Your details',
      formComponents: [
        {
          componentType: ComponentType.TEXT,
          componentData: {
            header: 'First name',
            isLarge: true,
            formMeta: {
              page: 3,
              field: 'First name',
              section: FormSections.YOUR_DETAILS_SECTION,
            },
          },
        },
        {
          componentType: ComponentType.TEXT,
          componentData: {
            header: 'Last name',
            isLarge: true,
            formMeta: {
              page: 3,
              field: 'Last name',
              section: FormSections.YOUR_DETAILS_SECTION,
            },
          },
        },
        {
          componentType: ComponentType.TEXT,
          componentData: {
            header: 'Job title or role',
            subHeading: 'For example, volunteer manager, fundraiser, project coordinator.',
            isLarge: true,
            formMeta: {
              page: 3,
              field: 'Job title or role',
              section: FormSections.YOUR_DETAILS_SECTION,
            },
          },
        },
        {
          componentType: ComponentType.TEXT,
          componentData: {
            header: 'Email',
            subHeading:
              "Use your charity email address if you're staff, or personal email address if you're a volunteer. You will need this email to sign in.",
            isLarge: true,
            formMeta: {
              page: 3,
              field: 'Email',
              section: FormSections.YOUR_DETAILS_SECTION,
            },
          },
        },
        {
          componentType: ComponentType.TEXT,
          componentData: {
            header: 'Phone',
            formMeta: {
              page: 3,
              field: 'Phone',
              section: FormSections.YOUR_DETAILS_SECTION,
            },
          },
        },
      ],
    },
    {
      header: "What is your charity or volunteer group's main address?",
      subHeader: 'This can be your work address or where you store your school products',
      formComponents: [
        {
          componentType: ComponentType.TEXT,
          componentData: {
            header: 'Address line 1',
            isLarge: true,
            formMeta: {
              page: 4,
              field: 'Address line 1',
              section: FormSections.CHARITY_SECTION,
            },
          },
        },
        {
          componentType: ComponentType.TEXT,
          componentData: {
            header: 'Address line 2 (optional)',
            isLarge: true,
            formMeta: {
              page: 4,
              field: 'Address line 2',
              section: FormSections.CHARITY_SECTION,
            },
          },
        },
        {
          componentType: ComponentType.TEXT,
          componentData: {
            header: 'Town or city',
            formMeta: {
              page: 4,
              field: 'Town',
              section: FormSections.CHARITY_SECTION,
            },
          },
        },
        {
          componentType: ComponentType.TEXT,
          componentData: {
            header: 'County',
            formMeta: {
              page: 4,
              field: 'County',
              section: FormSections.CHARITY_SECTION,
            },
          },
        },
        {
          componentType: ComponentType.TEXT,
          componentData: {
            header: 'Postcode',
            isSmall: true,
            formMeta: {
              page: 4,
              field: 'Postcode',
              section: FormSections.CHARITY_SECTION,
            },
          },
        },
      ],
    },
    {
      header: 'Tell us about your charity or volunteer group',
      formComponents: [
        {
          componentType: ComponentType.TEXTAREA,
          componentData: {
            subHeading:
              'Describe the great work your charity or volunteer group are doing. Let us know how you can help families and schools.',
            hint: 'This information can only be seen by Donate to Educate administrators.',
            characterLimit: 1000,
            formMeta: {
              page: 4,
              field: 'About',
              section: FormSections.CHARITY_SECTION,
            },
          },
        },
      ],
    },
    {
      header: 'Check your Answers',
      formComponents: [
        {
          componentType: ComponentType.CYA,
          componentData: {
            sections: [FormSections.YOUR_DETAILS_SECTION, FormSections.CHARITY_SECTION],
            formName: FormNames.CHARITY,
            formMeta: {
              page: 5,
            },
          },
        },
      ],
    },
    {
      logo: <LogoBlue />,
      header: 'This service is [--------]',
      subHeader:
        'Explanation into things like security and how it is one account per supporter [-----------------------]',
      isDeclarationPage: true,
      formComponents: [
        {
          componentType: ComponentType.CHECKBOX,
          componentData: {
            label: 'GDPR content and statement [---------------]',
            formMeta: {
              page: 6,
              field: 'GDPR content and statement [---------------]',
            },
          },
          classNameSuffix: 'checkbox',
        },
        {
          componentType: ComponentType.CHECKBOX,
          componentData: {
            label: 'Legal understanding [---------------]',

            formMeta: {
              page: 6,
              field: 'Legal understanding [---------------]',
            },
          },
          classNameSuffix: 'checkbox',
        },
        {
          componentType: ComponentType.CHECKBOX,
          componentData: {
            label: 'I will be administrating the account [---------------]',
            formMeta: {
              page: 6,
              field: 'I will be administrating the account [---------------]',
            },
          },
          classNameSuffix: 'checkbox',
        },
      ],
    },
    {
      formComponents: [
        {
          componentType: ComponentType.SUMMARY,
          componentData: {
            icon: <SchoolQuestion />,
            header: 'Thanks for supporting Donate to Educate',
            body: [
              'Your local authority or local council will review your details to check whether you can join us.',
              "We'll email you with the results as soon as we have them.",
            ],
            logo: <LogoWhite />,
          },
        },
      ],
    },
  ];

  return (
    <div className={styles.container}>
      <MultiStepForm
        formTemplate={formTemplate}
        formData={formData}
        isLoading={isLoading}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        onChange={onChange}
        refetch={refetch}
      />
    </div>
  );
};

export default SignUpCharity;
