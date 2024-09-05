import { InstitutionType } from '@/types/data';
import { charityProfile, schoolProfile } from '../../__test__/mockData';
import { createWrapper } from '@/mocks/mockGraphqlClient';
import EditableDashboard from '../EditableDashboard';
import { render } from '@testing-library/react';
import * as router from 'react-router';
import userEvent from '@testing-library/user-event';
import Paths from '@/config/paths';

const navigate = vi.fn();

beforeEach(() => {
  vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
});

describe('Editable dashboard', () => {
  it('should navigate to school view on continue button click when type is school', async () => {
    const setBanner = vi.fn();
    const setAbout = vi.fn();
    const setPreview = vi.fn();
    const props = {
      banner: {
        phone: '07777777777',
        email: 'ox@fam.com',
        website: 'www.famofox.com',
        address: 'asdas',
      },
      type: InstitutionType.SCHOOL,
      name: 'Test',
      about: 'Test has pre-loved school products to help children thrive at school.\n\n',
      placeholderAboutText:
        'Test has pre-loved school products to help children thrive at school.\n\nRequest the things you need  to help the next child. You can also take our extra stock to share with the communities that need it most.',
      profile: schoolProfile,
      setBanner,
      setAbout,
      setPreview,
    };
    const Component = createWrapper(<EditableDashboard {...props} />);
    const { getByRole } = render(<Component />);

    const continueButton = getByRole('button', { name: 'Continue' });
    await userEvent.click(continueButton);

    expect(navigate).toHaveBeenCalledWith(Paths.SCHOOL_VIEW);
  });

  it('should navigate to charity view on continue button click when type is charity', async () => {
    const setBanner = vi.fn();
    const setAbout = vi.fn();
    const setPreview = vi.fn();
    const props = {
      banner: {
        phone: '07777777777',
        email: 'ox@fam.com',
        website: 'www.famofox.com',
        address: 'asdas',
      },
      type: InstitutionType.CHARITY,
      name: 'Oxfam',
      about: 'Oxfam has pre-loved school products to help children thrive at school.\n\n',
      placeholderAboutText:
        'Oxfam has pre-loved school products to help children thrive at school.\n\nRequest the things you need  to help the next child. You can also take our extra stock to share with the communities that need it most.',
      profile: charityProfile,
      setBanner,
      setAbout,
      setPreview,
    };
    const Component = createWrapper(<EditableDashboard {...props} />);
    const { getByRole } = render(<Component />);

    const continueButton = getByRole('button', { name: 'Continue' });
    await userEvent.click(continueButton);

    expect(navigate).toHaveBeenCalledWith(Paths.CHARITIES_VIEW);
  });
});
