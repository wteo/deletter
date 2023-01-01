import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

describe('Login Component', () => {

    test('Renders "Register now" as text', () => {
        render(<Login />, { wrapper: MemoryRouter });
        const loginText = screen.getByText('register now', {exact: false});
        expect(loginText).toBeVisible();
    });

    test('Renders "Invalid or Missing email" as text', async() => {
        render(<Login/>, { wrapper: MemoryRouter });
        const usernameInput = await screen.findByRole('textbox', { name: 'username' });
        userEvent.type(usernameInput, 'test');
        const passwordInput = await screen.findByRole('textbox', { name: 'password' });
        userEvent.type(passwordInput, 'ABC1234!');
        const loginButton = await screen.findByRole('button', { name: 'login' });
        userEvent.click(loginButton);
        const invalidUsernameText = await screen.findByText(/invalid or missing email/i);
        expect(invalidUsernameText).toBeVisible();
    });
    
    test('Renders "Invalid password" as text', async() => {
        render(<Login/>, { wrapper: MemoryRouter });
        const usernameInput = await screen.findByRole('textbox', { name: 'username' });
        userEvent.type(usernameInput, 'test@test.com');
        const passwordInput = await screen.findByRole('textbox', { name: 'password' });
        userEvent.type(passwordInput, 'ABC');
        const loginButton = await screen.findByRole('button', { name: 'login' });
        userEvent.click(loginButton);
        const invalidUsernameText = await screen.findByText(/invalid password/i);
        expect(invalidUsernameText).toBeInTheDocument();
    });
    
})