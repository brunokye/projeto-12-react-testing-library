import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('Testa o componente <NotFound.js />', () => {
  it('Testa se a página contém um heading h2 com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);

    const notFoundTitle = screen.getByRole('heading', { name: /page requested not found/i });
    expect(notFoundTitle).toBeInTheDocument();
  });

  it('Testa se a página contém a imagem do Pikachu chorando', () => {
    renderWithRouter(<NotFound />);

    const IMAGE_URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const IMAGE_ALT = 'Pikachu crying because the page requested was not found';
    const notFoundImage = screen.getByRole('img');

    expect(notFoundImage).toBeInTheDocument();
    expect(notFoundImage).toHaveAttribute('src', IMAGE_URL);
    expect(notFoundImage).toHaveAttribute('alt', IMAGE_ALT);
  });
});
