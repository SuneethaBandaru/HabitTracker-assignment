import { render, screen, fireEvent } from "@testing-library/react"
import HabitFilter from "@/components/HabitFilter"

test("renders all three filter buttons", () => {
    render(<HabitFilter filter="all" setFilter={jest.fn()} />)
    expect(screen.getAllByRole("button").length).toBe(3)
})

test("calls setFilter with 'completed' when that button is clicked", () => {
    const mockSetFilter = jest.fn()
    render(<HabitFilter filter="all" setFilter={mockSetFilter} />)
    fireEvent.click(screen.getByTestId("filter-completed"))
    expect(mockSetFilter).toHaveBeenCalledWith("completed")
})

test("highlights the currently active filter", () => {
    render(<HabitFilter filter="active" setFilter={jest.fn()} />)
    expect(screen.getByTestId("filter-active")).toHaveClass("font-bold")
})