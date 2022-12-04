import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Register from './Register';


describe('Register Component', () => {

    test('Renders "Please enter your personal details" as text', () => {
        render(<Register />);
        const text = screen.getByText('Please enter your personal details', {exact: false});
        expect(text).toBeVisible();
    });

    test('Renders "please enter a valid email" as text', () => {
        render(<Register />);
        const emailInput = screen.getByRole('textbox', { name: 'email' });
        userEvent.type(emailInput, 'test.com');
        const submitButton = screen.getByRole('button', { name: 'submit' });
        userEvent.click(submitButton);
        const invalidUsernameText = screen.getByText(/please enter a valid email/i);
        expect(invalidUsernameText).toBeVisible();

    });

    test('Renders "password" conditions as text', () => {
        render(<Register />);
        const emailInput = screen.getByRole('textbox', { name: 'email' });
        userEvent.type(emailInput, 'test2@test.com');
        const passwordInput = screen.getByRole('textbox', { name: 'password' });
        userEvent.type(passwordInput, 'ABC1234');
        const passwordConfirmationInput = screen.getByRole('textbox', { name: 'passwordConfirmation' });
        userEvent.type(passwordConfirmationInput, 'ABC1234');
        const submitButton = screen.getByRole('button', { name: 'submit' });
        userEvent.click(submitButton);
        const invalidPasswordText = screen.getByText(/Password must be/i);
        expect(invalidPasswordText).toBeVisible();
        
    });

    test('Renders "password does not match" as text', () => {
        render(<Register />);
        const emailInput = screen.getByRole('textbox', { name: 'email' });
        userEvent.type(emailInput, 'test3@test.com');
        const passwordInput = screen.getByRole('textbox', { name: 'password' });
        userEvent.type(passwordInput, 'ABC1234!!!');
        const passwordConfirmationInput = screen.getByRole('textbox', { name: 'passwordConfirmation' });
        userEvent.type(passwordConfirmationInput, 'ABC1234!!');
        const submitButton = screen.getByRole('button', { name: 'submit' });
        userEvent.click(submitButton);
        const invalidPasswordText = screen.getByText(/password does not match/i);
        expect(invalidPasswordText).toBeVisible();
    });

});