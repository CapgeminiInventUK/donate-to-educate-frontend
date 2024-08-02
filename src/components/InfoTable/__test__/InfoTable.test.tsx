import { render } from '@testing-library/react';
import InfoTable from '../InfoTable';
import Caution from '../../../assets/icons/Caution';

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

  it('should render component with title and icon when present ', () => {
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
});
