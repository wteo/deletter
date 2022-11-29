import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import { AuthProvider } from '../../../contexts/AuthContext';
import { DbProvider } from '../../../contexts/DbContext';
import Invoices from './Invoices';

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
    test('Renders "Document no" as text', async() => {
        render(<Invoices/>, { wrapper: MockProvider });
        const tableElement = await screen.findByRole('table');
        expect(tableElement).toBeVisible();
    });
})