import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Register from "../registrera/page";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe('Register component', () => {
    const mockPush = jest.fn()

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush})
    });

    afterEach(() => {
        mockPush.mockClear()
    })
    
    it("should navigate to home on successful registration", async () => {
        render(<Register />)

        const usernameInput = screen.getByLabelText(/Namn/i)
        const passwordInput = screen.getByLabelText(/^Lösenord$/i)
        const confirmPassword = screen.getByLabelText(/^Bekräfta Lösenord$/i)
        const submitButton = screen.getByRole("button", {name: /Registrera konto/i})
        
        fireEvent.change(usernameInput, { target: { value: "testUser" }})
        fireEvent.change(passwordInput, { target: { value: "Password123" }})
        fireEvent.change(confirmPassword, { target: { value: "Password123" }})
        fireEvent.click(submitButton)

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith("/")
        })
    })
    
    it("should show error when password dont't match", async () => {
        render (<Register />)

        fireEvent.change(screen.getByLabelText(/Namn/i), {target: {value: "testUser"}})
        fireEvent.change(screen.getByLabelText(/^Lösenord$/i), {target: {value: "password123"}})
        fireEvent.change(screen.getByLabelText(/^Bekräfta lösenord$/i), {target: {value: "password12"}})
        fireEvent.click(screen.getByRole("button", {name: /Registrera konto/i}))

        await waitFor(() => {
            expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument()
        })

        expect(mockPush).not.toHaveBeenCalled()
    })
});