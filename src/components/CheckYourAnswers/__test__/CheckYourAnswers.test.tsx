import { FormNames, FormSections } from '@/types/data';
import { render } from '@testing-library/react';
import CheckYourAnswers from '../CheckYourAnswers';
import userEvent from '@testing-library/user-event';
import styles from '../CheckYourAnswers.module.scss';

describe('Check your answers', () => {
  const sections = [FormSections.YOUR_DETAILS_SECTION];
  const formName = FormNames.SCHOOL;
  const formData = [
    {
      field: 'School',
      value: 'Test School - TE57 0NE',
      section: FormSections.YOUR_DETAILS_SECTION,
      page: undefined,
      fullValue: {
        value: '125808',
        label: 'Test School - TE57 0NE',
        name: 'Test School',
        localAuthority: 'Test Auth',
        postcode: 'TE57 0NE',
        registered: false,
      },
    },
    {
      field: 'Job title or role',
      value: 'Title',
      section: FormSections.YOUR_DETAILS_SECTION,
      page: 2,
    },
    {
      field: 'Email',
      value: 'test@test.com',
      section: FormSections.YOUR_DETAILS_SECTION,
      page: 2,
    },
    {
      field: 'Phone',
      value: '+447777777777',
      section: FormSections.YOUR_DETAILS_SECTION,
      page: 2,
    },
    {
      field: 'First name',
      value: 'First',
      section: FormSections.YOUR_DETAILS_SECTION,
      page: 2,
    },
    {
      field: 'Last name',
      value: 'Last',
      section: FormSections.YOUR_DETAILS_SECTION,
      page: 2,
    },
  ];

  it('should render each section with a section header', () => {
    const Cya = render(
      <CheckYourAnswers sections={sections} formName={formName} formData={formData} />
    );
    expect(Cya).toMatchSnapshot();
  });

  it('should handle button click', async () => {
    const setPageNumber = vi.fn();
    const { getAllByRole } = render(
      <CheckYourAnswers
        sections={sections}
        formName={formName}
        formData={formData}
        setPageNumber={setPageNumber}
      />
    );
    const changeButtons = getAllByRole('button');
    await userEvent.click(changeButtons[0]);
    expect(setPageNumber).toHaveBeenCalledWith(2);
  });

  it('should not handle button click if no setPageNumber not passed', async () => {
    const setPageNumber = vi.fn();
    const { getAllByRole } = render(
      <CheckYourAnswers sections={sections} formName={formName} formData={formData} />
    );
    const changeButtons = getAllByRole('button');
    await userEvent.click(changeButtons[0]);
    expect(setPageNumber).not.toHaveBeenCalled();
  });

  it('should not handle button click if no page number', async () => {
    const setPageNumber = vi.fn();
    const { getAllByRole } = render(
      <CheckYourAnswers
        sections={sections}
        formName={formName}
        formData={formData}
        setPageNumber={setPageNumber}
      />
    );
    const changeButtons = getAllByRole('button');
    await userEvent.click(changeButtons[1]);
    expect(setPageNumber).not.toHaveBeenCalled();
  });
});

describe('CYA Charity Form', () => {
  it('should set address field properties when address field added', () => {
    const sections = [FormSections.CHARITY_SECTION];
    const formName = FormNames.CHARITY;
    const formData = [
      {
        field: 'Address line 1',
        value: 'Line 1',
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
        field: 'Postcode',
        value: 'PO5 7CD',
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
    const setPageNumber = vi.fn();
    const { getAllByLabelText } = render(
      <CheckYourAnswers
        sections={sections}
        formName={formName}
        formData={formData}
        setPageNumber={setPageNumber}
      />
    );
    const valueCells = getAllByLabelText('value-cell');
    const changeLinkCells = getAllByLabelText('change-link-cell');
    expect(valueCells[0]).toHaveClass(styles.addressCell);
    expect(changeLinkCells[0]).toHaveClass(styles.changeAddressLink);
  });
});
