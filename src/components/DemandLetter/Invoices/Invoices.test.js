import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
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

describe('Invoices Component', () => {
    
    test('Renders "Form" as element', async() => {
        render(<InvoiceForm/>, { wrapper: MockProvider });
        const formElement = await screen.findByRole('form', { name: 'invoice' });
        expect(formElement).toBeVisible();
    });

    test('Renders "Table" as element', async() => {
        render(<Invoices/>, { wrapper: MockProvider });
        const tableElement = await screen.findByRole('table');
        expect(tableElement).toBeVisible();
    });
})