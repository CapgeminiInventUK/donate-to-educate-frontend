import { createWrapper } from '@/mocks/mockGraphqlClient';
import PublicDashboard from '../PublicDashboard';
import { mockCharityProfileNoDetails, mockSchoolProfile } from './mockData';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InstitutionType } from '@/types/data';

describe('Public dashboard', () => {
  it('should not show profile details if none yet set', () => {
    const Component = createWrapper(
      <PublicDashboard type={InstitutionType.CHARITY} profile={mockCharityProfileNoDetails} />
    );
    const { queryByText } = render(<Component />);

    expect(queryByText('We are still populating our profile')).toBeInTheDocument();
    expect(queryByText('find nearby charities who may be able to help.')).toBeInTheDocument();
    expect(queryByText('Check back later or you can also')).toBeInTheDocument();
    expect(queryByText('Contact us')).toBeInTheDocument();
    expect(queryByText('if you need help')).toBeInTheDocument();

    expect(queryByText('About us')).not.toBeInTheDocument();
  });

  it('should show profile details when profile has been saved', () => {
    const Component = createWrapper(
      <PublicDashboard type={InstitutionType.SCHOOL} profile={mockSchoolProfile} />
    );
    const { queryByText } = render(<Component />);
    expect(queryByText('About us')).toBeInTheDocument();
  });

  it('should handle edit profile click', async () => {
    const setPreview = vi.fn();
    const Component = createWrapper(
      <PublicDashboard
        type={InstitutionType.SCHOOL}
        profile={mockSchoolProfile}
        setPreview={setPreview}
      />
    );
    const { getByRole } = render(<Component />);

    const editButton = getByRole('button', { name: 'edit profile' });
    await userEvent.click(editButton);

    expect(setPreview).toHaveBeenCalledWith(false);
  });
});
