import { render, screen, fireEvent } from "@testing-library/react"
import Habit from "@/components/Habit"

const mockHabit = { id: "1", name: "Drink water", completedToday: false }

test("renders the habit's name", () => {
    render(<Habit habit={mockHabit} removeHabit={jest.fn()} toggleComplete={jest.fn()} />)
    expect(screen.getByText("Drink water")).toBeInTheDocument()
})

test("calls removeHabit with the habit's id when remove is clicked", () => {
    const mockRemove = jest.fn()
    render(<Habit habit={mockHabit} removeHabit={mockRemove} toggleComplete={jest.fn()} />)
    fireEvent.click(screen.getByRole("button", { name: /remove drink water/i }))
    expect(mockRemove).toHaveBeenCalledWith("1")
})

test("calls toggleComplete with the habit's id when checkbox is clicked", () => {
    const mockToggle = jest.fn()
    render(<Habit habit={mockHabit} removeHabit={jest.fn()} toggleComplete={mockToggle} />)
    fireEvent.click(screen.getByRole("checkbox"))
    expect(mockToggle).toHaveBeenCalledWith("1")
})

test("shows the habit as unchecked when not completed today", () => {
    render(<Habit habit={mockHabit} removeHabit={jest.fn()} toggleComplete={jest.fn()} />)
    expect((screen.getByRole("checkbox") as HTMLInputElement).checked).toBe(false)
})

test("shows the habit as checked and struck through when completed today", () => {
    const doneHabit = { ...mockHabit, completedToday: true }
    render(<Habit habit={doneHabit} removeHabit={jest.fn()} toggleComplete={jest.fn()} />)
    expect((screen.getByRole("checkbox") as HTMLInputElement).checked).toBe(true)
    expect(screen.getByText("Drink water")).toHaveClass("line-through")
})