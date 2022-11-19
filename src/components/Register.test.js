import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import Register from './Register';


describe('Register Component', () => {

    test('Renders "Please enter your personal details" as a text', () => {
        render(<Register />);
        const text = screen.getByText('Please enter your personal details', {exact: false});
        expect(text).toBeInTheDocument();
    });

    
});