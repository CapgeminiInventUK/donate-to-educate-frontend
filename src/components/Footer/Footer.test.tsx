import { render } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Footer from './Footer';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

// Mock the Button component
jest.mock('../Button/Button', () => ({
    __esModule: true,
    default: jest.fn().mockReturnValue(null),
}));

// Mock the LogoWhite component
jest.mock('@assets/logo/LogoWhite', () => ({
    __esModule: true,
    default: jest.fn().mockReturnValue(null),
}));

// Mock the WeHaveThePowerLogo image import
jest.mock('../../assets/logo/WeHaveThePowerLogo.webp', () => ({
    default: 'we-have-the-power-logo.webp',
}));

describe('Footer component', () => {
    it('renders the "Dev Preview" link in development mode', () => {
        // Set the environment to development
        process.env.NODE_ENV = 'development';

        // Provide a mock implementation for useNavigate

        (useNavigate as jest.Mock<() => void>).mockImplementation(() => jest.fn());

        // Render the Footer component within a MemoryRouter
        const { getByText } = render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );

        // Verify that the "Dev Preview" link is present
        expect(getByText('Dev Preview')).toBeInTheDocument();
    });

    it('does not render the "Dev Preview" link in non-development mode', () => {
        // Set the environment to production
        process.env.NODE_ENV = 'production';


        (useNavigate as jest.Mock<() => void>).mockImplementation(() => jest.fn());

        // Render the Footer component within a MemoryRouter
        const { queryByText } = render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );

        // Verify that the "Dev Preview" link is not present
        expect(queryByText('Dev Preview')).toBeNull();
    });
});