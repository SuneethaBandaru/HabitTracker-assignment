import { CirclePlus } from "lucide-react";
import { useState, type ChangeEvent, type KeyboardEvent } from "react";

type AddHabitProps = {
  addFunction: (name: string) => void;
};

const AddHabit = ({ addFunction }: AddHabitProps) => {
  const [value, setValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleAdd = () => {
    if (value.trim() !== "") {
      addFunction(value);
      setValue("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="w-3xl m-auto my-8 p-8 border rounded-xl border-pink-500 flex justify-between items-center">
      <label htmlFor="add-habit">Add habit</label>
      <input
        id="add-habit"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter habit..."
        value={value}
      />
      <CirclePlus
        data-testid="add-button"
        role="button"
        aria-label="submit habit"
        onClick={handleAdd}
      />
    </div>
  );
};
export default AddHabit;
