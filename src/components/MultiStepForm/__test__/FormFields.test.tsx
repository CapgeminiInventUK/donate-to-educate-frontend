import { ComponentType, FormSections } from '@/types/data';
import { render } from '@testing-library/react';
import FormFields from '../FormFields';

describe('Form fields', () => {
  it('should render an external link if form component link exists', () => {
    const props = {
      formComponents: [
        {
          componentType: ComponentType.DROPDOWN,
          componentData: {
            ariaLabel: 'main local council',
            subHeading: 'If you have locations across the country, choose one main local council.',
            options: [
              {
                value: '201',
                label: 'City of London',
                registered: true,
              },
            ],
            isLarge: true,
            formMeta: {
              page: 2,
              field: 'Main local council',
              section: FormSections.CHARITY_SECTION,
            },
          },
          formComponentLink: {
            ariaLabel: 'find local council',
            linkText: 'Find my local council (opens in a new tab).',
            linkUrl: 'https://www.gov.uk/find-local-council',
          },
        },
      ],
      formErrors: {},
      formData: [
        {
          field: 'Charity Name',
          value: 'Name',
          section: FormSections.CHARITY_SECTION,
          page: 1,
        },
      ],
      isUnhappyPath: false,
      setPageNumber: vi.fn(),
      onChange: vi.fn(),
    };

    const { getByRole } = render(<FormFields {...props} />);

    const link = getByRole('link');
    expect(link).toHaveTextContent('Find my local council (opens in a new tab).');
  });
});
