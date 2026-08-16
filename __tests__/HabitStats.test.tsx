import { render, screen } from "@testing-library/react"
import HabitStats from "@/components/HabitStats"

test("shows the correct count when some habits are incomplete", () => {
    const habits = [
        { id: "1", name: "Drink water", completedToday: false },
        { id: "2", name: "Read 10 pages", completedToday: true },
    ]
    render(<HabitStats habits={habits} />)
    expect(screen.getByText(/1 habit remaining/i)).toBeInTheDocument()
})

test("uses plural wording when more than one habit remains", () => {
    const habits = [
        { id: "1", name: "Drink water", completedToday: false },
        { id: "2", name: "Stretch", completedToday: false },
    ]
    render(<HabitStats habits={habits} />)
    expect(screen.getByText(/2 habits remaining/i)).toBeInTheDocument()
})

test("shows 0 habits remaining when all are completed today", () => {
    render(<HabitStats habits={[{ id: "1", name: "Drink water", completedToday: true }]} />)
    expect(screen.getByText(/0 habits remaining/i)).toBeInTheDocument()
})