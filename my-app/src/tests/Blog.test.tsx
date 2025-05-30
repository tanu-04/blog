import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Blog from "../pages/Blog";
import { vi } from "vitest";
import { describe, it, test, expect, beforeEach, afterEach } from 'vitest';
import React from 'react';


// Mock fetch using vi.fn()
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { id: 1, title: "Test Blog 1", body: "Content 1" },
        { id: 2, title: "Test Blog 2", body: "Content 2" },
      ]),
  }as Response) 
);

describe("Blog component", () => {
  it("renders blog posts", async () => {
    render(
      <MemoryRouter>
        <Blog />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Test Blog 1")).toBeInTheDocument();
      expect(screen.getByText("Test Blog 2")).toBeInTheDocument();
    });
  });
});
