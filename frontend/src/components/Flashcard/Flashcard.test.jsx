import React from "react";
import { render } from "@testing-library/react";
import Flashcard from "./Flashcard";
import { describe, it, expect } from 'vitest'; 

describe('Flashcard', () => {
    const mockCard = {
        question: "hola mundo",
        answer: "hello world"
      };

    it('should render without fail', () => {
        const { container } = render(<Flashcard card={mockCard}/>);
        expect(container).toBeInTheDocument();  
    });
})
