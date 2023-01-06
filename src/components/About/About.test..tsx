import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import About from './About';

describe('About Component', () => {
    test('Renders "About" page', () => {
        render(<About/>);
        const welcomeText = screen.getByText(/welcome to DeLetter/i);
        expect(welcomeText).toBeVisible();
    });
})