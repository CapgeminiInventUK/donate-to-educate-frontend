import { FormComponent, FormDataItem, FormErrors } from '@/types/data';
import { formatPhoneNumber, validateFormInputField } from './formUtils';
import { CommonInputProps } from '@/types/props';
import { QueryClient } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from 'aws-amplify/api';
import { GetSchoolsNearbyQuery } from '@/types/api';
import { getSchoolsNearby } from '@/graphql/queries';

export const getFormErrors = (
  formComponents: FormComponent[],
  formData: FormDataItem[]
): Record<string, string> => {
  return formComponents.reduce((acc: Record<string, string>, { componentData }) => {
    const { formMeta: { field = '' } = {} } = componentData as CommonInputProps;
    const error = validateFormInputField(formData, field);
    if (error) {
      acc[field] = error;
    }
    return acc;
  }, {});
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
          await client.graphql<GraphQLQuery<GetSchoolsNearbyQuery>>({
            query: getSchoolsNearby,
            variables: {
              postcode,
              distance: 5000,
              type: 'request',
            },
          });
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
  const phoneNumber = formData[phoneNumberIndex];
  if (phoneNumber) {
    const formattedPhoneNumber = formatPhoneNumber(String(phoneNumber.value));
    if (formattedPhoneNumber) {
      formData[phoneNumberIndex].value = formattedPhoneNumber;
    }
  }
};
