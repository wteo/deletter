import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import { AuthProvider } from '../../contexts/AuthContext';
import Dashboard from './Dashboard';

const MockProvider = (props) => {
    return (
        <AuthProvider>
            {props.children}
        </AuthProvider>
    );
}

describe('Dashboard Component', () => {
    test('Renders "Welcome" as text', async() => {
        render(<Dashboard/>, { wrapper: MockProvider });
        const welcomeText = await screen.findByText(/Welcome/i);
        expect(welcomeText).toBeVisible();
    });
})