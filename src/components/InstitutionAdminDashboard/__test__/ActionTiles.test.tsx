import { createWrapper } from '@/mocks/mockGraphqlClient';
import ActionTiles from '../EditableDashboard/ActionTiles';
import { charityProfile, schoolProfile } from './mockData';
import { render } from '@testing-library/react';
import * as router from 'react-router';
import userEvent from '@testing-library/user-event';
import Paths from '@/config/paths';

const navigate = vi.fn();

beforeEach(() => {
  vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
});

describe('Action tiles', () => {
  it('should handle requests tile click with school profile', async () => {
    const Component = createWrapper(<ActionTiles profile={schoolProfile} type={'school'} />);
    const { getAllByRole } = render(<Component />);
    const requestButton = getAllByRole('button', { name: 'Request button' });

    await userEvent.click(requestButton[0]);

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
    const Component = createWrapper(<ActionTiles profile={charityProfile} type={'charity'} />);
    const { getAllByRole } = render(<Component />);
    const requestButton = getAllByRole('button', { name: 'Request button' });

    await userEvent.click(requestButton[1]);

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
    const Component = createWrapper(<ActionTiles profile={charityProfile} type={'charity'} />);
    const { getAllByRole } = render(<Component />);
    const requestButton = getAllByRole('button', { name: 'Request button' });

    await userEvent.click(requestButton[2]);

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
