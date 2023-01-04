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
        userInput('date', '30-04-2000');
        submit();
        expect(await screen.findByText(/Invalid date format/i)).toBeVisible();
    });

    test('Renders "Error Message" where date format is correct but has invalid date', async() => {
        render(<InvoiceForm/>, { wrapper: MockProvider });
        userInput('docNo', 'INV001');
        userInput('date', '31-04-20');
        submit();
        expect(await screen.findByText(/Invalid date/i)).toBeVisible();
    });

    test('Renders "Error Message" where cost for tax invoice is in negative', async() => {
        render(<InvoiceForm/>, { wrapper: MockProvider });
        userInput('docNo', 'INV001');
        userInput('date', '30-04-20');
        userInput('cost', '-1000');
        submit();
        expect(await screen.findByText(/Cost must be in positive balance/i)).toBeVisible();
    });
    
    test('Renders "Error Message" where customer name is not selected', async() => {
        render(<InvoiceForm/>, { wrapper: MockProvider });
        userInput('docNo', 'INV001');
        userInput('date', '30-04-20');
        userInput('cost', '1000');
        submit();
        expect(await screen.findByText(/Please select an existing customer/i)).toBeVisible();
    });
});

describe('Invoices Component: Table', () => {
    
    test('Renders "Table" as element', async() => {
        render(<Invoices/>, { wrapper: MockProvider });
        expect(await screen.findByRole('table')).toBeVisible();
    });

});
    