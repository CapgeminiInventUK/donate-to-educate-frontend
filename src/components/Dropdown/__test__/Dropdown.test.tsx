import { render } from '@testing-library/react';
import Dropdown from '../Dropdown';
import userEvent from '@testing-library/user-event';

const options = [
  { value: 'one', label: 'one' },
  { value: 'two', label: 'two' },
  { value: 'three', label: 'three' },
  { value: 'four', label: '' },
];

const tooManyOptions = Array.from(Array(2001)).map((_, index) => ({
  value: `${index}-value`,
  label: `${index}-label`,
}));

const onChange = vi.fn();

describe('Dropdown', () => {
  it('should handle searching filter', async () => {
    const { findByText, getByRole, queryByText } = render(
      <Dropdown options={options} onChange={onChange} ariaLabel="label" />
    );

    const placeholderText = queryByText('Search for your school');
    expect(placeholderText).toBeInTheDocument();
    expect(placeholderText).toHaveClass('select__placeholder');

    const dropdown = getByRole('combobox');
    await userEvent.click(dropdown);
    await userEvent.keyboard('one');
    const option = await findByText('one');
    await userEvent.click(option);

    expect(onChange).toHaveBeenCalled();
  });

  it('should display dynamic placeholder and header text', () => {
    const { queryByText } = render(
      <Dropdown options={options} ariaLabel="label" subHeading="council" header={'header'} />
    );
    const placeholderText = queryByText('Search for your local council');
    const header = queryByText('header');
    expect(placeholderText).toBeInTheDocument();
    expect(header).toBeInTheDocument();
  });

  it('should not display options if more than 2000 found', async () => {
    const { getByRole, findByText, getByText } = render(
      <Dropdown options={tooManyOptions} onChange={onChange} ariaLabel="label" isLarge={true} />
    );

    const placeholderText = getByText('Search for your school');
    expect(placeholderText).toHaveClass('selectLarge__placeholder');

    const dropdown = getByRole('combobox');
    await userEvent.click(dropdown);
    await userEvent.keyboard('label');

    const noOptionsMessage = await findByText('No schools found');

    expect(noOptionsMessage).toBeInTheDocument();
  });
});
