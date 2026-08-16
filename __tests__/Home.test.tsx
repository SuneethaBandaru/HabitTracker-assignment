import { render, screen, fireEvent } from "@testing-library/react"
import Home from "@/app/page"

test("adding a habit updates the list and the remaining count", async () => {
    render(<Home />)
    await screen.findAllByTestId("habit")

    const input = screen.getByLabelText(/add habit/i)
    fireEvent.change(input, { target: { value: "Journal" } })
    fireEvent.click(screen.getByRole("button", { name: /submit habit/i }))

    expect(screen.getAllByTestId("habit").length).toBe(3)
    expect(screen.getByText(/3 habits remaining/i)).toBeInTheDocument()
})

test("completing a habit updates the remaining count and hides it under the active filter", async () => {
    render(<Home />)
    const checkboxes = await screen.findAllByRole("checkbox")

    fireEvent.click(checkboxes[0])
    expect(screen.getByText(/1 habit remaining/i)).toBeInTheDocument()

    fireEvent.click(screen.getByTestId("filter-active"))
    expect(screen.queryByText("Drink water")).not.toBeInTheDocument()
})

test("removing a habit updates the list and it no longer appears in the document", async () => {
    render(<Home />)
    const removeButtons = await screen.findAllByTestId("remove-button")

    fireEvent.click(removeButtons[0])

    expect(screen.queryByText("Drink water")).not.toBeInTheDocument()
    expect(screen.getAllByTestId("habit").length).toBe(1)
})

test("a new habit can be added, completed, filtered, and removed", async () => {
    render(<Home />)
    await screen.findAllByTestId("habit")

    const input = screen.getByLabelText(/add habit/i)
    fireEvent.change(input, { target: { value: "Journal" } })
    fireEvent.click(screen.getByRole("button", { name: /submit habit/i }))

    expect(screen.getByText("Journal")).toBeInTheDocument()
    expect(screen.getAllByTestId("habit").length).toBe(3)

    const newHabitCheckbox = screen.getByRole("checkbox", { name: /mark journal done today/i })
    fireEvent.click(newHabitCheckbox)
    expect(screen.getByText("Journal")).toHaveClass("line-through")

    fireEvent.click(screen.getByTestId("filter-active"))
    expect(screen.queryByText("Journal")).not.toBeInTheDocument()

    fireEvent.click(screen.getByTestId("filter-all"))
    const removeButton = screen.getByRole("button", { name: /remove journal/i })
    fireEvent.click(removeButton)

    expect(screen.queryByText("Journal")).not.toBeInTheDocument()
    expect(screen.getAllByTestId("habit").length).toBe(2)
})