// src/tests/Blog.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Blog from '../pages/Blog';
import { BrowserRouter } from 'react-router-dom';

vi.stubGlobal('fetch', vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      {
        _id: '1',
        title: 'Test Blog Post',
        description: 'This is a test blog description.',
        author: 'Author One',
        likes: 5,
        comments: [{ text: 'Great post!' }],
      },
    ]),
  })
));

describe('Blog Page', () => {
  it('renders fetched blogs correctly', async () => {
    render(
      <BrowserRouter>
        <Blog />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('All Posts')).toBeInTheDocument();
      expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
      expect(screen.getByText('This is a test blog description.')).toBeInTheDocument();
      expect(screen.getByText('NewBlog')).toBeInTheDocument();
    });
  });

  it('displays no blogs if fetch returns empty array', async () => {
    (fetch as any).mockImplementationOnce(() =>
      Promise.resolve({ json: () => Promise.resolve([]) })
    );

    render(
      <BrowserRouter>
        <Blog />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('All Posts')).toBeInTheDocument();
      // Optionally check that nothing else appears
    });
  });
});
