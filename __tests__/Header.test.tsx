import { render, screen } from "@testing-library/react"
import Header from "@/components/Header"

test("renders the site heading", () => {
    render(<Header />)
    expect(screen.getByRole("heading", { name: /habit tracker/i })).toBeInTheDocument()
})

test("renders a navigation link to home", () => {
    render(<Header />)
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument()
})