import '@testing-library/jest-dom'
import { fireEvent, render, screen } from "@testing-library/react";
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
        fireEvent.change(usernameInput, { target: { value: 'test' } });
        const passwordInput = await screen.findByRole('textbox', { name: 'password' });
        fireEvent.change(passwordInput, { target: { value: 'ABC1234!' } });
        const loginButton = await screen.findByRole('button', { name: 'login' });
        fireEvent.submit(loginButton);
        const invalidUsernameText = await screen.findByText(/invalid or missing email/i);
        expect(invalidUsernameText).toBeVisible();
    });

    test('Renders "too many failed attempts" as text', async() => {
        render(<Login/>, { wrapper: MemoryRouter });
        const usernameInput = await screen.findByRole('textbox', { name: 'username' });
        fireEvent.change(usernameInput, { target: { value: 'test@test.com' } });
        const passwordInput = await screen.findByRole('textbox', { name: 'password' });
        fireEvent.change(passwordInput, { target: { value: 'ABC' } });
        const loginButton = await screen.findByRole('button', { name: 'login' });
        fireEvent.submit(loginButton);
        const invalidUsernameText = await screen.findByText(/too many failed attempts/i);
        expect(invalidUsernameText).toBeInTheDocument();
    });
})