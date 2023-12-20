import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente App', () => {
  it('testa as rotas da aplicação', () => {
    renderWithRouter(<App />);
    // Acessar
    const linkHome = screen.getByRole('link', {
      name: /home/i,
    });
    const linkAbout = screen.getByRole('link', {
      name: /about/i,
    });
    const linkFavorite = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    // Agir
    // Aferir
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();
  });

  it('testa direcionamento correto da rota Home', () => {
    const { history } = renderWithRouter(<App />);
    // Acessar
    const linkHome = screen.getByRole('link', {
      name: /home/i,
    });
    // Agir
    userEvent.click(linkHome);
    // Aferir
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  it('testa direcionamento correto da rota About', () => {
    const { history } = renderWithRouter(<App />);
    // Acessar
    const linkAbout = screen.getByRole('link', {
      name: /about/i,
    });
    // Agir
    userEvent.click(linkAbout);
    // Aferir
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  it('testa direcionamento correto da rota Pokémon Favoritados', () => {
    const { history } = renderWithRouter(<App />);
    // Acessar
    const linkFavorite = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    // Agir
    userEvent.click(linkFavorite);
    // Aferir
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });

  it('renderiza o NotFound caso seja acessada uma rota inexistente', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/xablau');
    });

    const notFoundTitle = screen.getByRole('heading', {
      name: /page requested not found/i,
    });

    expect(notFoundTitle).toBeInTheDocument();
    // Acessar
    // Agir
    // Aferir
  });
});
