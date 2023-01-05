import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import LetterTemplate from './LetterTemplate';

describe('LetterTemplate Component', () => {

    test('Renders "Billing Address" ', () => {
        render(<LetterTemplate/>);
        const billingAddressTestId = screen.getByTestId('billingAddress');
        expect(billingAddressTestId).toBeInTheDocument();
    })
    
    test('Renders "Title" as text', () => {
        render(<LetterTemplate/>);
        const titleText = screen.getByText(/Re: Demand for Payment of Overdue Invoices/i);
        expect(titleText).toBeVisible();
    });

    test('Renders "Invoice Table" ', () => {
        render(<LetterTemplate/>);
        const table = screen.getByRole('table');
        expect(table).toBeVisible();
    });

    test('Renders "Main Content" as text', () => {
        render(<LetterTemplate/>);
        const mainContentText = screen.getByText(/total amount due/i);
        expect(mainContentText).toBeVisible();
    });

    test('Renders "Signature" as text', () => {
        render(<LetterTemplate/>);
        const sincerelyText = screen.getByText(/Sincerely/i);
        expect(sincerelyText).toBeVisible();
    });
})