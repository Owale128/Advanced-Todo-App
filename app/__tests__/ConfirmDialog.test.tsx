import { render, screen } from "@testing-library/react";
import ConfirmDialog from "../components/ConfirmDialog";

describe("ConfirmDialog Component", () => {
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();

  const defaultProps = {
    isOpen: true,
    title: "Test Title",
    message: "Test message",
    onConfirm: mockOnConfirm,
    onCancel: mockOnCancel,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render when open", () => {
    render(<ConfirmDialog {...defaultProps} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });
});
