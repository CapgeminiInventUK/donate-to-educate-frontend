import Paths from '@/config/paths';
import { createWrapper } from '@/mocks/mockGraphqlClient';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as router from 'react-router';
import PublicDashboardActionTiles from '../PublicDashboardActionTiles';
import { charityPublicDashboardTilesProps, schoolPublicDashboardTilesProps } from './mockData';

const navigate = vi.fn();

beforeEach(() => {
  vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
});

afterEach(() => {
  vi.resetAllMocks();
});

describe('Public dashboard action tiles', () => {
  it('should navigate to school dashboard items if type is school', async () => {
    const state = {
      type: 'tick',
      profile: {
        items: '{"0":["Blazers","Jumpers"],"2":["Triangles"]}',
        whatToExpect:
          'View the products we have in stock. While we update our stock levels regularly, they may change daily.',
        actionText:
          "Once we have your request for the products you need, we'll contact you to arrange the next steps as soon as we can.",
        productTypes: [0, 2],
        __typename: 'ProfileItems',
      },
      name: 'Test School',
      id: '125821',
      previewMode: undefined,
      postcode: 'GU27 3RN',
    };
    const Component = createWrapper(
      <PublicDashboardActionTiles {...schoolPublicDashboardTilesProps} />
    );
    const { getByRole } = render(<Component />);

    const requestButton = getByRole('button', { name: 'Request button' });
    await userEvent.click(requestButton);

    expect(navigate).toHaveBeenCalledWith(Paths.SCHOOLS_DASHBOARD_ITEMS, { state });
  });

  it('should navigate to charity dashboard items if type is charity', async () => {
    const state = {
      type: 'heart',
      profile: {
        items: '{"0":["Skirts"]}',
        whatToExpect:
          "View the products we need. When you select 'donate', you can tell us how you can help.",
        actionText:
          "Once we have your message about the products you can donate, we'll contact you to arrange the next steps as soon as we can.",
        productTypes: [0],
        __typename: 'ProfileItems',
      },
      name: 'Test Charity',
      id: '123456',
      previewMode: undefined,
      postcode: 'BN3 3JP',
    };
    const Component = createWrapper(
      <PublicDashboardActionTiles {...charityPublicDashboardTilesProps} />
    );
    const { getByRole } = render(<Component />);

    const requestButton = getByRole('button', { name: 'Donate button' });
    await userEvent.click(requestButton);

    expect(navigate).toHaveBeenCalledWith(Paths.CHARITY_DASHBOARD_ITEMS, { state });
  });
});
