import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';

describe('Testa o componente <FavoritePokemon.js />', () => {
  it('Testa se é exibida na tela a mensagem "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemon pokemonList={ [] } />);

    const favoritesTitle = screen.getByText(/no favorite pokémon found/i);
    expect(favoritesTitle).toBeInTheDocument();
  });
});
