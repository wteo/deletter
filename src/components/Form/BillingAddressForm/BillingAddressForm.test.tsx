import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { AuthProvider } from '../../../contexts/AuthContext';
import { DbProvider } from '../../../contexts/DbContext';

import BillingAddressForm from './BillingAddressForm';

const MockProvider = (props) => {
    return (
        <AuthProvider>
            <DbProvider>
                {props.children}
            </DbProvider>
        </AuthProvider>
    );
}

describe('Billing Address Component', () => {

    test('Renders "Form" as element', async() => {
        render(<BillingAddressForm/>, { wrapper: MockProvider });
        const formElement = await screen.findByRole('form', { name: 'billingAddress' });
        expect(formElement).toBeVisible();
    });

    test('Renders "Error message" when submit a blank form', async() => {
        render(<BillingAddressForm />, { wrapper: MockProvider });
        const buttonEl = await screen.findByRole('button');
        userEvent.click(buttonEl);
        const missingErrMessage = await screen.findByText(/missing details/i);
        expect(missingErrMessage).toBeVisible();  
    });

    test('Renders "Error message" listing all errors', async() => {
        render(<BillingAddressForm />, { wrapper: MockProvider });
        const buttonEl = await screen.findByRole('button');
        userEvent.click(buttonEl);
        const errMessages = await screen.findAllByTestId('errMessage');
        expect(errMessages).toHaveLength(5);  
    });
})