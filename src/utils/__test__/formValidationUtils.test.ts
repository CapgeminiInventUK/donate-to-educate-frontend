import { ComponentType, FormErrors, FormSections } from '@/types/data';
import {
  getFormErrors,
  parsePhoneNumber,
  validateFormInputField,
  validatePostcodeAndAddToFormErrors,
} from '../formValidationUtils';
import { createTestQueryClient } from '@/mocks/mockGraphqlClient';
import { nonExistentPostcode, validPostcode } from '@/mocks/mockParams';

describe('validateFormInputField', () => {
  const tooLongMessage = Array.from(Array(500))
    .map((_, index) => `${index}`)
    .join('');
  const inputVsExpected = [
    {
      formData: [
        {
          field: 'Email',
          value: 'invalidEmail',
          section: FormSections.YOUR_DETAILS_SECTION,
          page: 3,
        },
      ],
      fieldName: 'email',
      error: FormErrors.EMAIL_ERROR_MESSAGE,
    },
    {
      formData: [
        {
          field: 'Email',
          value: 'validEmail@test.com',
          section: FormSections.YOUR_DETAILS_SECTION,
          page: 3,
        },
      ],
      fieldName: 'email',
      error: null,
    },
    {
      formData: [
        {
          field: 'Postcode',
          value: 'invalid Postcode',
          section: FormSections.YOUR_DETAILS_SECTION,
          page: 3,
        },
      ],
      fieldName: 'postcode',
      error: FormErrors.POSTCODE_ERROR_MESSAGE,
    },
    {
      formData: [
        {
          field: 'Postcode',
          value: 'NE1 1EE',
          section: FormSections.YOUR_DETAILS_SECTION,
          page: 3,
        },
      ],
      fieldName: 'postcode',
      error: null,
    },
    {
      formData: [
        {
          field: 'Phone',
          value: 'invalid Phone',
          section: FormSections.YOUR_DETAILS_SECTION,
          page: 3,
        },
      ],
      fieldName: 'phone',
      error: FormErrors.PHONE_ERROR_MESSAGE,
    },
    {
      formData: [
        {
          field: 'Phone',
          value: '07777777777',
          section: FormSections.YOUR_DETAILS_SECTION,
          page: 3,
        },
      ],
      fieldName: 'phone',
      error: null,
    },
    {
      formData: [
        {
          field: 'Message',
          value: tooLongMessage,
          section: FormSections.YOUR_DETAILS_SECTION,
          page: 3,
        },
      ],
      fieldName: 'message',
      error: FormErrors.TEXTAREA_MAX_LENGTH,
    },
    {
      formData: [
        {
          field: 'Message',
          value: 'Short message',
          section: FormSections.YOUR_DETAILS_SECTION,
          page: 3,
        },
      ],
      fieldName: 'message',
      error: null,
    },
    {
      formData: [
        {
          field: 'Other',
          value: 'asdfa',
          section: FormSections.YOUR_DETAILS_SECTION,
          page: 3,
        },
      ],
      fieldName: 'something else',
      error: null,
    },
  ];
  it.each(inputVsExpected)(
    'should return correct error message if error present',
    ({ formData, fieldName, error }) => {
      expect(validateFormInputField(formData, fieldName)).toBe(error);
    }
  );
});

describe('getFormErrors', () => {
  const formComponents = [
    {
      componentType: ComponentType.TEXT,
      componentData: {
        header: 'Email',
        ariaLabel: 'email',
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
  ];
  it('should return a validation error object when triggered', () => {
    const formData = [
      {
        field: 'Email',
        value: 'invalidEmail',
        section: FormSections.YOUR_DETAILS_SECTION,
        page: 3,
      },
    ];
    expect(getFormErrors(formComponents, formData)).toEqual({
      Email: 'Enter the email address in the correct format, like team@donatetoeducate.org.uk',
    });
  });

  it('should return empty object if no validation errors triggered', () => {
    const formData = [
      {
        field: 'Email',
        value: 'validEmail@email.com',
        section: FormSections.YOUR_DETAILS_SECTION,
        page: 3,
      },
    ];
    expect(getFormErrors(formComponents, formData)).toEqual({});
  });
});

describe('validatePostcodeAndAddToFormErrors', () => {
  const queryClient = createTestQueryClient();
  it('should not apply any errors if valid postcode', async () => {
    const formData = [
      {
        field: 'Postcode',
        value: validPostcode,
        section: FormSections.YOUR_DETAILS_SECTION,
        page: 3,
      },
    ];
    const errors = {};
    await validatePostcodeAndAddToFormErrors(queryClient, errors, formData);
    expect(errors).toEqual({});
  });

  it('should apply postcode error if postcode not found', async () => {
    const formData = [
      {
        field: 'Postcode',
        value: nonExistentPostcode,
        section: FormSections.YOUR_DETAILS_SECTION,
        page: 3,
      },
    ];
    const errors = {};
    await validatePostcodeAndAddToFormErrors(queryClient, errors, formData);
    expect(errors).toEqual({ Postcode: FormErrors.POSTCODE_NOT_FOUND });
  });
});

describe('parsePhoneNumber', () => {
  it('should not apply any logic if no phone number field present', () => {
    const formData = [
      {
        field: 'Postcode',
        value: validPostcode,
        section: FormSections.YOUR_DETAILS_SECTION,
        page: 3,
      },
    ];
    parsePhoneNumber(formData);
    expect(formData).toHaveLength(1);
  });

  it('should parse phone number if valid uk number', () => {
    const formData = [
      {
        field: 'Phone',
        value: '07777777777',
        section: FormSections.YOUR_DETAILS_SECTION,
        page: 3,
      },
    ];
    parsePhoneNumber(formData);
    expect(formData[0].value).toBe('+447777777777');
  });
});
