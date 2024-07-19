import {
  ComponentType,
  type ItemsIconType,
  type RequestFormState,
  type RequestItemsTextContent,
} from '@/types/data';
import { getFormErrors } from '@/utils/formValidationUtils';

export const getTextContent = (
  type: ItemsIconType,
  schoolOrCharity: 'school' | 'charity'
): RequestItemsTextContent => {
  const notesHeading = 'Tell us how you can help';
  const workAtSchool =
    schoolOrCharity === 'school' ? 'I work at another school' : 'I work at a school';

  const donateRadioButtonValues = [
    'parentGuardian',
    'anotherSchool',
    'public',
    'charityVolunteerGroup',
    'somethingElse',
  ];

  const donateRadioButtonLabels = [
    'I am a parent or guardian',
    workAtSchool,
    'I am a member of the public',
    'I work for a charity or volunteer group',
    'Something else',
  ];

  const checkForPublicValue = (value: string): boolean => !value.includes('public');

  const radioButtonValues = donateRadioButtonValues.filter(checkForPublicValue);
  const radioButtonLabels = donateRadioButtonLabels.filter(checkForPublicValue);

  switch (type) {
    case 'tick':
      return {
        radioButtonLabels,
        radioButtonValues,
        buttonText: 'Request products',
        heading:
          schoolOrCharity === 'school' ? 'Request school products' : 'Ask for school products',
        subHeading:
          schoolOrCharity === 'school'
            ? "Tell us which things you need and we'll contact you to arrange the next steps as soon as we can."
            : 'Contact us and tell us what things you need. We will reply to you as soon as we can.',
        notesHeading: 'Tell us what you need',
        notesSubHeading: 'Include the school products and sizes you would like',
      };
    case 'heart':
      return {
        radioButtonLabels: donateRadioButtonLabels,
        radioButtonValues: donateRadioButtonValues,
        buttonText: schoolOrCharity === 'school' ? 'Donate products' : 'Send request',
        heading: 'Donate school products',
        subHeading:
          schoolOrCharity === 'school'
            ? "Tell us which things you'd like to donate and we'll contact you to arrange the next steps as soon as we can."
            : 'Contact us about how you can help. We will reply to you as soon as we can.',
        notesHeading,
        notesSubHeading: '',
      };
    case 'plus':
      return {
        radioButtonLabels,
        radioButtonValues,
        buttonText: 'Take extra stock',
        heading: 'Take extra stock',
        subHeading:
          "Tell us which things you'd like to take from us and we'll contact you to arrange the next steps as soon as we can.",
        notesHeading,
        notesSubHeading: 'Include the school products you can take from us.',
      };
  }
};

export const validateForm = (formState: RequestFormState): Record<string, string> => {
  const formData = Object.entries(formState).map(([field, value]) => ({
    field,
    value: String(value),
  }));
  const formComponents = Object.keys(formState).map((field) => {
    const componentType =
      field === 'who'
        ? ComponentType.RADIO
        : field === 'message'
          ? ComponentType.TEXTAREA
          : ComponentType.TEXT;
    return { field, componentType };
  });
  return getFormErrors(formComponents, formData);
};
