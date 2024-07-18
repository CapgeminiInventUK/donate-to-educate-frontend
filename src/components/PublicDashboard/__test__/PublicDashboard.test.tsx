import { createWrapper } from '@/mocks/mockGraphqlClient';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PublicDashboard from '../PublicDashboard';
import { mockCharityProfileNoDetails, mockSchoolProfile } from './mockData';

describe('Public dashboard', () => {
  it('should not show profile details if none yet set', () => {
    const Component = createWrapper(
      <PublicDashboard type="charity" profile={mockCharityProfileNoDetails} />
    );
    const { queryByText } = render(<Component />);

    expect(
      queryByText('We are still populating our profile, please check back later')
    ).toBeInTheDocument();
    expect(queryByText('Location map')).not.toBeInTheDocument();
    expect(queryByText('About us')).not.toBeInTheDocument();
  });

  it('should show profile details when profile has been saved', () => {
    const Component = createWrapper(<PublicDashboard type="school" profile={mockSchoolProfile} />);
    const { queryByText } = render(<Component />);
    expect(queryByText('About us')).toBeInTheDocument();
  });

  it('should handle edit profile click', async () => {
    const setPreview = vi.fn();
    const Component = createWrapper(
      <PublicDashboard type="school" profile={mockSchoolProfile} setPreview={setPreview} />
    );
    const { getByRole } = render(<Component />);

    const editButton = getByRole('button', { name: 'edit profile' });
    await userEvent.click(editButton);

    expect(setPreview).toHaveBeenCalledWith(false);
  });
});
