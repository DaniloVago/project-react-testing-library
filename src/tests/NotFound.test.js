import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('Testa o componente NotFound', () => {
  it('testa se a página contém informações sobre o NotFound', () => {
    renderWithRouter(<NotFound />);
    // Acessar
    const aboutNotFound = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });

    const imageNotFound = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });

    // Agir
    // Aferir
    expect(aboutNotFound).toBeInTheDocument();

    expect(imageNotFound).toBeInTheDocument();
    expect(imageNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
