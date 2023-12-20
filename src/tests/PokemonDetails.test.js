import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Testa o componente PokemonDetails', () => {
  const pokemon1 = pokemonList[0];
  it('testa se as informaçoes detalhadas do pokemon selecionado sao mostradas na tela', () => {
    const { getByText } = renderWithRouter(<App />);

    const detalhesPikachu = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detalhesPikachu);

    const nameDetails = screen.getByRole('heading', {
      name: `${pokemon1.name} Details`,
    });
    const summaryTitle = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    const paragrafo = getByText(pokemon1.summary);

    expect(nameDetails).toBeInTheDocument();
    expect(summaryTitle).toBeInTheDocument();
    expect(paragrafo).toBeInTheDocument();
  });

  it('testa se existe na página uma seção com os mapas contendo as localizaçoes', () => {
    const { getAllByAltText } = renderWithRouter(<App />);

    const detalhesPikachu = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detalhesPikachu);

    const locationName = screen.getByRole('heading', {
      name: `Game Locations of ${pokemon1.name}`,
    });
    expect(locationName).toBeInTheDocument();

    const locationScreen = [
      'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    ];
    const locationPikachu = getAllByAltText(`${pokemon1.name} location`);
    locationPikachu.forEach(
      (locations, index) => expect(locations.src).toBe(locationScreen[index]),
    );
  });

  it('testa se usuario pode favoritar na tela de detalhes', () => {
    renderWithRouter(<App />);
    const detalhesPikachu = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detalhesPikachu);

    const checkboxFavorite = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    expect(checkboxFavorite).toBeInTheDocument();
    userEvent.click(checkboxFavorite);

    const favoritado = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(favoritado).toBeInTheDocument();
    userEvent.click(checkboxFavorite);
    expect(favoritado).not.toBeInTheDocument();
  });
});
