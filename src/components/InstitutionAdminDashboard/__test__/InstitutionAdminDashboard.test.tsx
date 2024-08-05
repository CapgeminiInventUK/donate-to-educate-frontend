import { createWrapper } from '@/mocks/mockGraphqlClient';
import InstitutionAdminDashboard from '../InstitutionAdminDashboard';
import { render } from '@testing-library/react';
import * as router from 'react-router';
import userEvent from '@testing-library/user-event';
import { charityProfile, schoolProfile } from './mockData';

const navigate = vi.fn();

beforeEach(() => {
  vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Institution admin dashboard - school', () => {
  it('should render profile with details', () => {
    const Component = createWrapper(
      <InstitutionAdminDashboard type={'school'} profile={schoolProfile} name={'Test School'} />
    );
    const { getByRole } = render(<Component />);
    const h1 = getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent('Test School');
  });

  it('should handle back button click when not in preview mode', async () => {
    const Component = createWrapper(
      <InstitutionAdminDashboard type={'school'} profile={schoolProfile} name={'Test School'} />
    );
    const { getByRole } = render(<Component />);
    const backButton = getByRole('button', { name: 'Back' });
    await userEvent.click(backButton);

    expect(navigate).toHaveBeenCalledWith(-1);
  });

  it('should handle back button click when not in preview mode', async () => {
    const Component = createWrapper(
      <InstitutionAdminDashboard type={'school'} profile={schoolProfile} name={'Test School'} />
    );
    const { getByRole, getByText } = render(<Component />);

    const previewLink = getByText('Preview public profile');
    await userEvent.click(previewLink);

    const editButton = getByRole('button', { name: 'edit profile' });
    expect(editButton).toBeInTheDocument();

    const backButton = getByRole('button', { name: 'Back' });
    await userEvent.click(backButton);

    expect(navigate).not.toHaveBeenCalled();
    expect(editButton).not.toBeInTheDocument();
  });

  it('should show default about text', () => {
    const Component = createWrapper(
      <InstitutionAdminDashboard type={'school'} profile={schoolProfile} name={'Test School'} />
    );
    const { getByLabelText } = render(<Component />);

    const aboutSection = getByLabelText('about-text');
    expect(aboutSection.textContent).toContain(
      'Request the things you need or donate products to help the next child. Charities can also take our extra stock to share with the communities that need it most'
    );
  });

  it('should show default about text', () => {
    const editedAboutProfile = { ...schoolProfile, about: 'new about text' };
    const Component = createWrapper(
      <InstitutionAdminDashboard
        type={'school'}
        profile={editedAboutProfile}
        name={'Test School'}
      />
    );
    const { getByLabelText } = render(<Component />);

    const aboutSection = getByLabelText('about-text');
    expect(aboutSection.textContent).toBe('new about text');
  });

  it('should update about text', async () => {
    const editedAboutProfile = { ...schoolProfile, about: 'about text' };
    const Component = createWrapper(
      <InstitutionAdminDashboard
        type={'school'}
        name={'Test School'}
        profile={editedAboutProfile}
      />
    );
    const { getByRole, getAllByRole, getByLabelText } = render(<Component />);
    const editButton = getAllByRole('button', { name: 'edit' });

    await userEvent.click(editButton[1]);

    const textArea = getByRole('textbox');

    await userEvent.click(textArea);
    await userEvent.clear(textArea);
    await userEvent.keyboard('New about text');

    const saveButton = getByRole('button', { name: 'save' });

    await userEvent.click(saveButton).then(() => {
      const newAboutText = getByLabelText('about-text');

      expect(newAboutText.textContent).toBe('New about text');
    });
  });

  it('should default about text to placeholder text when nothing present', async () => {
    const editedAboutProfile = { ...schoolProfile, about: 'about text' };
    const Component = createWrapper(
      <InstitutionAdminDashboard
        type={'school'}
        name={'Test School'}
        profile={editedAboutProfile}
      />
    );
    const { getByRole, getAllByRole, getByLabelText } = render(<Component />);
    const editButton = getAllByRole('button', { name: 'edit' });

    await userEvent.click(editButton[1]);

    const textArea = getByRole('textbox');

    await userEvent.click(textArea);
    await userEvent.clear(textArea);

    const saveButton = getByRole('button', { name: 'save' });

    await userEvent.click(saveButton).then(() => {
      const newAboutText = getByLabelText('about-text');

      expect(newAboutText.textContent).toContain(
        'Request the things you need or donate products to help the next child. Charities can also take our extra stock to share with the communities that need it most'
      );
    });
  });
  it('should revert to old text when editing about text cancelled', async () => {
    const editedAboutProfile = { ...schoolProfile, about: 'about text' };
    const Component = createWrapper(
      <InstitutionAdminDashboard
        type={'school'}
        name={'Test School'}
        profile={editedAboutProfile}
      />
    );
    const { getByRole, getAllByRole, getByLabelText } = render(<Component />);
    const editButton = getAllByRole('button', { name: 'edit' });

    await userEvent.click(editButton[1]);

    const textArea = getByRole('textbox');

    await userEvent.click(textArea);
    await userEvent.clear(textArea);

    const cancelButton = getByRole('button', { name: 'cancel' });

    await userEvent.click(cancelButton).then(() => {
      const newAboutText = getByLabelText('about-text');

      expect(newAboutText.textContent).toContain('about text');
    });
  });
});

describe('Institution admin dashboard - school', () => {
  it('should show default about text', () => {
    const Component = createWrapper(
      <InstitutionAdminDashboard type={'charity'} profile={charityProfile} name={'Test Charity'} />
    );
    const { getByLabelText } = render(<Component />);

    const aboutSection = getByLabelText('about-text');
    expect(aboutSection.textContent).toContain(
      'Request the things you need  to help the next child. You can also take our extra stock to share with the communities that need it most.'
    );
  });

  it('should revert to placeholder text when editing about text cancelled and no previous about text', async () => {
    const Component = createWrapper(
      <InstitutionAdminDashboard type={'charity'} name={'Test Charity'} profile={charityProfile} />
    );
    const { getByRole, getAllByRole, getByLabelText } = render(<Component />);
    const editButton = getAllByRole('button', { name: 'edit' });

    await userEvent.click(editButton[1]);

    const textArea = getByRole('textbox');

    await userEvent.click(textArea);
    await userEvent.clear(textArea);

    const cancelButton = getByRole('button', { name: 'cancel' });

    await userEvent.click(cancelButton).then(() => {
      const newAboutText = getByLabelText('about-text');

      expect(newAboutText.textContent).toContain(
        'Test Charity has pre-loved school products to help children thrive at school.'
      );
    });
  });

  it('should display error banner when API call error', async () => {
    const editedAboutProfile = { ...charityProfile, about: 'about text' };
    const Component = createWrapper(
      <InstitutionAdminDashboard
        type={'charity'}
        name={'Test Charity'}
        profile={editedAboutProfile}
      />
    );
    const { getByRole, getAllByRole, findByRole } = render(<Component />);
    const editButton = getAllByRole('button', { name: 'edit' });

    await userEvent.click(editButton[1]);

    const textArea = getByRole('textbox');

    await userEvent.click(textArea);
    await userEvent.clear(textArea);
    await userEvent.keyboard('error');

    const saveButton = getByRole('button', { name: 'save' });

    await userEvent.click(saveButton).then(async () => {
      const newAboutText = await findByRole('heading', { level: 3 });

      expect(newAboutText.textContent).toBe('Something went wrong');
    });
  });
});
