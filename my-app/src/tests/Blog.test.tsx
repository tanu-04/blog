import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import BlogCard from '../components/blogcard'; // Adjust the path if necessary

// Mock axios to prevent actual API calls during tests
vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('BlogCard Component', () => {
  // Clear mocks and clean up the DOM after each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  const defaultProps = {
    title: 'Test Blog Title',
    description: 'This is a test description for the blog card.',
    initialComments: [],
  };

  // Test Case 1: Renders basic content correctly
  it('renders the blog title and description', () => {
    render(
      <MemoryRouter>
        <BlogCard {...defaultProps} />
      </MemoryRouter>
    );

    // Assert that the title and description are in the document
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();

    // Assert initial likes count (should be 0 as per component's useState)
    // Use aria-label to distinguish the like button
    expect(screen.getByLabelText(/Like button, current likes: 0/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Like button, current likes: 0/i)).toHaveTextContent('0');

    // Assert initial comments count (should be 0 for defaultProps)
    // Use aria-label to distinguish the comment button
    expect(screen.getByLabelText(/Toggle comments, current comments: 0/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Toggle comments, current comments: 0/i)).toHaveTextContent('0');
  });

  // Test Case 2: Handles like button click and updates likes count
  it('handles like button click and updates the likes count', async () => {
    // Mock the axios.post call for liking
    mockedAxios.post.mockResolvedValueOnce({ data: { likes: 1 } });

    render(
      <MemoryRouter>
        <BlogCard {...defaultProps} />
      </MemoryRouter>
    );

    // Find the like button using its aria-label (initial state)
    const likeButton = screen.getByLabelText(/Like button, current likes: 0/i);

    // Simulate a click on the like button
    fireEvent.click(likeButton);

    // Assert that axios.post was called with the correct endpoint
    expect(mockedAxios.post).toHaveBeenCalledWith(
      `http://localhost:5000/blogs/${encodeURIComponent(defaultProps.title)}/like`
    );

    // Wait for the likes count to update after the API call resolves
    await waitFor(() => {
      // The aria-label will update with the new likes count
      expect(screen.getByLabelText(/Like button, current likes: 1/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Like button, current likes: 1/i)).toHaveTextContent('1');
    });

    // Ensure the loading state is reset
    expect(likeButton).not.toHaveClass('opacity-50');
    expect(likeButton).not.toBeDisabled();
  });

  // Test Case 3: Disables like button while loading
  it('disables the like button while a like request is in progress', async () => {
    // Mock axios.post to return a pending promise to simulate loading
    let resolveLikePromise: (value: any) => void;
    const pendingLikePromise = new Promise(resolve => {
      resolveLikePromise = resolve;
    });
    mockedAxios.post.mockReturnValueOnce(pendingLikePromise as any);

    render(
      <MemoryRouter>
        <BlogCard {...defaultProps} />
      </MemoryRouter>
    );

    const likeButton = screen.getByLabelText(/Like button, current likes: 0/i);

    // Click the like button
    fireEvent.click(likeButton);

    // Assert that the button is disabled and has the loading class
    expect(likeButton).toBeDisabled();
    expect(likeButton).toHaveClass('opacity-50');

    // Resolve the pending promise
    resolveLikePromise!({ data: { likes: 1 } });

    // Wait for the loading state to clear and button to become enabled
    await waitFor(() => {
      expect(likeButton).not.toBeDisabled();
      expect(likeButton).not.toHaveClass('opacity-50');
    });

    // Verify the likes count updated
    expect(screen.getByLabelText(/Like button, current likes: 1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Like button, current likes: 1/i)).toHaveTextContent('1');
  });


  // Test Case 4: Toggles comments section visibility
  it('toggles the comments section visibility when the comments button is clicked', async () => {
    render(
      <MemoryRouter>
        <BlogCard {...defaultProps} />
      </MemoryRouter>
    );

    // Initially, the comment input and post button should not be in the document
    expect(screen.queryByPlaceholderText('Write a comment...')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Post' })).not.toBeInTheDocument();

    // Find the comments button using its aria-label (initial state)
    const commentButton = screen.getByLabelText(/Toggle comments, current comments: 0/i);

    // Click to show comments
    fireEvent.click(commentButton);

    // Assert that the comment input and post button are now visible
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Write a comment...')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Post' })).toBeInTheDocument();
    });

    // Click again to hide comments
    fireEvent.click(commentButton);

    // Assert that the comment input and post button are no longer visible
    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Write a comment...')).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Post' })).not.toBeInTheDocument();
    });
  });

  // Test Case 5: Posts a new comment
  it('posts a new comment and updates the comments list', async () => {
    // Mock the axios.post call for commenting
    mockedAxios.post.mockResolvedValueOnce({
      data: [{ author: 'Anonymous', text: 'New test comment' }], // Backend returns updated array
    });

    render(
      <MemoryRouter>
        <BlogCard {...defaultProps} />
      </MemoryRouter>
    );

    const commentButton = screen.getByLabelText(/Toggle comments, current comments: 0/i);
    fireEvent.click(commentButton); // Show comments section

    const commentInput = screen.getByPlaceholderText('Write a comment...');
    const postButton = screen.getByRole('button', { name: 'Post' });

    // Type into the comment input
    fireEvent.change(commentInput, { target: { value: 'New test comment' } });
    expect(commentInput).toHaveValue('New test comment');

    // Click the post button
    fireEvent.click(postButton);

    // Assert that axios.post was called with the correct endpoint and payload
    expect(mockedAxios.post).toHaveBeenCalledWith(
      `http://localhost:5000/blogs/${encodeURIComponent(defaultProps.title)}/comment`,
      { text: 'New test comment' }
    );

    // Wait for the new comment to appear in the document
    await waitFor(() => {
      expect(screen.getByText(/New test comment/i)).toBeInTheDocument();
      expect(screen.getByText(/Anonymous:/i)).toBeInTheDocument(); // Check for author
    });

    // Assert that the comment input is cleared
    expect(commentInput).toHaveValue('');
  });

  // Test Case 6: Disables comment post button while loading
  it('disables the comment post button while a comment request is in progress', async () => {
    // Mock axios.post to return a pending promise to simulate loading
    let resolveCommentPromise: (value: any) => void;
    const pendingCommentPromise = new Promise(resolve => {
      resolveCommentPromise = resolve;
    });
    mockedAxios.post.mockReturnValueOnce(pendingCommentPromise as any);

    render(
      <MemoryRouter>
        <BlogCard {...defaultProps} />
      </MemoryRouter>
    );

    // Show comments section
    fireEvent.click(screen.getByLabelText(/Toggle comments, current comments: 0/i));

    const commentInput = screen.getByPlaceholderText('Write a comment...');
    const postButton = screen.getByRole('button', { name: 'Post' });

    // Type a comment
    fireEvent.change(commentInput, { target: { value: 'Loading comment' } });

    // Click the post button
    fireEvent.click(postButton);

    // Assert that the button is disabled and has the loading class
    expect(postButton).toBeDisabled();
    expect(postButton).toHaveClass('opacity-50');

    // Resolve the pending promise
    resolveCommentPromise!({ data: [{ author: 'Anonymous', text: 'Loading comment' }] });

    // Wait for the loading state to clear and button to become enabled
    await waitFor(() => {
      expect(postButton).not.toBeDisabled();
      expect(postButton).not.toHaveClass('opacity-50');
    });

    // Verify the comment appeared
    expect(screen.getByText(/Loading comment/i)).toBeInTheDocument();
  });

  // Test Case 7: Does not post an empty comment
  it('does not post a comment if the input is empty', async () => {
    render(
      <MemoryRouter>
        <BlogCard {...defaultProps} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByLabelText(/Toggle comments, current comments: 0/i)); // Show comments

    const commentInput = screen.getByPlaceholderText('Write a comment...');
    const postButton = screen.getByRole('button', { name: 'Post' });

    // Ensure input is empty or just whitespace
    fireEvent.change(commentInput, { target: { value: '   ' } });

    fireEvent.click(postButton);

    // Assert that axios.post was NOT called
    expect(mockedAxios.post).not.toHaveBeenCalled();

    // Assert that the comment input is still empty (or whitespace)
    expect(commentInput).toHaveValue('   ');
  });

  // Test Case 8: Renders initial comments passed via props
  it('renders initial comments passed via props', async () => {
    const initialComments = [
      { author: 'Alice', text: 'Great post!' },
      { author: 'Bob', text: 'Very insightful.' },
    ];

    render(
      <MemoryRouter>
        <BlogCard {...defaultProps} initialComments={initialComments} />
      </MemoryRouter>
    );

    // Assert initial comments count is correct using the updated aria-label
    expect(screen.getByLabelText(/Toggle comments, current comments: 2/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Toggle comments, current comments: 2/i)).toHaveTextContent('2');

    // Show comments section
    fireEvent.click(screen.getByLabelText(/Toggle comments, current comments: 2/i));

    // Assert that initial comments are displayed
    await waitFor(() => {
      expect(screen.getByText(/Alice: Great post!/i)).toBeInTheDocument();
      expect(screen.getByText(/Bob: Very insightful./i)).toBeInTheDocument();
    });
  });
});
