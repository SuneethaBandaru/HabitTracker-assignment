import { Trash2 } from "lucide-react";
import type { HabitType } from "@/types/habit";

type HabitProps = {
  habit: HabitType;
  removeHabit: (idToRemove: string) => void;
  toggleComplete: (idToToggle: string) => void;
};

const Habit = ({ habit, removeHabit, toggleComplete }: HabitProps) => {
  return (
    <div data-testid="habit" className="flex justify-between items-center m-2">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={habit.completedToday}
          onChange={() => toggleComplete(habit.id)}
          aria-label={`mark ${habit.name} done today`}
        />
        <span
          className={habit.completedToday ? "line-through text-gray-400" : ""}
        >
          {habit.name}
        </span>
      </label>
      <Trash2
        data-testid="remove-button"
        role="button"
        aria-label={`remove ${habit.name}`}
        onClick={() => removeHabit(habit.id)}
      />
    </div>
  );
};
export default Habit;
