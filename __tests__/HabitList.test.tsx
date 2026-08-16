import { render, screen } from "@testing-library/react"
import HabitList from "@/components/HabitList"

const mockHabits = [
    { id: "1", name: "Drink water", completedToday: false },
    { id: "2", name: "Read 10 pages", completedToday: true },
]

test("renders one habit item per entry in the list", () => {
    render(<HabitList habits={mockHabits} deleteFunction={jest.fn()} toggleFunction={jest.fn()} />)
    expect(screen.getAllByTestId("habit").length).toBe(2)
})

test("shows a message when there are no habits", () => {
    render(<HabitList habits={[]} deleteFunction={jest.fn()} toggleFunction={jest.fn()} />)
    expect(screen.getByText(/no habits yet/i)).toBeInTheDocument()
})

test("does not show the empty message when habits exist", () => {
    render(<HabitList habits={mockHabits} deleteFunction={jest.fn()} toggleFunction={jest.fn()} />)
    expect(screen.queryByText(/no habits yet/i)).not.toBeInTheDocument()
})

test("renders habits in the order they are given", () => {
    render(<HabitList habits={mockHabits} deleteFunction={jest.fn()} toggleFunction={jest.fn()} />)
    const habits = screen.getAllByTestId("habit")
    expect(habits[0]).toHaveTextContent("Drink water")
    expect(habits[1]).toHaveTextContent("Read 10 pages")
})