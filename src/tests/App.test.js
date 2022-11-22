import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente <App.js />', () => {
  it('Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });
    const favoriteLink = screen.getByRole('link', { name: /favorite pokémon/i });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  it('Testa se a aplicação é redirecionada para a página "Home"', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    const homeTitle = screen.getByRole('heading', { name: /encountered pokémon/i });

    userEvent.click(homeLink);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
    expect(homeTitle).toBeInTheDocument();
  });

  it('Testa se a aplicação é redirecionada para a página "About"', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });

    userEvent.click(aboutLink);
    const { pathname } = history.location;
    const aboutTitle = screen.getByRole('heading', { name: /about pokédex/i });

    expect(pathname).toBe('/about');
    expect(aboutTitle).toBeInTheDocument();
  });

  it('Testa se a aplicação é redirecionada para a página "Favorite Pokémon"', () => {
    const { history } = renderWithRouter(<App />);
    const favoritesLink = screen.getByRole('link', { name: /favorite pokémon/i });

    userEvent.click(favoritesLink);
    const { pathname } = history.location;
    const favoritesTitle = screen.getByRole('heading', { name: /favorite pokémon/i });

    expect(pathname).toBe('/favorites');
    expect(favoritesTitle).toBeInTheDocument();
  });

  it('Testa se a aplicação é redirecionada para a página "Not Found"', () => {
    const { history } = renderWithRouter(<App />);
    const INVALID_URL = '/pagina/que-nao-existe/';

    act(() => { history.push(INVALID_URL); });

    const notFoundTitle = screen.getByRole('heading', { name: /page requested not found/i });
    const notFoundImage = screen.getByAltText(/pikachu crying/i);

    expect(notFoundTitle).toBeInTheDocument();
    expect(notFoundImage).toBeInTheDocument();
  });
});
