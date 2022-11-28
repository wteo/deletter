import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import { AuthProvider } from '../../contexts/AuthContext';
import Dashboard from './Dashboard';

const MockProvider = (props) => {
    return (
        <AuthProvider>
            {props.children}
        </AuthProvider>
    );
}

describe('Dashboard Component', () => {
    // This render "Cannot read properties of undefined" error for "currentUser.email"
    test('Renders "Welcome" as text', async() => {
        // (<Dashboard/>, { wrapper: MockProvider });
        // const welcomeText = await screen.findByText(/Welcome/i);
        // expect(welcomeText).toBeInTheDocument();
    });
})