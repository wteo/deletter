import React from 'react';
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
    
    test('Renders "Table" as element', async() => {
        render(<Customers/>, { wrapper: MockProvider });
        const tableElement = await screen.findByRole('table');
        expect(tableElement).toBeVisible();
    });

    

})