import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import SignatureForm from './SignatureForm';

describe('SignatureForm Component', () => {
    test('Renders "Form" as element', () => {
        render(<SignatureForm/>);
        const formEl = screen.getByRole('form');
        expect(formEl).toBeVisible();
    });
})