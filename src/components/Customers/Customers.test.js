import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import { DbProvider } from '../../contexts/DbContext';
import Customers from './Customers';

const MockProvider = (props) => {
    return (
        <DbProvider>
            {props.children}
        </DbProvider>
    );
}


describe('Customers Component', () => {
    test('Renders "Billed to" as text', () => {
        // render(<Customers/>, { wrapper: MockProvider });
        // const billedToText = screen.getByText(/billed to/i);
        // expect(billedToText).toBeVisible();        
    });
})