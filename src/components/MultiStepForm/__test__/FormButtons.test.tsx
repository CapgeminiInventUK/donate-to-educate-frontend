import { createWrapper } from '@/mocks/mockGraphqlClient';
import FormButtons from '../FormButtons';
import { SummaryPageColour } from '@/types/data';
import { render } from '@testing-library/react';
import * as router from 'react-router';
import userEvent from '@testing-library/user-event';
import Paths from '@/config/paths';
import { ButtonProps } from '@/types/props';
import styles from '../MultiStepForm.module.scss';
import buttonStyles from '../../FormButton/FormButton.module.scss';

const navigate = vi.fn();

beforeEach(() => {
  vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
});

describe('Form buttons', () => {
  it('should handle return home click', async () => {
    const props = {
      isLastPage: true,
      isUnhappyPath: false,
      summaryPageBg: SummaryPageColour.BLUE,
      cyaPageNumber: 3,
      pageNumber: 5,
      isSchoolRegistered: false,
      declarationSigned: true,
    };
    const Component = createWrapper(<FormButtons {...props} />);
    const { getByRole } = render(<Component />);

    const homeButton = getByRole('button');
    await userEvent.click(homeButton);
    expect(navigate).toHaveBeenCalledWith(Paths.HOME);
  });

  it('should handle internal link click', async () => {
    const internalLinkClick = vi.fn();
    const props = {
      isLastPage: false,
      isUnhappyPath: false,
      summaryPageBg: SummaryPageColour.BLUE,
      pageNumber: 1,
      isSchoolRegistered: false,
      declarationSigned: false,
      formComponentInternalLink: {
        ariaLabel: 'cannot find school',
        text: 'I cannot find my school',
        theme: 'link',
        onClick: internalLinkClick,
      } as ButtonProps,
    };
    const Component = createWrapper(<FormButtons {...props} />);
    const { getByRole } = render(<Component />);

    const homeButton = getByRole('button', { name: 'internal link' });
    await userEvent.click(homeButton);
    expect(internalLinkClick).toHaveBeenCalled();
  });

  it('should apply a classname of returnHomeLinkUnhappy when summary page background is white', () => {
    const props = {
      isLastPage: true,
      isUnhappyPath: true,
      summaryPageBg: SummaryPageColour.WHITE,
      cyaPageNumber: 3,
      pageNumber: 5,
      isSchoolRegistered: false,
      declarationSigned: true,
    };
    const Component = createWrapper(<FormButtons {...props} />);
    const { getByLabelText } = render(<Component />);

    const homeButton = getByLabelText('home-link-container');
    expect(homeButton).toHaveClass(styles.returnHomeLinkUnhappy);
  });

  it('should render disabled send application button when declaration signed is false', () => {
    const props = {
      isLastPage: false,
      isUnhappyPath: false,
      summaryPageBg: SummaryPageColour.BLUE,
      cyaPageNumber: 3,
      pageNumber: 4,
      isSchoolRegistered: false,
      declarationSigned: false,
    };
    const Component = createWrapper(<FormButtons {...props} />);
    const { getByRole } = render(<Component />);

    const sendApplicationButton = getByRole('button', { name: 'send' });
    expect(sendApplicationButton).toBeDisabled();
    expect(sendApplicationButton).toHaveClass(buttonStyles.formButtonDisabled);
  });

  it('should render not disabled send application button when declaration signed is true', () => {
    const props = {
      isLastPage: false,
      isUnhappyPath: false,
      summaryPageBg: SummaryPageColour.BLUE,
      cyaPageNumber: 3,
      pageNumber: 4,
      isSchoolRegistered: false,
      declarationSigned: true,
    };
    const Component = createWrapper(<FormButtons {...props} />);
    const { getByRole } = render(<Component />);

    const sendApplicationButton = getByRole('button', { name: 'send' });
    expect(sendApplicationButton).not.toBeDisabled();
    expect(sendApplicationButton).toHaveClass(buttonStyles.formButtonGreen);
  });
});
