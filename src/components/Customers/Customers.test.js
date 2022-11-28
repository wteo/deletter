import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import { AuthProvider } from '../../contexts/AuthContext';
import { DbProvider } from '../../contexts/DbContext';
import Customers from './Customers';

const MockProvider = (props) => {
    return (
        <AuthProvider>
            <DbProvider>
                {props.children}
            </DbProvider>
        </AuthProvider>
    );
}


describe('Customers Component', () => {
    
    test('Renders "Billed to" as text', async() => {
        render(<Customers/>, { wrapper: MockProvider });
        const billedToText = await screen.findByText(/billed to/i);
        expect(billedToText).toBeVisible();
    });

})