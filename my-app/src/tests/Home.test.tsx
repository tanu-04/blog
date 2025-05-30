import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../pages/Home";
import { vi } from "vitest";
import { describe, it, test, expect, beforeEach, afterEach } from 'vitest';

// Mock global fetch using vitest's vi.fn
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () =>
      Promise.resolve([
        {
          id: 1,
          name: "Jane Doe",
          username: "janedoe",
          email: "jane@example.com",
          address: {
            street: "Street 1",
            city: "City",
            zipcode: "11111",
          },
        },
      ]),
  } as Response)
);

describe("HomePage component", () => {
  it("renders profiles fetched from API", async () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Name: Jane Doe")).toBeInTheDocument();
      expect(screen.getByText("Username: janedoe")).toBeInTheDocument();
    });
  });
});
