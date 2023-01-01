import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import { AuthProvider } from '../../../../contexts/AuthContext';
import { DbProvider } from '../../../../contexts/DbContext';
import BillingAddress from './BilllingAddress';

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
        render(<BillingAddress/>, { wrapper: MockProvider });
        const formElement = await screen.findByRole('form', { name: 'billingAddress' });
        expect(formElement).toBeVisible();
    });
})