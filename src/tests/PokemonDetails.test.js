import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente <PokemonDetails.js />', () => {
  it('Testa se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);

    const detailsButton = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsButton);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pikachu = pokemonName.textContent;
    const detailsTitle = screen.getByRole('heading', { name: `${pikachu} Details` });

    const nullButton = screen.queryByRole('link', { name: /more details/i });
    const summaryTitle = screen.getByRole('heading', { name: /summary/i });

    const POKEMON_INFO = 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.';
    const summaryText = screen.getByText(POKEMON_INFO);

    expect(detailsTitle).toBeInTheDocument();
    expect(nullButton).not.toBeInTheDocument();
    expect(summaryTitle).toBeInTheDocument();
    expect(summaryText).toBeInTheDocument();
  });

  it('Testa se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />);

    const detailsButton = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsButton);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pikachu = pokemonName.textContent;
    const locationsTitle = screen.getByRole('heading', { name: `Game Locations of ${pikachu}` });

    const locationsImage = screen.getAllByAltText(`${pikachu} location`);
    const VIRIDIAN_FLOREST = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const POWER_PLANT = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';

    expect(locationsTitle).toBeInTheDocument();
    expect(locationsImage[0]).toHaveAttribute('src', VIRIDIAN_FLOREST);
    expect(locationsImage[1]).toHaveAttribute('src', POWER_PLANT);
  });

  it('Testa se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);

    const detailsButton = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsButton);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pikachu = pokemonName.textContent;
    const detailsLabel = screen.getByLabelText(/pokémon favoritado?/i);
    const detailsCheckbox = screen.getByRole('checkbox');

    expect(detailsLabel).toBeInTheDocument();
    userEvent.click(detailsCheckbox);
    expect(detailsCheckbox).toBeChecked();

    userEvent.click(detailsCheckbox);
    expect(detailsCheckbox).not.toBeChecked();

    userEvent.click(detailsCheckbox);
    const detailsFavorite = screen.getByAltText(`${pikachu} is marked as favorite`);
    const ICON = '/star-icon.svg';

    expect(detailsFavorite).toHaveAttribute('src', ICON);
  });
});
