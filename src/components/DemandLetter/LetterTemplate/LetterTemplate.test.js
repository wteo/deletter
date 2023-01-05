import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import LetterTemplate from './LetterTemplate';

describe('LetterTemplate Component', () => {
    test('Renders "Letter Template" as a whole', () => {
        render(<LetterTemplate/>);
        const text = screen.getByText(/Re: Demand for Payment of Overdue Invoices/i);
        expect(text).toBeVisible();
    });
})