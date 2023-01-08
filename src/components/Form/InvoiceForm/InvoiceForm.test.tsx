import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { AuthProvider } from '../../../contexts/AuthContext';
import { DbProvider } from '../../../contexts/DbContext';
import InvoiceForm from './InvoiceForm';


const MockProvider = (props) => {
    return (
        <AuthProvider>
            <DbProvider>
                {props.children}
            </DbProvider>
        </AuthProvider>
    );
}

describe('Invoices Component: Form', () => {
    
    test('Renders "Form" as element', async() => {
        render(<InvoiceForm/>, { wrapper: MockProvider });
        const formElement = await screen.findByRole('form', { name: 'invoice' });
        expect(formElement).toBeVisible();
    });

    // Errors as per wrong user input
    const userInput = async(selector, value) => userEvent.type(await screen.findByRole('textbox', { name: selector }), value);
    const submit = async() => userEvent.click(await screen.findByRole('button'));

    test('Renders "Error Message" where user submits a blank Document No', async() => {
        render(<InvoiceForm/>, { wrapper: MockProvider });
        submit();
        expect(await screen.findByText(/Please enter a document no/i)).toBeVisible();
    });

    test('Renders "Error Message" where user submits invalid date format', async() => {
        render(<InvoiceForm/>, { wrapper: MockProvider });
        userInput('docNo', 'INV001');
        userInput('date', '30-04-20');
        submit();
        expect(await screen.findByText(/Invalid format/i)).toBeVisible();
    });

    test('Renders "Error Message" where date format is correct but has invalid date', async() => {
        render(<InvoiceForm/>, { wrapper: MockProvider });
        userInput('docNo', 'INV001');
        userInput('date', '31-04-2020');
        submit();
        expect(await screen.findByText(/Invalid date/i)).toBeVisible();
    });

    test('Renders "Error Message" where cost for tax invoice is in negative', async() => {
        render(<InvoiceForm/>, { wrapper: MockProvider });
        userInput('docNo', 'INV001');
        userInput('date', '30-04-2020');
        userInput('cost', '-1000');
        submit();
        expect(await screen.findByText(/Cost must be in positive balance/i)).toBeVisible();
    });

    test('Renders "Error Message" where credit note or overpayment is in positive', async() => {
        render(<InvoiceForm/>, { wrapper: MockProvider });
        userInput('docNo', 'INV001');
        userInput('date', '30-04-2020');
        const selectElement = await screen.findByTestId('docType');
        userEvent.selectOptions(selectElement, 'Overpayment');
        userInput('cost', '1000');
        submit();
        expect(await screen.findByText(/Cost must be in negative balance/i)).toBeVisible();
    });
    
});
