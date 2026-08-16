import { render, screen, fireEvent } from "@testing-library/react";
import AddHabit from "@/components/AddHabit";

test("renders the input and label", () => {
  render(<AddHabit addFunction={jest.fn()} />);
  expect(screen.getByLabelText(/add habit/i)).toBeInTheDocument();
});

test("typing into the input updates its value", () => {
  render(<AddHabit addFunction={jest.fn()} />);
  const input = screen.getByLabelText(/add habit/i) as HTMLInputElement;
  fireEvent.change(input, { target: { value: "Drink water" } });
  expect(input.value).toBe("Drink water");
});

test("clicking the add button calls addFunction and clears the input", () => {
  const mockFunction = jest.fn();
  render(<AddHabit addFunction={mockFunction} />);
  const input = screen.getByLabelText(/add habit/i) as HTMLInputElement;
  const button = screen.getByRole("button", { name: /submit habit/i });

  fireEvent.change(input, { target: { value: "Drink water" } });
  fireEvent.click(button);

  expect(mockFunction).toHaveBeenCalledWith("Drink water");
  expect(input.value).toBe("");
});

test("pressing Enter calls addFunction", () => {
  const mockFunction = jest.fn();
  render(<AddHabit addFunction={mockFunction} />);
  const input = screen.getByLabelText(/add habit/i);

  fireEvent.change(input, { target: { value: "Meditate" } });
  fireEvent.keyDown(input, { key: "Enter" });

  expect(mockFunction).toHaveBeenCalledWith("Meditate");
});

test("does not call addFunction when the input is empty", () => {
  const mockFunction = jest.fn();
  render(<AddHabit addFunction={mockFunction} />);
  fireEvent.click(screen.getByRole("button", { name: /submit habit/i }));
  expect(mockFunction).not.toHaveBeenCalled();
});