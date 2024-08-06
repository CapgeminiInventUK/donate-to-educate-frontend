import { render } from '@testing-library/react';
import InfoTable from '../InfoTable';
import Caution from '../../../assets/icons/Caution';
import userEvent from '@testing-library/user-event';

describe('Info table', () => {
  it('should render component', () => {
    const props = {
      tableValues: {
        Name: 'Name',
        Email: 'test@test.com',
        'Job title or role': 'Job',
        Phone: '07777777777',
        Department: 'Department',
      },
      editableKeys: ['Job title or role', 'Department', 'Phone'],
      isAccounts: false,
      isDelete: false,
    };
    expect(render(<InfoTable {...props} />)).toMatchSnapshot();
  });

  it('should render component with title and icon when present', () => {
    const props = {
      tableValues: {
        'Local authority': 'LA',
        'Your account': 'test@test.com',
      },
      editableKeys: [],
      isAccounts: false,
      isDelete: true,
      title: 'Danger zone',
      className: 'deleteTable',
      rowClassName: 'deleteTableRow',
      icon: <Caution />,
    };
    expect(render(<InfoTable {...props} />)).toMatchSnapshot();
  });

  it('should render component with user accounts', () => {
    const props = {
      tableValues: {
        'Account 1': 'Account user one',
        'Account 2': 'Account user two',
        'Account 3': '',
      },
      editableKeys: [],
      isAccounts: true,
      isDelete: false,
    };
    expect(render(<InfoTable {...props} />)).toMatchSnapshot();
  });

  it('should handle Edit', async () => {
    const onEdit = vi.fn();
    const props = {
      tableValues: {
        Name: 'Name',
        Email: 'test@test.com',
        'Job title or role': 'Job',
        Phone: '07777777777',
        Department: 'Department',
      },
      editableKeys: ['Job title or role', 'Department', 'Phone'],
      isAccounts: false,
      isDelete: false,
      onEdit,
    };
    const { getAllByRole } = render(<InfoTable {...props} />);

    const editButton = getAllByRole('button', { name: 'edit-button' })[0];

    await userEvent.click(editButton);
    expect(onEdit).toHaveBeenCalled();
  });

  it('should handle Delete', async () => {
    const onDelete = vi.fn();
    const props = {
      tableValues: {
        'Local authority': 'LA',
        'Your account': 'test@test.com',
      },
      editableKeys: [],
      isAccounts: false,
      isDelete: true,
      title: 'Danger zone',
      className: 'deleteTable',
      rowClassName: 'deleteTableRow',
      icon: <Caution />,
      onDelete,
    };
    const { getAllByRole } = render(<InfoTable {...props} />);

    const editButton = getAllByRole('button', { name: 'delete-button' })[0];

    await userEvent.click(editButton);
    expect(onDelete).toHaveBeenCalled();
  });
});
