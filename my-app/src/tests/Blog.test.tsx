import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BlogDetail from '../components/BlogDetail';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        _id: '1',
        title: 'Test Blog',
        description: 'This is a test blog.',
        content: 'This is the blog content.',
        author: 'Test Author',
        createdAt: '2023-01-01T00:00:00Z',
      }),
  })
) as unknown as typeof fetch;

describe('BlogDetail Component', () => {
  it('renders the blog title after fetching data', async () => {
    render(
      <MemoryRouter initialEntries={['/Test%20Blog']}>
        <Routes>
          <Route path="/:title" element={<BlogDetail />} />
        </Routes>
      </MemoryRouter>
    );

    const title = await screen.findByText('Test Blog');
    expect(title).toBeInTheDocument();
  });
});
