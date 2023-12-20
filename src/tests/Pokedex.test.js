import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente Pokedex', () => {
  it('testa se a página contém o h2 Encoutered Pokémon', () => {
    renderWithRouter(<App />);
    // Acessar
    const titleEncountered = screen.getByRole('heading', {
      name: /encountered pokémon/i,
      level: 2,
    });
    // Agir
    // Aferir
    expect(titleEncountered).toBeInTheDocument();
  });

  it('testa o botão Próximo Pokémon', () => {
    renderWithRouter(<App />);
    // Acessar
    const buttonNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    // Agir
    userEvent.click(buttonNext);
    const segundoPokemon = screen.getByText(/charmander/i);
    // Aferir

    expect(buttonNext).toBeInTheDocument();
    expect(segundoPokemon).toBeInTheDocument();
  });

  it('testa se exibe apenas um pokemon', () => {
    renderWithRouter(<App />);
    // Acessar
    const pokemonExibido = screen.getAllByTestId('pokemon-name');
    // Agir
    // Aferir
    expect(pokemonExibido).toHaveLength(1);
  });

  it('testa se tem todos os botões de filtros', () => {
    renderWithRouter(<App />);
    // Acessar
    const typesName = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const buttonsType = screen.getAllByTestId('pokemon-type-button');
    // Agir
    // Aferir
    buttonsType.forEach((type, index) => {
      expect(type).toHaveTextContent(typesName[index]);
    });
  });

  it('testa o botão All', () => {
    renderWithRouter(<App />);
    // Acessar
    const botaoAll = screen.getByRole('button', {
      name: /all/i,
    });
    const primeiroPokemon = screen.getByText(/pikachu/i);
    // Agir
    userEvent.click(botaoAll);
    // Aferir
    expect(botaoAll).toBeInTheDocument();
    expect(primeiroPokemon).toBeInTheDocument();
    expect(botaoAll).not.toHaveAttribute('pokemon-type-button');
  });
});
