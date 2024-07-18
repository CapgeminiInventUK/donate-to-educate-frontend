import { getSchoolsNearby } from '@/graphql/queries';
import { client } from '@/graphqlClient';
import type { GetSchoolsNearbyQuery } from '@/types/api';
import { type FormComponent, type FormDataItem, FormErrors } from '@/types/data';
import type { CommonInputProps } from '@/types/props';
import type { QueryClient } from '@tanstack/react-query';
import type { GraphQLQuery } from 'aws-amplify/api';
import { phone } from 'phone';
import type { Dispatch, SetStateAction } from 'react';
import { isLength, isPostalCode } from 'validator';
import isEmail from 'validator/lib/isEmail';
import { formatPhoneNumber } from './formUtils';
import { checkForStringAndReturnEmptyIfFalsy, phoneNumberRegex } from './globals';

export const validateFormInputField = (
  formData: FormDataItem[],
  fieldName: string
): string | null => {
  const value = checkForStringAndReturnEmptyIfFalsy(
    formData.find(({ field }) => field.toLowerCase() === fieldName.toLowerCase())?.value
  );
  switch (fieldName.toLowerCase()) {
    case 'email':
      if (!isEmail(value)) {
        return FormErrors.EMAIL_ERROR_MESSAGE;
      }
      break;
    case 'postcode':
      if (!isPostalCode(value, 'GB')) {
        return FormErrors.POSTCODE_ERROR_MESSAGE;
      }
      break;
    case 'phone':
      if (
        !phoneNumberRegex.test(value) ||
        !phone(value, { country: 'GBR', validateMobilePrefix: false }).isValid
      ) {
        return FormErrors.PHONE_ERROR_MESSAGE;
      }
      break;
    case 'message':
    case 'notes':
      if (isLength(value, { min: 1000 })) {
        return FormErrors.TEXTAREA_MAX_LENGTH;
      }
      break;
  }
  return null;
};

export const getFormErrors = (
  formComponents: FormComponent[],
  formData: FormDataItem[]
): Record<string, string> => {
  return formComponents.reduce(
    (acc: Record<string, string>, { componentData, field: componentField }) => {
      const field = componentField ?? (componentData as CommonInputProps)?.formMeta?.field ?? '';
      const error = validateFormInputField(formData, field);
      if (error) {
        acc[field] = error;
      }
      return acc;
    },
    {}
  );
};

export const validatePostcodeAndAddToFormErrors = async (
  queryClient: QueryClient,
  errors: Record<string, string>,
  formData: FormDataItem[]
): Promise<void> => {
  const postcode = formData.find(({ field }) => field.toLowerCase() === 'postcode')?.value;
  if (postcode) {
    try {
      await queryClient.fetchQuery({
        queryKey: [`getSchoolsNearby-${postcode}-request`],
        queryFn: async () => {
          const data = await client.graphql<GraphQLQuery<GetSchoolsNearbyQuery>>({
            query: getSchoolsNearby,
            variables: {
              postcode,
              distance: 5000,
              type: 'request',
            },
          });
          return data;
        },
      });
    } catch (error) {
      if (error) {
        errors.Postcode = FormErrors.POSTCODE_NOT_FOUND;
      }
    }
  }
};

export const parsePhoneNumber = (formData: FormDataItem[]): void => {
  const phoneNumberIndex = formData.findIndex(({ field }) => field?.toLowerCase() === 'phone');
  const formattedPhoneNumber = formatPhoneNumber(String(formData[phoneNumberIndex]?.value));
  if (formattedPhoneNumber) {
    formData[phoneNumberIndex].value = formattedPhoneNumber;
  }
};

export const validateForm = async (
  formComponents: FormComponent[],
  formData: FormDataItem[],
  setFormErrors: Dispatch<SetStateAction<Record<string, string>>>,
  queryClient?: QueryClient
): Promise<void> => {
  const errors = getFormErrors(formComponents, formData);
  queryClient && (await validatePostcodeAndAddToFormErrors(queryClient, errors, formData));

  if (Object.keys(errors).length > 0) {
    setFormErrors((formErrors) => ({ ...formErrors, ...errors }));
    return;
  }

  setFormErrors({});

  parsePhoneNumber(formData);
};
