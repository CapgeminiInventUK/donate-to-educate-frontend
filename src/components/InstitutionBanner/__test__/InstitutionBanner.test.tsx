import { createWrapper } from '@/mocks/mockGraphqlClient';
import { InstitutionBanner } from '../InstitutionBanner';
import { charityBanner, schoolBanner } from './mockData';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InstitutionType } from '@/types/data';

describe('Institution banner', () => {
  const setBanner = vi.fn();
  it('should render public view if admin view set to false', () => {
    const Component = createWrapper(
      <InstitutionBanner
        banner={charityBanner}
        setBanner={setBanner}
        type={InstitutionType.CHARITY}
        name="Test Charity"
      />
    );
    const { getAllByRole } = render(<Component />);
    const links = getAllByRole('link');
    expect(links).toHaveLength(3);
  });

  it('should be editable if admin view set to true', async () => {
    const Component = createWrapper(
      <InstitutionBanner
        isAdminView={true}
        banner={charityBanner}
        setBanner={setBanner}
        type={InstitutionType.CHARITY}
        name="Test Charity"
      />
    );
    const { getByRole, getAllByRole } = render(<Component />);
    const editButton = getByRole('button', { name: 'edit' });

    await userEvent.click(editButton);

    const inputs = getAllByRole('textbox');

    expect(inputs).toHaveLength(4);

    await userEvent.clear(inputs[3]);
    await userEvent.click(inputs[3]);

    await userEvent.keyboard('new address');

    const saveButton = getByRole('button', { name: 'save' });

    await userEvent.click(saveButton);

    expect(setBanner).toHaveBeenCalled();
  });

  it('should have uniform policy as editable if admin view set to true at type set to school', async () => {
    const Component = createWrapper(
      <InstitutionBanner
        isAdminView={true}
        banner={schoolBanner}
        setBanner={setBanner}
        type={InstitutionType.SCHOOL}
        name="Test School"
      />
    );
    const { getByRole, getAllByRole } = render(<Component />);
    const editButton = getByRole('button', { name: 'edit' });

    await userEvent.click(editButton);

    const inputs = getAllByRole('textbox');

    await userEvent.clear(inputs[3]);
    await userEvent.click(inputs[3]);

    await userEvent.keyboard('New policy');

    const saveButton = getByRole('button', { name: 'save' });

    await userEvent.click(saveButton);

    expect(setBanner).toHaveBeenCalled();
  });

  it('should handle cancel edit mode click', async () => {
    const Component = createWrapper(
      <InstitutionBanner
        isAdminView={true}
        banner={schoolBanner}
        setBanner={setBanner}
        type={InstitutionType.SCHOOL}
        name="Test School"
      />
    );
    const { getByRole, getAllByRole } = render(<Component />);
    const editButton = getByRole('button', { name: 'edit' });

    await userEvent.click(editButton);

    const inputs = getAllByRole('textbox');

    await userEvent.clear(inputs[3]);
    await userEvent.click(inputs[3]);

    await userEvent.keyboard('New policy');

    const cancelButton = getByRole('button', { name: 'cancel' });

    await userEvent.click(cancelButton);

    expect(setBanner).toHaveBeenCalled();
  });

  it('should handle graphql error', async () => {
    const banner = { ...schoolBanner, phone: 'error' };
    const Component = createWrapper(
      <InstitutionBanner
        isAdminView={true}
        banner={banner}
        setBanner={setBanner}
        type={InstitutionType.SCHOOL}
        name="Test School"
      />
    );
    const { getByRole, getAllByRole, queryByText } = render(<Component />);
    const editButton = getByRole('button', { name: 'edit' });

    await userEvent.click(editButton);

    const inputs = getAllByRole('textbox');

    await userEvent.clear(inputs[3]);
    await userEvent.click(inputs[3]);

    await userEvent.keyboard('New policy');

    const saveButton = getByRole('button', { name: 'save' });

    await userEvent.click(saveButton);

    const errorMessage = queryByText('Something went wrong');

    expect(errorMessage).toBeInTheDocument();
  });
});
