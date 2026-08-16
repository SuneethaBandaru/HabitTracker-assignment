import { render, screen } from "@testing-library/react"
import Footer from "@/components/Footer"

test("renders the footer landmark", () => {
    render(<Footer />)
    expect(screen.getByRole("contentinfo")).toBeInTheDocument()
})

test("renders the footer text", () => {
    render(<Footer />)
    expect(screen.getByText(`Suneetha Habit Tracker © ${new Date().getFullYear()}`)).toBeInTheDocument()
})