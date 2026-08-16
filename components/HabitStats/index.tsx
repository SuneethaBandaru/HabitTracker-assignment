import type { HabitType } from "@/types/habit";

type HabitStatsProps = {
  habits: HabitType[];
};

const HabitStats = ({ habits }: HabitStatsProps) => {
  const remaining = habits.filter((habit) => !habit.completedToday).length;

  return (
    <div className="w-3xl m-auto text-center text-gray-500">
      <p>
        {remaining} habit{remaining !== 1 ? "s" : ""} remaining
      </p>
    </div>
  );
};
export default HabitStats;
