import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import data from '../data';

describe('Testa o componente <Pokedex.js />', () => {
  it('Testa se a página contém um heading h2 com o texto "Encountered Pokémon"', () => {
    renderWithRouter(<App />);

    const pokedexTitle = screen.getByRole('heading', { name: /encountered pokémon/i });
    expect(pokedexTitle).toBeInTheDocument();
  });

  it('Testa se é exibido o próximo Pokémon da lista quando o botão "Próximo Pokémon" é clicado', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });

    for (let i = 2; i <= data.length; i += 1) {
      userEvent.click(nextButton);
    }

    const pokemonName = screen.getByText(/dragonair/i);
    expect(pokemonName).toBeInTheDocument();
  });

  it('Testa se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    const firstPokemon = screen.getByText(/pikachu/i);
    const firstNull = screen.queryByText(/charmander/i);

    expect(firstPokemon).toBeInTheDocument();
    expect(firstNull).not.toBeInTheDocument();

    userEvent.click(nextButton);
    const secondPokemon = screen.queryByText(/charmander/i);
    const secondNull = screen.queryByText(/pikachu/i);

    expect(secondPokemon).toBeInTheDocument();
    expect(secondNull).not.toBeInTheDocument();
  });

  it('Testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: /all/i });
    const typeButton = screen.getAllByTestId('pokemon-type-button');

    expect(allButton).toBeInTheDocument();
    expect(allButton).toBeEnabled();

    userEvent.click(allButton);
    expect(typeButton[0].textContent).toBe('Electric');
    expect(typeButton[1].textContent).toBe('Fire');
    expect(typeButton[2].textContent).toBe('Bug');
    expect(typeButton[3].textContent).toBe('Poison');
    expect(typeButton[4].textContent).toBe('Psychic');
    expect(typeButton[5].textContent).toBe('Normal');
    expect(typeButton[6].textContent).toBe('Dragon');
  });
});
