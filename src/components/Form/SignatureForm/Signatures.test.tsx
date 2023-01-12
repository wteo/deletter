import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import { AuthProvider } from '../../../contexts/AuthContext';
import { DbProvider } from '../../../contexts/DbContext';
import Signatures from './Signatures';

const MockProvider = (props) => {
    return (
        <AuthProvider>
            <DbProvider>
                {props.children}
            </DbProvider>
        </AuthProvider>
    );
}


describe('Signatures Component', () => {
    test('Renders "Table" as element', async() => {
        render(<Signatures/>, { wrapper: MockProvider });
        const tableElement = await screen.findByRole('table');
        expect(tableElement).toBeVisible();
    }); 
})