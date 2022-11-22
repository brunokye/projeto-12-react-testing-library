import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente <Pokemon.js />', () => {
  it('Testa se é renderizado um card com as informações do Pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByRole('img');
    const SPRITE_URL = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    expect(pokemonName.textContent).toBe('Pikachu');
    expect(pokemonType.textContent).toBe('Electric');
    expect(pokemonWeight.textContent).toBe('Average weight: 6.0 kg');
    expect(pokemonImage).toHaveAttribute('src', SPRITE_URL);
    expect(pokemonImage).toHaveAttribute('alt', `${pokemonName.textContent} sprite`);
  });

  it('Testa se o card do Pokémon contém um link de navegação para exibir detalhes', () => {
    const { history } = renderWithRouter(<App />);

    const detailsButton = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');
  });

  it('Testa informações da página "More details"', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pikachu = pokemonName.textContent;
    const detailsButton = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsButton);

    const detailsTitle = screen.getByRole('heading', { name: `${pikachu} Details` });
    const detailsCheckbox = screen.getByRole('checkbox');

    userEvent.click(detailsCheckbox);
    const detailsFavorite = screen.getByAltText(`${pikachu} is marked as favorite`);
    const ICON = '/star-icon.svg';

    expect(detailsTitle).toBeInTheDocument();
    expect(detailsFavorite).toHaveAttribute('src', ICON);
  });
});
