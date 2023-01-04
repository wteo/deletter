import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Register from './Register';


describe('Register Component', () => {

    const userInput = (selector, value) => userEvent.type(screen.getByRole('textbox', { name: selector }), value);
    const submit = () => userEvent.click(screen.getByRole('button', { name: 'submit' }));
    const isErrMessageVisible = (message) => expect(screen.getByText(message)).toBeVisible();

    test('Renders "Please enter your personal details" as text', () => {
        render(<Register />);
        isErrMessageVisible(/Please enter your personal details/i);
    });

    test('Renders "please enter a valid email" as text', () => {
        render(<Register />);
        userInput('email', 'test.com');
        submit();
        isErrMessageVisible(/please enter a valid email/i);
    });

    test('Renders "password" conditions as text', () => {
        render(<Register />);
        userInput('email', 'test2@test.com');
        userInput('password', 'ABC1234')
        userInput('passwordConfirmation', 'ABC1234');
        submit();
        isErrMessageVisible(/Password must be/i);
    });

    test('Renders "password does not match" as text', () => {
        render(<Register />);
        userInput('email', 'test3@test.com');
        userInput('password', 'ABC1234!!!!')
        userInput('passwordConfirmation', 'ABC1234!!!');
        submit();
        isErrMessageVisible(/password does not match/i);
    });

});