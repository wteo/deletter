import '@testing-library/jest-dom'
import { fireEvent, render, screen } from "@testing-library/react";
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
        fireEvent.change(emailInputElement, { target: { value: 'test'} });
        const resetButtonElement = await screen.findByRole('button', { name: 'reset' });
        fireEvent.submit(resetButtonElement);
        const invalidEmailText = await screen.findByText(/username not found/i);
        expect(invalidEmailText).toBeVisible();        
    });

})