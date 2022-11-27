import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import { AuthProvider } from '../../contexts/AuthContext';
import { MemoryRouter } from 'react-router-dom';
import Navigation from './Navigation';

const MockProvider = (props) => {
    return (
        <AuthProvider>
            <MemoryRouter>
                {props.children}
            </MemoryRouter>
        </AuthProvider>
    );
}

describe('Navigation Component', () => {

    test('Renders "Please enter your personal details" as text', async() => {
        render(<Navigation/>, { wrapper: MockProvider });
        const navigationElement = await screen.findByRole('navigation');
        expect(navigationElement).toBeVisible();
    });
})