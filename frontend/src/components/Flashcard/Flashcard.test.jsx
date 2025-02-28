import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Flashcard from "./Flashcard";
import { describe, it, expect } from 'vitest'; 

describe('Flashcard', () => {
    const mockCard = {
        question: "hola mundo",
        answer: "hello world"
      };

    it('should not render when no card prop given', () => {
        const { container } = render(<Flashcard />);
        expect(container.firstChild).toBeNull();
    });

    it('should render when given a card prop', () => {
      const { container } = render(<Flashcard card={mockCard} />);
      expect(container.querySelector('.flashcard-wrapper')).toBeInTheDocument(); 
      expect(container.querySelector('.flashcard')).toBeInTheDocument(); 
      expect(container.querySelector('.flashcard-inner')).toBeInTheDocument(); 
      expect(container.querySelector('.flashcard-front')).toBeInTheDocument(); 
      expect(container.querySelector('.flashcard-back')).toBeInTheDocument();  
      expect(screen.getByText(/hola mundo/i)).toBeInTheDocument();
      expect(screen.getByText(/hello world/i)).toBeInTheDocument();
  });

    it('should render with flipped class when clicked', () => {
      const { container } = render(<Flashcard card={mockCard}/>);
      const flashcard = container.querySelector('.flashcard');
      expect(flashcard).not.toHaveClass('flipped');
      fireEvent.click(flashcard);
      expect(flashcard).toHaveClass('flipped');
  }) 
});