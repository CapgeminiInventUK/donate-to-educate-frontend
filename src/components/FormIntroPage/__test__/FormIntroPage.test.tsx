import { render } from '@testing-library/react';
import FormIntroPage from '../FormIntroPage';

const minimalProps = {
  header: 'header',
  infoText: 'infoText',
};

const allProps = {
  ...minimalProps,
  listItems: ['list item one', 'list item two'],
  secondaryHeading: 'secondary heading',
  secondaryInfoText: 'secondary info text',
  secondaryListItems: ['secondary list item one', 'secondary list item two'],
};

describe('Form intro page', () => {
  it('should render page with only header and info text if only those props passed', () => {
    const screen = render(<FormIntroPage {...minimalProps} />);
    expect(screen).toMatchSnapshot;
  });

  it('should render page with all elements if only all props passed', () => {
    const screen = render(<FormIntroPage {...allProps} />);
    expect(screen).toMatchSnapshot;
  });
});
