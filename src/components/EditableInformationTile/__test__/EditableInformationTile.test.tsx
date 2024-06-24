import { render } from '@testing-library/react';
import EditableInformationTile from '../EditableInformationTile';

const props = {
  heading: 'heading',
  onCancel: vi.fn(),
  editContent: vi.fn(),
  saveOnClick: vi.fn(),
  isEditing: false,
  text: 'text',
  setText: vi.fn(),
};

afterEach(() => {
  props.isEditing = false;
});

describe('Editable information tile', () => {
  it('should display editable content if in edit mode', () => {
    props.isEditing = true;
    const { queryByRole } = render(<EditableInformationTile {...props} />);
    expect(queryByRole('textbox')).toBeInTheDocument();
  });

  it('should not display editable content if in edit mode', () => {
    const { queryByRole } = render(<EditableInformationTile {...props} />);
    expect(queryByRole('textbox')).not.toBeInTheDocument();
  });
});
