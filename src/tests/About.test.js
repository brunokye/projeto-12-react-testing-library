import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { About } from '../pages';

describe('Testa o componente <About.js />', () => {
  it('Teste se a página contém um heading "h2" com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);

    const aboutTitle = screen.getByRole('heading', { name: /about pokédex/i });
    expect(aboutTitle).toBeInTheDocument();
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const firstParagraph = 'This application simulates a Pokédex, a digital encyclopedia containing all Pokémon';
    const secondParagraph = 'One can filter Pokémon by type, and see more details for each one of them';
    const getFirst = screen.getByText(firstParagraph);
    const getSecond = screen.getByText(secondParagraph);

    expect(getFirst).toBeInTheDocument();
    expect(getSecond).toBeInTheDocument();
  });

  it('Testa se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const IMAGE_URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const pokedexImage = screen.getByRole('img');

    expect(pokedexImage).toBeInTheDocument();
    expect(pokedexImage).toHaveAttribute('src', IMAGE_URL);
    expect(pokedexImage).toHaveAttribute('alt', 'Pokédex');
  });
});
