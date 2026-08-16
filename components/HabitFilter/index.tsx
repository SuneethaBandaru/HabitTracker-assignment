export type FilterType = "all" | "active" | "completed";

type HabitFilterProps = {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
};

const options: FilterType[] = ["all", "active", "completed"];

const HabitFilter = ({ filter, setFilter }: HabitFilterProps) => {
  return (
    <div
      role="group"
      aria-label="filter habits"
      className="w-3xl m-auto flex justify-center gap-4"
    >
      {options.map((option) => (
        <button
          key={option}
          data-testid={`filter-${option}`}
          onClick={() => setFilter(option)}
          className={
            filter === option ? "font-bold text-green-500" : "text-gray-400"
          }
        >
          {option}
        </button>
      ))}
    </div>
  );
};
export default HabitFilter;
