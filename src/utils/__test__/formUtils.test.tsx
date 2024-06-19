import { FormSections } from '@/types/data';
import { addressBuilder, findValueFromFormData } from '../formUtils';

describe('form utils', () => {
  describe('findValueFromFormData', () => {
    it('should return value from form data with a given field name', () => {
      const formData = [
        {
          field: 'Phone',
          value: '07777777777',
          section: FormSections.YOUR_DETAILS_SECTION,
          page: 3,
        },
      ];
      expect(findValueFromFormData(formData, 'phone')).toBe('07777777777');
    });

    it('should return empty string if form data fields match given field name', () => {
      const formData = [
        {
          field: 'Phone',
          value: '07777777777',
          section: FormSections.YOUR_DETAILS_SECTION,
          page: 3,
        },
      ];
      expect(findValueFromFormData(formData, 'postcode')).toBe('');
    });
  });

  describe('addressBuilder', () => {
    const formData = [
      {
        field: 'Postcode',
        value: 'BN3 3JP',
        section: FormSections.CHARITY_SECTION,
        page: 4,
      },
      {
        field: 'Address line 1',
        value: 'Line one',
        section: FormSections.CHARITY_SECTION,
        page: 4,
      },
      {
        field: 'Town',
        value: 'Town',
        section: FormSections.CHARITY_SECTION,
        page: 4,
      },
      {
        field: 'County',
        value: 'County',
        section: FormSections.CHARITY_SECTION,
        page: 4,
      },
    ];
    it('should create an address string with given form data with no address line two', () => {
      expect(addressBuilder(formData)).toEqual(`Line one\nTown\nCounty\nBN3 3JP`);
    });

    it('should create an address string with given form data with address line two', () => {
      const formDataWithLineTwo = [
        ...formData,
        {
          field: 'Address line 2',
          value: 'Line two',
          section: FormSections.CHARITY_SECTION,
          page: 4,
        },
      ];
      expect(addressBuilder(formDataWithLineTwo)).toEqual(
        `Line one\nLine two\nTown\nCounty\nBN3 3JP`
      );
    });
  });
});
