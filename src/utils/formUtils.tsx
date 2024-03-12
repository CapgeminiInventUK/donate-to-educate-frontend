import {
  DropdownOption,
  FormDataItem,
  FormErrors,
  FormNames,
  FormSections,
  SubmittedFormData,
} from '@/types/data';
import { SingleValue } from 'react-select';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';

const excludedValues = [
  'First name',
  'Last name',
  'Address line 1',
  'Address line 2',
  'Town',
  'County',
  'Postcode',
];

export const findValueFromFormData = (formData: FormDataItem[], fieldName: string): string => {
  return formData.find(({ field }) => field === fieldName)?.value?.toString() ?? '';
};

export const findFullValueFromFormData = (
  formData: FormDataItem[],
  fieldName: string
): Record<string, unknown> | undefined => {
  return formData.find(({ field }) => field === fieldName)?.fullValue;
};

export const validateFormInputField = (
  formData: FormDataItem[],
  fieldName: string
): string | null => {
  const value = formData.find(({ field }) => field === fieldName)?.value ?? '';
  if (typeof value === 'string') {
    switch (fieldName) {
      case 'Email':
        if (!isEmail(value)) {
          return FormErrors.EMAIL_ERROR_MESSAGE;
        }
        break;
      case 'Phone':
        if (!isMobilePhone(value, 'en-GB')) {
          return FormErrors.PHONE_ERROR_MESSAGE;
        }
        break;
    }
  }
  return null;
};

const addressBuilder = (formData: FormDataItem[]): string => {
  const addressLineOne = findValueFromFormData(formData, 'Address line 1');
  const addressLineTwo = findValueFromFormData(formData, 'Address line 2');
  const town = findValueFromFormData(formData, 'Town');
  const county = findValueFromFormData(formData, 'County');
  const postcode = findValueFromFormData(formData, 'Postcode');
  return `${addressLineOne}
          ${addressLineTwo}
          ${town}
          ${county}
          ${postcode}
          `;
};

const nameBuilder = (formData: FormDataItem[]): string => {
  const firstName = findValueFromFormData(formData, 'First name');
  const lastName = findValueFromFormData(formData, 'Last name');
  return `${String(firstName)} ${String(lastName)}`;
};

const assignDataToSections = (
  data: FormDataItem[],
  sections: FormSections[]
): Record<FormSections, FormDataItem[]> => {
  const accumulator: Record<string, FormDataItem[]> = sections.reduce((acc, section) => {
    return { [section]: [], ...acc };
  }, {});
  return data.reduce((acc, { field, value, page, section }) => {
    if (field === 'First name' || field === 'Last name' || !section) {
      return acc;
    }
    acc[section] = [...acc[section], { field, value, page }];
    return acc;
  }, accumulator);
};

export const getCharityCyaData = (
  formData: FormDataItem[]
): Record<FormSections, FormDataItem[]> => {
  const fullName = nameBuilder(formData);
  const address = addressBuilder(formData);
  const data = [
    { field: 'Name', value: fullName, page: 3, section: FormSections.YOUR_DETAILS_SECTION },
    { field: 'Address', value: address, page: 4, section: FormSections.CHARITY_SECTION },
    ...formData,
  ].filter(({ field }) => !excludedValues.includes(field));

  return assignDataToSections(data, [
    FormSections.YOUR_DETAILS_SECTION,
    FormSections.CHARITY_SECTION,
  ]);
};

export const getSchoolCyaData = (
  formData: FormDataItem[]
): Record<FormSections, FormDataItem[]> => {
  const fullName = nameBuilder(formData);
  const data = [
    { field: 'Name', value: fullName, page: 2, section: FormSections.YOUR_DETAILS_SECTION },
    ...formData,
  ].filter(({ field }) => !excludedValues.includes(field));
  return assignDataToSections(data, [FormSections.YOUR_DETAILS_SECTION]);
};

export const getRegisterLocalAuthorityFormData = (
  formData: FormDataItem[]
): Record<FormSections, FormDataItem[]> => {
  const data = formData.filter(({ section }) => section === FormSections.YOUR_DETAILS_SECTION);
  return assignDataToSections(data, [FormSections.YOUR_DETAILS_SECTION]);
};

export const checkYourAnswersDataMap = (
  formName: FormNames,
  formData?: FormDataItem[]
): Record<string, FormDataItem[]> | undefined => {
  if (!formData) {
    return;
  }
  switch (formName) {
    case FormNames.CHARITY:
      return getCharityCyaData(formData);
    case FormNames.SCHOOL:
      return getSchoolCyaData(formData);
    default:
      return;
  }
};

export const getValueFromOptionsByLabel = (
  options: DropdownOption[],
  valueLabel?: string
): SingleValue<DropdownOption> | undefined => {
  return options.find(({ label = '' }) => label === valueLabel);
};

export const getFormDataForSubmission = (
  cyaData: Record<FormSections, FormDataItem[]>,
  type: FormNames
): SubmittedFormData => {
  const joinRequestVariables: SubmittedFormData = {
    name: '',
    email: '',
    jobTitle: '',
    school: undefined,
    phone: undefined,
    charityName: undefined,
    charityAddress: undefined,
    aboutCharity: undefined,
  };

  if (type === FormNames.CHARITY) {
    joinRequestVariables.charityName = findValueFromFormData(
      cyaData[FormSections.CHARITY_SECTION],
      'Name'
    );

    joinRequestVariables.charityAddress = findValueFromFormData(
      cyaData[FormSections.CHARITY_SECTION],
      'Address'
    );

    joinRequestVariables.aboutCharity = findValueFromFormData(
      cyaData[FormSections.CHARITY_SECTION],
      'About'
    );
  }

  if (type === FormNames.AUTHORITY) {
    joinRequestVariables.message = String(
      findValueFromFormData(cyaData[FormSections.YOUR_DETAILS_SECTION], 'Message')
    );
  }

  joinRequestVariables.name = String(
    findValueFromFormData(cyaData[FormSections.YOUR_DETAILS_SECTION], 'Name')
  );

  joinRequestVariables.email = String(
    findValueFromFormData(cyaData[FormSections.YOUR_DETAILS_SECTION], 'Email')
  );

  joinRequestVariables.jobTitle = String(
    findValueFromFormData(cyaData[FormSections.YOUR_DETAILS_SECTION], 'Job title or role')
  );

  joinRequestVariables.school = findValueFromFormData(
    cyaData[FormSections.YOUR_DETAILS_SECTION],
    'School'
  );

  joinRequestVariables.phone = findValueFromFormData(
    cyaData[FormSections.YOUR_DETAILS_SECTION],
    'Phone'
  );

  return { ...joinRequestVariables };
};
