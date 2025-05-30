// import { render, screen, fireEvent } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
// import HomePage from '../pages/Home';
// import { vi } from 'vitest';

// describe('HomePage', () => {
//   beforeEach(() => {
//     render(
//       <MemoryRouter>
//         <HomePage />
//       </MemoryRouter>
//     );
//   });

//   it('renders hero section with title and Join Now button', () => {
//     expect(screen.getByText(/Innovations in Technology/i)).toBeInTheDocument();
//     expect(screen.getByText(/Join Now/i)).toBeInTheDocument();
//   });

//   it('renders latest blogs section with 3 blog posts', () => {
//     expect(screen.getByText(/Latest Blogs/i)).toBeInTheDocument();
//     expect(screen.getByText(/Blog Post 1/i)).toBeInTheDocument();
//     expect(screen.getByText(/Blog Post 2/i)).toBeInTheDocument();
//     expect(screen.getByText(/Blog Post 3/i)).toBeInTheDocument();
//   });

//   it('renders follow us section and opens modal on icon click', () => {
//     const icon = screen.getByAltText('Facebook');
//     fireEvent.click(icon);
//     expect(screen.getByText(/Facebook/i)).toBeInTheDocument(); // Modal content
//   });

//   it('closes modal when clicking outside modal content', () => {
//     const icon = screen.getByAltText('Twitter');
//     fireEvent.click(icon);
//     expect(screen.getByText(/Twitter/i)).toBeInTheDocument();

//     const overlay = screen.getByRole('dialog');
//     fireEvent.click(overlay);
//     expect(screen.queryByText(/Twitter/i)).not.toBeInTheDocument();
//   });

//   it('renders footer with contact and links', () => {
//     expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();
//     expect(screen.getByText(/Accessibility Statement/i)).toBeInTheDocument();
//     expect(screen.getByText(/© 2035 by My Site/i)).toBeInTheDocument();
//   });
// });
