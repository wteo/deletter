import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import ForgotPassword from './ForgotPassword';

describe('ForgotPassword Component', () => {
    
    test('Renders "What\'s your email address" as text', () => {
        render(<ForgotPassword/>);
        const billedToText = screen.getByText(/what's your email address/i);
        expect(billedToText).toBeVisible();        
    });

    test('Renders "What\'s your email address" as text', async() => {
        render(<ForgotPassword/>);
        const emailInputElement = await screen.findByRole('textbox', { name: 'email'});
        userEvent.type(emailInputElement, 'test');
        const resetButtonElement = await screen.findByRole('button', { name: 'reset' });
        userEvent.click(resetButtonElement);
        const invalidEmailText = await screen.findByText(/username not found/i);
        expect(invalidEmailText).toBeVisible();        
    });

})