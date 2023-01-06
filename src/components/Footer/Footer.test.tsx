import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import Footer from './Footer';

describe('Footer Component', () => {
    test('Renders "Design by Wendy Teo" as text', () => {
        render(<Footer/>);
        const designByText = screen.getByText(/Design by Wendy Teo/i);
        expect(designByText).toBeVisible();
    });
})