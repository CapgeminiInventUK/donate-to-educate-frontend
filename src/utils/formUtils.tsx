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

export const findFullValueFromFormData = (
  formData: FormDataItem[],
  fieldName: string
): Record<string, unknown> | undefined => {
  return formData.find(({ field }) => field === fieldName)?.fullValue;
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
): Record<string, FormDataItem[]> => {
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

const getCharityCyaData = (formData: FormDataItem[]): Record<string, FormDataItem[]> => {
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

const getSchoolCyaData = (formData: FormDataItem[]): Record<string, FormDataItem[]> => {
  const fullName = nameBuilder(formData);
  const data = [
    { field: 'Name', value: fullName, page: 2, section: FormSections.YOUR_DETAILS_SECTION },
    ...formData,
  ].filter(({ field }) => !excludedValues.includes(field));
  return assignDataToSections(data, [FormSections.YOUR_DETAILS_SECTION]);
};

export const checkYourAnswersDataMap = (
  formName: FormNames,
  formData?: FormDataItem[]
): Record<string, FormDataItem[]> => {
  if (!formData) {
    return {};
  }
  switch (formName) {
    case FormNames.CHARITY:
      return getCharityCyaData(formData);
    case FormNames.SCHOOL:
      return getSchoolCyaData(formData);
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
