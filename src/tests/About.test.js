import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

describe('Testa o componente About', () => {
  it('testa se a página contém informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    // Acessar
    const aboutPokedex = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });

    const primeiroParagrafo = screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing all pokémon/i,
    );

    const segundoParagrafo = screen.getByText(
      /one can filter pokémon by type, and see more details for each one of them/i,
    );

    const imagePokedex = screen.getByRole('img', {
      name: /pokédex/i,
    });

    // Agir
    // Aferir
    expect(aboutPokedex).toBeInTheDocument();

    expect(primeiroParagrafo).toBeInTheDocument();

    expect(segundoParagrafo).toBeInTheDocument();

    expect(imagePokedex).toBeInTheDocument();
    expect(imagePokedex.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
