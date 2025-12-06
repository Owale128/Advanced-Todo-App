import Home from "../page";
import { useRouter } from "next/navigation";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Home Page", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    mockedAxios.post.mockResolvedValue({
      status: 200,
      data: { message: "Login successful" },
    });
  });

  afterEach(() => {
    mockPush.mockClear();
    jest.clearAllMocks;
  });

  it("should navigate to /todo-app on successful login", async () => {
    render(<Home />);

    const usernameInput = screen.getByLabelText(/Namn/i);
    const passwordInput = screen.getByLabelText(/Lösenord/i);
    const submitButton = screen.getByRole("button", { name: /Logga in/i });

    fireEvent.change(usernameInput, { target: { value: "testUser" } });
    fireEvent.change(passwordInput, { target: { value: "testPassword" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/todo-app");
    });
  });

  it("should show validation errors for empty fields", async () => {
    render(<Home />);

    const submitButton = screen.getByRole("button", { name: /Logga in/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Username must be at least 2 characters./i)
      ).toBeInTheDocument();
    });
    expect(mockPush).not.toHaveBeenCalled();
  });
});
