import { render } from '@testing-library/react';
import { FormSections } from '@/types/data';
import AddressInset from '../AddressInset';

describe('Address Inset', () => {
  test('should not render if no name, localAuthority and postcode', () => {
    const componentData = {
      header: 'Join Donate to Educate',
      infoText: 'To add your school, you need to:',
    };
    const { queryByLabelText } = render(
      <AddressInset formData={[]} componentData={componentData} />
    );
    expect(queryByLabelText('address-inset')).toBeNull();
  });

  test('should render if name, local authority and postcode exist in form data', () => {
    const formData = [
      {
        field: 'School',
        value: 'Newport School - E10 6PJ',
        fullValue: {
          value: '103048',
          label: 'Newport School - E10 6PJ',
          name: 'Newport School',
          localAuthority: 'Waltham Forest',
          registrationState: 'laNotRegistered',
          postcode: 'E10 6PJ',
          registered: false,
        },
      },
    ];
    const componentData = {
      subHeading: "Enter your school's name or postcode.",
      formMeta: { page: 1, field: 'School', section: FormSections.YOUR_DETAILS_SECTION },
      options: [],
      ariaLabel: 'label',
    };
    const { queryByLabelText } = render(
      <AddressInset formData={formData} componentData={componentData} />
    );
    expect(queryByLabelText('address-inset')).not.toBeNull();
  });
});
