import { DropdownOption, FormDataItem, FormNames, FormSections } from '@/types/data';
import { SingleValue } from 'react-select';

const excludedValues = [
  'First name',
  'Last name',
  'Address line 1',
  'Address line 2',
  'Town',
  'County',
  'Postcode',
];

export const findValueFromFormData = (
  formData: FormDataItem[],
  fieldName: string
): string | number | boolean => {
  return formData.find(({ field }) => field === fieldName)?.value ?? '';
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

const getJoinD2ECyaData = (formData: FormDataItem[]): Record<string, FormDataItem[]> => {
  const fullName = nameBuilder(formData);
  const address = addressBuilder(formData);
  const data = [
    { field: 'Name', value: fullName, page: 3, section: FormSections.YOUR_DETAILS_SECTION },
    { field: 'Address', value: address, page: 4, section: FormSections.CHARITY_SECTION },
    ...formData,
  ].filter(({ field }) => !excludedValues.includes(field));

  return data.reduce(
    (acc, { field, value, page, section }) => {
      if (field === 'First name' || field === 'Last name' || !section) {
        return acc;
      }
      acc[section] = [...acc[section], { field, value, page }];
      return acc;
    },
    {
      [FormSections.YOUR_DETAILS_SECTION]: [] as FormDataItem[],
      [FormSections.CHARITY_SECTION]: [] as FormDataItem[],
    }
  );
};

export const checkYourAnswersDataMap = (
  formName: FormNames,
  formData?: FormDataItem[]
): Record<string, FormDataItem[]> => {
  if (!formData) {
    return {};
  }
  switch (formName) {
    case FormNames.JOIN:
      return getJoinD2ECyaData(formData);
    default:
      return {};
  }
};

export const getValueFromOptionsByLabel = (
  options: DropdownOption[],
  valueLabel?: string
): SingleValue<DropdownOption> | undefined => {
  return options.find(({ label = '' }) => label === valueLabel);
};
