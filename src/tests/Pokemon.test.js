import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Testa o componente Pokemon', () => {
  const pokemon1 = pokemonList[0];

  it('testa se as informações do pokemon estão corretas', () => {
    renderWithRouter(<App />);
    const { averageWeight: { value, measurementUnit } } = pokemon1;
    // Acessar
    const namePikachu = screen.getByTestId('pokemon-name');
    const typePikachu = screen.getByTestId('pokemon-type');
    const weightPikachu = screen.getByTestId('pokemon-weight');
    const imagePikachu = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    // Agir
    // Aferir
    expect(namePikachu).toHaveTextContent(pokemon1.name);
    expect(typePikachu).toHaveTextContent(pokemon1.type);
    expect(weightPikachu).toHaveTextContent(
      `Average weight: ${value} ${measurementUnit}`,
    );
    expect(imagePikachu).toHaveAttribute('src', pokemon1.image);
    expect(imagePikachu).toHaveAttribute('alt', `${pokemon1.name} sprite`);
  });
  it('testa os pokemons favoritos', () => {
    renderWithRouter(<App />);

    const detalhesPikachu = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detalhesPikachu);

    const favoritarPikachu = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(favoritarPikachu);

    const estrelaFavorito = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(estrelaFavorito).toBeInTheDocument();
    expect(estrelaFavorito).toHaveAttribute('src', '/star-icon.svg');
  });
  it('testa se é exibido na tela o link href /pokemon/<id>', () => {
    const { history } = renderWithRouter(<App />);

    const detalhesPokemon = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detalhesPokemon);

    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemon/${pokemon1.id}`);
  });
});
