// test/Profile.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Profile from "../pages/Profile";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

// Mock fetch with vi.fn and proper response shape
global.fetch = vi.fn().mockImplementation((url) => {
  if (url.toString().includes("/profile")) {
    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          username: "testuser",
          email: "test@example.com",
          name: "Test User",
          passingYear: "2023",
          socialLink: "https://linkedin.com/in/testuser",
        }),
    } as Response);
  } else if (url.toString().includes("/newBlog")) {
    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            title: "Test Blog",
            description: "This is a test blog post.",
            author: "testuser",
          },
        ]),
    } as Response);
  }
});

describe("Profile Page", () => {
  beforeEach(() => {
    localStorage.setItem("username", "testuser");
  });

  afterEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("renders profile page correctly", async () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );

    // Wait for profile to load
    await waitFor(() =>
      expect(screen.getByDisplayValue("testuser")).toBeInTheDocument()
    );

    expect(screen.getByText("Your Profile")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Change password")).toBeInTheDocument();
  });

  it("toggles blog visibility", async () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );

    const toggleBtn = await screen.findByText("View My Blogs");

    fireEvent.click(toggleBtn);

    await waitFor(() =>
      expect(screen.getByText("Test Blog")).toBeInTheDocument()
    );

    expect(screen.getByText("This is a test blog post.")).toBeInTheDocument();
  });
});
