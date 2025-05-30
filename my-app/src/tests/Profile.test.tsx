// src/tests/Profile.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Profile from '../pages/Profile';
import { BrowserRouter } from 'react-router-dom';

const mockNavigate = vi.fn();

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock localStorage
vi.stubGlobal('localStorage', {
  getItem: vi.fn(() => 'testuser'),
  setItem: vi.fn(),
});

// Mock fetch
const mockProfileData = {
  username: 'testuser',
  email: 'test@example.com',
  name: 'Test User',
  passingYear: '2022',
  socialLink: 'https://linkedin.com/in/testuser',
};

const mockBlogData = [
  {
    title: 'My First Blog',
    description: 'A blog post.',
    author: 'testuser',
    imageUrl: '',
  },
];

describe('Profile Page', () => {
  beforeEach(() => {
    vi.resetAllMocks();

    vi.stubGlobal('fetch', vi.fn((url) => {
      if ((url as string).includes('/profile')) {
        return Promise.resolve({ json: () => Promise.resolve(mockProfileData) });
      } else if ((url as string).includes('/newBlog')) {
        return Promise.resolve({ json: () => Promise.resolve(mockBlogData) });
      }
      return Promise.resolve({ json: () => Promise.resolve({ message: 'Updated' }), ok: true });
    }));
  });

  it('renders profile inputs and fetches data', async () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('testuser')).toBeInTheDocument();
      expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
      expect(screen.getByText('Your Profile')).toBeInTheDocument();
    });
  });

  it('updates profile on form submit', async () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );

    await waitFor(() => screen.getByText('Update Profile'));

    fireEvent.change(screen.getByPlaceholderText('Change password'), {
      target: { value: 'newPass123' },
    });

    fireEvent.click(screen.getByText('Update Profile'));

    await waitFor(() => {
      expect(screen.getByText('Updated')).toBeInTheDocument();
    });
  });

  it('toggles and displays blogs', async () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );

    await waitFor(() => screen.getByText('View My Blogs'));
    fireEvent.click(screen.getByText('View My Blogs'));

    await waitFor(() => {
      expect(screen.getByText('My First Blog')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Hide Blogs'));
    await waitFor(() => {
      expect(screen.queryByText('My First Blog')).not.toBeVisible();
    });
  });
});
