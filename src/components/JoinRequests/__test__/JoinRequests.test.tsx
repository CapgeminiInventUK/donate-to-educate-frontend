import { render } from '@testing-library/react';
import JoinRequests from '../JoinRequests';
import userEvent from '@testing-library/user-event';
import { StageState } from '@/types/data';
import { dataWithMultipleSchools, dataWithSchoolAndCharity } from './mockData';
import * as globals from '@/utils/globals';

describe('Join requests', () => {
  const setStage = vi.fn();
  const setSchoolOrCharityProperties = vi.fn();
  it('should render schools and charities join requests tables', () => {
    const { getAllByRole } = render(
      <JoinRequests
        data={dataWithSchoolAndCharity}
        setStage={setStage}
        setSchoolOrCharityProperties={setSchoolOrCharityProperties}
      />
    );
    const h2s = getAllByRole('heading', { level: 2 });
    expect(h2s[0]).toHaveTextContent('Schools');
    expect(h2s[1]).toHaveTextContent('Charities and volunteer groups');
  });

  it('should handle view requests button click for school', async () => {
    const { getAllByRole } = render(
      <JoinRequests
        data={dataWithSchoolAndCharity}
        setStage={setStage}
        setSchoolOrCharityProperties={setSchoolOrCharityProperties}
      />
    );
    const buttons = getAllByRole('button', { name: 'View request' });
    await userEvent.click(buttons[0]);

    expect(setStage).toHaveBeenCalledWith(StageState.APPROVE_SCHOOL);
    expect(setSchoolOrCharityProperties).toHaveBeenCalledWith({
      id: '75ccc782-c359-47cc-8a7e-43522ec9d4af',
      name: 'Test School',
      la: 'West Sussex',
      urn: '123456',
      user: {
        name: 'Test Test',
        title: 'Test',
        email: 'Test@gmail.com',
        phone: '07801234456',
      },
    });
  });

  it('should handle view requests button click for charity', async () => {
    const { getAllByRole } = render(
      <JoinRequests
        data={dataWithSchoolAndCharity}
        setStage={setStage}
        setSchoolOrCharityProperties={setSchoolOrCharityProperties}
      />
    );
    const buttons = getAllByRole('button', { name: 'View request' });
    await userEvent.click(buttons[1]);

    expect(setStage).toHaveBeenCalledWith(StageState.APPROVE_CHARITY);
    expect(setSchoolOrCharityProperties).toHaveBeenCalledWith({
      id: '31c7091b-558e-4087-8a54-2f176f76e894',
      name: 'Test',
      la: 'Hammersmith and Fulham',
      user: {
        name: 'Test Test',
        title: 'Test',
        email: 'Test@gmail.com',
        phone: '07803123755',
      },
      charity: {
        charityAddress:
          'Test\n' +
          '          \n' +
          '          Test\n' +
          '          Test\n' +
          '          Testttt\n' +
          '          ',
        aboutCharity: 'Test',
      },
    });
  });

  it('should handle request time column sort click', async () => {
    vi.spyOn(globals, 'sortByNumber');
    const { getAllByText } = render(
      <JoinRequests
        data={dataWithMultipleSchools}
        setStage={setStage}
        setSchoolOrCharityProperties={setSchoolOrCharityProperties}
      />
    );
    const columnHeader = getAllByText('Request time')[0];
    await userEvent.click(columnHeader);

    expect(globals.sortByNumber).toHaveBeenCalled();
  });

  it('should handle request time column sort click', async () => {
    vi.spyOn(globals, 'sortAlphabetically');
    const { getAllByText } = render(
      <JoinRequests
        data={dataWithMultipleSchools}
        setStage={setStage}
        setSchoolOrCharityProperties={setSchoolOrCharityProperties}
      />
    );
    const columnHeader = getAllByText('Local authority')[0];
    await userEvent.click(columnHeader);

    expect(globals.sortAlphabetically).toHaveBeenCalled();
  });
});
