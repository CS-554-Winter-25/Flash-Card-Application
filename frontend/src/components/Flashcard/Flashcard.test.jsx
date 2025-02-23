import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Flashcard from "./Flashcard";
import { describe, it, expect } from 'vitest'; 

describe('Flashcard', () => {

    it('should render without fail', () => {
        const { container } = render(<Flashcard />);
        expect(container).toBeInTheDocument(); 
    })

})
