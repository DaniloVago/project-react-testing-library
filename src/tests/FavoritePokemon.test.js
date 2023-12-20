import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';

describe('Testa o componente Favorite Pokémon', () => {
  it('testa se é exibido a mensagem de sem pokemons favoritos', () => {
    renderWithRouter(<FavoritePokemon />);
    // Acessar
    const semFavoritos = screen.getByText(/no favorite pokémon found/i);
    // Agir
    // Aferir
    expect(semFavoritos).toBeInTheDocument();
  });
});
