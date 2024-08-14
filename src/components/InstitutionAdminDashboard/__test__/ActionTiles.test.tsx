import { createWrapper } from '@/mocks/mockGraphqlClient';
import ActionTiles from '../EditableDashboard/ActionTiles';
import { charityProfile, schoolProfile } from './mockData';
import { render } from '@testing-library/react';
import * as router from 'react-router';
import userEvent from '@testing-library/user-event';
import Paths from '@/config/paths';
import { InstitutionType } from '@/types/data';

const navigate = vi.fn();

beforeEach(() => {
  vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
});

describe('Action tiles', () => {
  it('should handle requests tile click with school profile', async () => {
    const Component = createWrapper(
      <ActionTiles profile={schoolProfile} type={InstitutionType.SCHOOL} />
    );
    const { getByRole } = render(<Component />);
    const requestButton = getByRole('button', { name: 'Edit products button' });

    await userEvent.click(requestButton);

    const state = {
      state: {
        id: '125821',
        name: 'Test School',
        postcode: 'GU27 3RN',
        profile: {
          __typename: 'ProfileItems',
          actionText:
            "Once we have your request for the products you need, we'll contact you to arrange the next steps as soon as we can.",
          items: '{}',
          productTypes: [],
          whatToExpect: 'LOREM',
        },
        type: 'tick',
      },
    };

    expect(navigate).toHaveBeenCalledWith(Paths.SCHOOL_EDIT, state);
  });

  it('should handle donations tile click with charity profile', async () => {
    const Component = createWrapper(
      <ActionTiles profile={charityProfile} type={InstitutionType.CHARITY} />
    );
    const { getByRole } = render(<Component />);
    const donationsButton = getByRole('button', { name: 'Enable donations button' });

    await userEvent.click(donationsButton);

    const state = {
      state: {
        id: '1',
        name: 'Test Charity',
        postcode: 'n5 1ge',
        profile: null,
        type: 'heart',
      },
    };

    expect(navigate).toHaveBeenCalledWith(Paths.CHARITIES_EDIT, state);
  });

  it('should handle excess tile click with charity profile', async () => {
    const Component = createWrapper(
      <ActionTiles profile={charityProfile} type={InstitutionType.CHARITY} />
    );
    const { getByRole } = render(<Component />);
    const requestButton = getByRole('button', { name: 'Enable sharing button' });

    await userEvent.click(requestButton);

    const state = {
      state: {
        id: '1',
        name: 'Test Charity',
        postcode: 'n5 1ge',
        profile: null,
        type: 'plus',
      },
    };

    expect(navigate).toHaveBeenCalledWith(Paths.CHARITIES_EDIT, state);
  });
});
