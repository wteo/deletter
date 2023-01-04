import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { AuthProvider } from '../../../contexts/AuthContext';
import { DbProvider } from '../../../contexts/DbContext';
import Invoices from './Invoices';
import InvoiceForm from './Form/InvoiceForm';

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
    const clickButton = async() => {
        const submitButton = await screen.findByRole('button');
        userEvent.click(submitButton);
    }

    test('Renders "Error Message" where user submits a blank Document No', async() => {
        render(<InvoiceForm/>, { wrapper: MockProvider });
        clickButton();
        const docNoError = await screen.findByText(/Please enter a document no/i);
        expect(docNoError).toBeVisible();
    });

    test('Renders "Error Message" where user submits invalid date format', async() => {
        render(<InvoiceForm/>, { wrapper: MockProvider });
        const docNoInput = await screen.findByRole('textbox', { name: 'docNo' });
        userEvent.type(docNoInput, 'INV001');
        const dateInput = await screen.findByRole('textbox', { name: 'date' });
        userEvent.type(dateInput, '30/04/2000');
        clickButton();
        const dateError = await screen.findByText(/Invalid date format/i);
        expect(dateError).toBeVisible();
    });

    test('Renders "Error Message" where date format is correct but has invalid date', async() => {
        render(<InvoiceForm/>, { wrapper: MockProvider });
        const docNoInput = await screen.findByRole('textbox', { name: 'docNo' });
        userEvent.type(docNoInput, 'INV001');
        const dateInput = await screen.findByRole('textbox', { name: 'date' });
        userEvent.type(dateInput, '31-04-20');
        clickButton();
        const dateError = await screen.findByText(/Invalid date/i);
        expect(dateError).toBeVisible();
    });

    test('Renders "Error Message" where cost for tax invoice is in negative', async() => {
        render(<InvoiceForm/>, { wrapper: MockProvider });
        const docNoInput = await screen.findByRole('textbox', { name: 'docNo' });
        userEvent.type(docNoInput, 'INV001');
        const dateInput = await screen.findByRole('textbox', { name: 'date' });
        userEvent.type(dateInput, '30-04-20');
        const costInput = await screen.findByRole('textbox', { name: 'cost' });
        userEvent.type(costInput, '-1000');
        clickButton();
        const costError = await screen.findByText(/Cost must be in positive balance/i);
        expect(costError).toBeVisible();
    });
    
    test('Renders "Error Message" where customer name is not selected', async() => {
        render(<InvoiceForm/>, { wrapper: MockProvider });
        const docNoInput = await screen.findByRole('textbox', { name: 'docNo' });
        userEvent.type(docNoInput, 'INV001');
        const dateInput = await screen.findByRole('textbox', { name: 'date' });
        userEvent.type(dateInput, '30-04-20');
        const costInput = await screen.findByRole('textbox', { name: 'cost' });
        userEvent.type(costInput, '1000');
        clickButton();
        const customerNameError = await screen.findByText(/Please select an existing customer/i);
        expect(customerNameError).toBeVisible();
    });
});

describe('Invoices Component: Table', () => {
    
    test('Renders "Table" as element', async() => {
        render(<Invoices/>, { wrapper: MockProvider });
        const tableElement = await screen.findByRole('table');
        expect(tableElement).toBeVisible();
    });

});
    
