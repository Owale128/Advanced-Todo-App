import { render, screen, waitFor } from "@testing-library/react";
import Header from "../components/Header";
import { useRouter } from "next/navigation";
import axios from "axios";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("sonner", () => ({
  toast: Object.assign(jest.fn(), {
    success: jest.fn(),
    error: jest.fn(),
  }),
}));

jest.mock("../components/ThemeToggle", () => {
  return function ThemeToggle() {
    return <div data-testid="theme-toggle">Theme Toggle</div>;
  };
});

describe("Header Component", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    mockedAxios.get.mockResolvedValue({ data: { username: "testuser" } });
    jest.clearAllMocks();
  });

  it("should render title", () => {
    render(<Header />);
    expect(screen.getByText("to do list")).toBeInTheDocument();
  });

  it("should render current date", () => {
    render(<Header />);
    const today = new Date().toLocaleDateString("sv-SE");
    expect(screen.getByText(today)).toBeInTheDocument();
  });

  it("should fetch and display username", async () => {
    render(<Header />);
    await waitFor(() => {
      expect(screen.getByText("testuser")).toBeInTheDocument();
    });
  });

  it("should show logout button", () => {
    render(<Header />);
    expect(screen.getByTitle("Logga ut")).toBeInTheDocument();
  });
});
