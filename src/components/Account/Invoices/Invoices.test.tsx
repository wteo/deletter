import React from 'react';
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

     /*
    test('Adding new option to Customer Name selection', () => {
        render(<Invoices/>, { wrapper: MockProvider });
        userInput('docNo', 'INV001');
        userInput('date', '30-04-20');
        userInput('cost', '1000');
        
        // Addding new option to Customer Name Selection
        const selectEl = screen.getByTestId('customer');
        const newOption = document.createElement('option');
        newOption.value = 'ABC Inc';
        newOption.textContent = 'ABC Inc';
        selectEl.append(newOption);
        userEvent.selectOptions(selectEl, 'ABC Inc');
        expect(selectEl.value).toBe('ABC Inc');

        submit();

        waitFor(async() => expect(await screen.findByText(/INV001/i).toBeVisible()));
        waitFor(async() => expect(await screen.findByText(/INV001/i).not.toBeVisible())); // Something is wrong here...

    });
    */
    
    test('Renders "Table" as element', async() => {
        render(<Invoices/>, { wrapper: MockProvider });
        expect(await screen.findByRole('table')).toBeVisible();
    });
});
    