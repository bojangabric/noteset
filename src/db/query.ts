"use server";

import { unstable_noStore as noStore } from "next/cache";
import { db } from ".";
import { workouts } from "./schema";
import { eq } from "drizzle-orm/mysql-core/expressions";

export async function getUserWorkouts(id: string) {
  noStore();

  try {
    const userWorkouts = await db
      .select({
        id: workouts.id,
        title: workouts.title,
        description: workouts.description,
      })
      .from(workouts)
      .where(eq(workouts.userId, id));

    console.log("Workouts fetched.");

    return userWorkouts;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to get user's workouts.");
  }
}

export async function getWorkoutByTitle(title: string) {
  noStore();

  const workout = await db.query.workouts.findFirst({
    where: eq(workouts.title, title),
  });

  workout
    ? console.log("Workout retrived.")
    : console.log("Workout not retrived.");

  return workout;
}