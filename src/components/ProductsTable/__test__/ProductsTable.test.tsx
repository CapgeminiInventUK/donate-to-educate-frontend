import { createWrapper } from '@/mocks/mockGraphqlClient';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as router from 'react-router';
import ProductsTable from '../ProductsTable';
import {
  productsTablePropsCharity,
  productsTablePropsCharityNoOrganisations,
  productsTablePropsSchool,
  productsTablePropsSchoolNoSchools,
} from './mockData';

const navigate = vi.fn();

beforeEach(() => {
  vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
});

describe('Products table', () => {
  it('should render table with no organisations message if type is charities and none present', () => {
    const Component = createWrapper(
      <ProductsTable {...productsTablePropsCharityNoOrganisations} />
    );

    const { getAllByRole, queryByText } = render(<Component />);
    expect(getAllByRole('row')).toHaveLength(2);
    expect(queryByText('No charities have registered within your search area')).toBeInTheDocument();
  });

  it('should render table with no  message if type is schools and none present', () => {
    const Component = createWrapper(<ProductsTable {...productsTablePropsSchoolNoSchools} />);

    const { getAllByRole, queryByText } = render(<Component />);
    expect(getAllByRole('row')).toHaveLength(2);
    expect(
      queryByText('No charities have registered within your search area')
    ).not.toBeInTheDocument();
  });

  it('should render charities table with rows when charity data present', () => {
    const Component = createWrapper(<ProductsTable {...productsTablePropsCharity} />);

    const { getAllByRole } = render(<Component />);
    expect(getAllByRole('row')).toHaveLength(2);
  });

  it('should render schools table with rows when school data present and handle registered filter', async () => {
    const Component = createWrapper(<ProductsTable {...productsTablePropsSchool} />);

    const { getAllByRole, findAllByRole, getByRole } = render(<Component />);
    expect(getAllByRole('row')).toHaveLength(4);

    const filterButtons = getAllByRole('button', { name: 'filter' });

    await userEvent.click(filterButtons[0]);

    const checkboxes = await findAllByRole('checkbox');

    await userEvent.click(checkboxes[0]);

    const okButton = getByRole('button', { name: 'OK' });

    await userEvent.click(okButton);

    expect(getAllByRole('row')).toHaveLength(3);
  });

  it('should hide schools not joined when hideNotJoinedPropPassed', () => {
    const Component = createWrapper(
      <ProductsTable {...productsTablePropsSchool} hideNotJoined={true} />
    );

    const { getAllByRole } = render(<Component />);
    expect(getAllByRole('row')).toHaveLength(3);
  });
});
