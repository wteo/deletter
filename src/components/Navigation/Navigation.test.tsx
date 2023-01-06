import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import { AuthProvider } from '../../contexts/AuthContext';
import { MemoryRouter } from 'react-router-dom';
import Navigation from './Navigation';

const MockProvider = (props) => {
    return (
        <AuthProvider>
            <MemoryRouter>
                {props.children}
            </MemoryRouter>
        </AuthProvider>
    );
}

describe('Navigation Component', () => {
    test('Renders "Navigation" as visible element', async() => {
        render(<Navigation/>, { wrapper: MockProvider });
        const navigationElement = await screen.findByRole('navigation');
        expect(navigationElement).toBeVisible();
    });
})