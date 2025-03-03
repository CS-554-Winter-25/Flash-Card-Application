import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar Component', () => {

  it('toggles dark mode', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
  
    const themeToggleButton = screen.getByRole('button', { className: /theme-toggle/i });
  
    // Turn on
    fireEvent.click(themeToggleButton);
    expect(document.body.classList.contains('dark-mode')).toBe(true);
  
    // Turn off
    fireEvent.click(themeToggleButton);
    expect(document.body.classList.contains('dark-mode')).toBe(false);
  });

  it('renders login', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
  
    const loginButton = screen.getByRole('button', { className: /navbar-login/i });
    expect(loginButton).toBeInTheDocument();
  });

  it('renders logo', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
  
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();
  });

});