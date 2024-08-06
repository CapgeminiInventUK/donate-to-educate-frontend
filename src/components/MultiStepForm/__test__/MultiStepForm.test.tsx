import { createWrapper } from '@/mocks/mockGraphqlClient';
import signUpSchoolHappyPath from '@/templates/forms/signUpSchoolHappyPath';
import * as router from 'react-router';
import FormContainer from '../MultiStepForm';
import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { completedSchoolSignUpData } from './mockData';
import { FormDataItem } from '@/types/data';
import getAuthorityNotRegisteredPath from '@/templates/forms/authorityNotRegistered';

const navigate = vi.fn();

beforeEach(() => {
  vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
});

describe('Multi step form', () => {
  const template = signUpSchoolHappyPath([], () => {
    true;
  });
  it('should render spinner if loading', () => {
    const Component = createWrapper(
      <FormContainer
        formTemplate={template}
        formData={[]}
        isLoading={true}
        pageNumber={0}
        setPageNumber={vi.fn()}
        onChange={vi.fn()}
        refetch={vi.fn()}
      />
    );
    const { queryByRole } = render(<Component />);

    const spinner = queryByRole('img');

    expect(spinner).toBeInTheDocument();
  });

  it('should display return to homepage button if on last page', () => {
    const Component = createWrapper(
      <FormContainer
        formTemplate={template}
        formData={[]}
        isLoading={false}
        pageNumber={5}
        setPageNumber={vi.fn()}
        onChange={vi.fn()}
        refetch={vi.fn()}
      />
    );
    const { queryByRole } = render(<Component />);

    const homeButton = queryByRole('button', { name: 'home' });

    expect(homeButton).toBeInTheDocument();
  });

  it('should render declaration page and handle checkbox check', async () => {
    const setFormSubmitted = vi.fn();
    const refetch = vi.fn().mockImplementation(async () => await new Promise(setImmediate));
    const Component = createWrapper(
      <FormContainer
        formTemplate={template}
        formData={completedSchoolSignUpData as FormDataItem[]}
        isLoading={false}
        pageNumber={4}
        setPageNumber={vi.fn()}
        onChange={vi.fn()}
        refetch={refetch}
        setFormSubmitted={setFormSubmitted}
      />
    );

    const { getByRole, getByLabelText } = render(<Component />);

    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();

    const form = getByLabelText('form');

    await waitFor(() => {
      fireEvent.submit(form);
    });

    expect(refetch).toHaveBeenCalled();

    expect(setFormSubmitted).toHaveBeenCalled();
  });

  it('should handle check your answers change button click and then navigate back to cya after confirm', () => {
    let pageNumber = 3;

    const setPageNumber = vi.fn().mockImplementation((newNumber: number): void => {
      pageNumber = newNumber;
    });

    const Component = createWrapper(
      <FormContainer
        formTemplate={template}
        formData={completedSchoolSignUpData as FormDataItem[]}
        isLoading={false}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        onChange={vi.fn()}
        refetch={vi.fn()}
      />
    );

    const { getAllByRole } = render(<Component />);

    const changeButton = getAllByRole('button', { name: 'change' })[0];
    fireEvent.click(changeButton);
    expect(pageNumber).toBe(2);
  });

  it('should call onLocalAuthorityRegisterRequest when requesting local authority to join', async () => {
    const onLocalAuthorityRegisterRequest = vi.fn();
    const template = getAuthorityNotRegisteredPath(true, [], onLocalAuthorityRegisterRequest);

    const Component = createWrapper(
      <FormContainer
        formTemplate={template}
        formData={completedSchoolSignUpData as FormDataItem[]}
        isLoading={false}
        pageNumber={3}
        setPageNumber={vi.fn()}
        onChange={vi.fn()}
        refetch={vi.fn()}
      />
    );

    const { getAllByRole, getByLabelText } = render(<Component />);

    const textboxes = getAllByRole('textbox');

    await userEvent.click(textboxes[0]);
    await userEvent.keyboard('Name');
    await userEvent.click(textboxes[1]);
    await userEvent.keyboard('name@email.com');
    await userEvent.click(textboxes[2]);
    await userEvent.keyboard('Message');

    const form = getByLabelText('form');

    await waitFor(() => {
      fireEvent.submit(form);
    });

    expect(onLocalAuthorityRegisterRequest).toHaveBeenCalled();
  });

  it('should handle back button click', () => {
    let pageNumber = 3;

    const setPageNumber = vi.fn().mockImplementation((newNumber: number): void => {
      pageNumber = newNumber;
    });

    const Component = createWrapper(
      <FormContainer
        formTemplate={template}
        formData={completedSchoolSignUpData as FormDataItem[]}
        isLoading={false}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        onChange={vi.fn()}
        refetch={vi.fn()}
      />
    );

    const { getByRole } = render(<Component />);

    const backButton = getByRole('button', { name: 'Back' });
    fireEvent.click(backButton);
    expect(pageNumber).toBe(2);
  });

  it('should handle back button click from declaration page', async () => {
    let pageNumber = 4;

    const setPageNumber = vi.fn().mockImplementation((newNumber: number): void => {
      pageNumber = newNumber;
    });

    const Component = createWrapper(
      <FormContainer
        formTemplate={template}
        formData={completedSchoolSignUpData as FormDataItem[]}
        isLoading={false}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        onChange={vi.fn()}
        refetch={vi.fn()}
      />
    );

    const { getByRole } = render(<Component />);

    const backButton = getByRole('button', { name: 'Back' });

    await waitFor(() => {
      fireEvent.click(backButton);
    });
    expect(pageNumber).toBe(3);
  });

  it('should handle back button click and set happy path when on unhappy path', () => {
    const onLocalAuthorityRegisterRequest = vi.fn();
    const setHappyPathTemplate = vi.fn();
    const template = getAuthorityNotRegisteredPath(true, [], onLocalAuthorityRegisterRequest);

    let pageNumber = 3;

    const setPageNumber = vi.fn().mockImplementation((newNumber: number): void => {
      pageNumber = newNumber;
    });

    const Component = createWrapper(
      <FormContainer
        formTemplate={template}
        setHappyPathTemplate={setHappyPathTemplate}
        formData={[]}
        isLoading={false}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        onChange={vi.fn()}
        refetch={vi.fn()}
      />
    );

    const { getByRole } = render(<Component />);

    const backButton = getByRole('button', { name: 'Back' });
    fireEvent.click(backButton);
    expect(pageNumber).toBe(2);
    expect(setHappyPathTemplate).toHaveBeenCalled();
  });

  it('should call useNavigate when back button click on page 0', () => {
    const Component = createWrapper(
      <FormContainer
        formTemplate={template}
        formData={completedSchoolSignUpData as FormDataItem[]}
        isLoading={false}
        pageNumber={0}
        setPageNumber={vi.fn()}
        onChange={vi.fn()}
        refetch={vi.fn()}
      />
    );

    const { getByRole } = render(<Component />);

    const backButton = getByRole('button', { name: 'Back' });
    fireEvent.click(backButton);
    expect(navigate).toHaveBeenCalledWith(-1);
  });

  it('should show SchoolAlreadyRegistered component if on page one and school already has active join request', () => {
    const Component = createWrapper(
      <FormContainer
        formTemplate={template}
        formData={[]}
        isLoading={false}
        pageNumber={1}
        setPageNumber={vi.fn()}
        onChange={vi.fn()}
        refetch={vi.fn()}
        hasActiveJoinRequest={true}
      />
    );
    const { getByRole } = render(<Component />);

    const alreadyRegisteredHeader = getByRole('heading', { level: 2 });

    expect(alreadyRegisteredHeader).toHaveTextContent(
      'Someone at your school has already applied to join Donate to Educate'
    );
  });
});
