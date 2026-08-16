"use client";

import { useState, useEffect } from "react";
import type { HabitType } from "@/types/habit";
import { mockHabits } from "@/data/habits";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HabitList from "@/components/HabitList";
import AddHabit from "@/components/AddHabit";
import HabitStats from "@/components/HabitStats";
import HabitFilter, { type FilterType } from "@/components/HabitFilter";

function Home() {
  const [habits, setHabits] = useState<HabitType[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    setHabits(mockHabits);
  }, []);

  const addHabit = (name: string): void => {
    setHabits([
      ...habits,
      { id: crypto.randomUUID(), name, completedToday: false },
    ]);
  };

  const removeHabit = (idToRemove: string): void => {
    setHabits(habits.filter((item) => item.id !== idToRemove));
  };

  const toggleComplete = (idToToggle: string): void => {
    setHabits(
      habits.map((item) =>
        item.id === idToToggle
          ? { ...item, completedToday: !item.completedToday }
          : item,
      ),
    );
  };

  const visibleHabits = habits.filter((habit) => {
    if (filter === "active") return !habit.completedToday;
    if (filter === "completed") return habit.completedToday;
    return true;
  });

  return (
    <>
      <Header />
      <main>
        <AddHabit addFunction={addHabit} />
        <HabitFilter filter={filter} setFilter={setFilter} />
        <HabitList
          habits={visibleHabits}
          deleteFunction={removeHabit}
          toggleFunction={toggleComplete}
        />
        <HabitStats habits={habits} />
      </main>
      <Footer />
    </>
  );
}

export default Home;
