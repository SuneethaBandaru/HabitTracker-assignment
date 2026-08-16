import type { HabitType } from "@/types/habit";
import Habit from "../Habit";

type HabitListProps = {
  habits: HabitType[];
  deleteFunction: (idToRemove: string) => void;
  toggleFunction: (idToToggle: string) => void;
};

const HabitList = ({
  habits,
  deleteFunction,
  toggleFunction,
}: HabitListProps) => {
  return (
    <div
      data-testid="habit-list"
      className="w-3xl m-auto my-8 p-8 border rounded-xl border-pink-500"
    >
      {habits.length === 0 ? (
        <p>No habits yet</p>
      ) : (
        habits.map((habit) => (
          <Habit
            habit={habit}
            removeHabit={deleteFunction}
            toggleComplete={toggleFunction}
            key={habit.id}
          />
        ))
      )}
    </div>
  );
};
export default HabitList;
