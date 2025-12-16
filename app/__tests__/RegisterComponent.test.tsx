import axios from "axios";
import Register from "../registrera/page";
import { useRouter } from "next/navigation";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Register component", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    mockedAxios.post.mockResolvedValue({
      status: 201,
      data: { message: "User created successfully" },
    });
  });

  afterEach(() => {
    mockPush.mockClear();
    jest.clearAllMocks();
  });

  it("should navigate to home on successful registration", async () => {
    render(<Register />);

    const usernameInput = screen.getByLabelText(/^Name$/i);
    const passwordInput = screen.getByLabelText(/^Password$/i);
    const confirmPassword = screen.getByLabelText(/^Confirm password$/i);
    const submitButton = screen.getByRole("button", {
      name: /Register account/i,
    });

    fireEvent.change(usernameInput, { target: { value: "testUser" } });
    fireEvent.change(passwordInput, { target: { value: "Password123" } });
    fireEvent.change(confirmPassword, { target: { value: "Password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/todo-app");
    });
  });

  it("should show error when password dont't match", async () => {
    render(<Register />);

    fireEvent.change(screen.getByLabelText(/^Name$/i), {
      target: { value: "testUser" },
    });
    fireEvent.change(screen.getByLabelText(/^Password$/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/^Confirm password$/i), {
      target: { value: "password12" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Register account/i }));

    await waitFor(() => {
      expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
    });

    expect(mockPush).not.toHaveBeenCalled();
  });
});
