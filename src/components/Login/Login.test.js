import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

describe('Login Component', () => {

    const userInput = async(selector, value) => userEvent.type(await screen.findByRole('textbox', { name: selector }), value);
    const submit = async() => userEvent.click(await screen.findByRole('button', { name: 'login' }));

    test('Renders "Register now" as text', () => {
        render(<Login />, { wrapper: MemoryRouter });
        expect(screen.getByText(/register now/i)).toBeVisible();
    });

    test('Renders "Invalid or Missing email" as text', async() => {
        render(<Login/>, { wrapper: MemoryRouter });
        userInput('username', 'test');
        userInput('password', 'ABC1234!');
        submit();
        expect(await screen.findByText(/invalid or missing email/i)).toBeVisible();
    });
    
    test('Renders "Invalid password" as text', async() => {
        render(<Login/>, { wrapper: MemoryRouter });
        userInput('username', 'test@test.com');
        userInput('password', 'ABC1234');
        submit();
        expect(await screen.findByText(/invalid password/i)).toBeVisible();
    });
    
})