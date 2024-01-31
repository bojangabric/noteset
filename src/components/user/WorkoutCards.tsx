import Link from "next/link";
import { manrope } from "@/styles/fonts";
import { EmptyPage } from "./EmptyPage";
import { PreviewWorkoutButton } from "./PreviewWorkoutButton";
import { EditSection } from "./EditSection";
import { getUserWorkouts } from "@/db/query";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const WorkoutCards = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const workouts = await getUserWorkouts(user?.id as string);

  if (workouts.length < 1) {
    return <EmptyPage />;
  }

  return (
    <div className="space-y-4">
      {workouts.map((workout) => (
        <div
          key={workout.id}
          className="flex w-full flex-col gap-4 rounded-xl bg-white px-4 py-6 shadow-md dark:bg-slate-800/90"
        >
          <div className="space-y-1 px-1">
            <p className="text-lg font-bold dark:text-slate-300">
              {workout.title}
            </p>
            <p className="text-pretty text-sm italic leading-none text-slate-400/80 dark:text-slate-400/60">
              {workout.description}
            </p>
          </div>

          <div className="h-[1px] bg-green-200 dark:bg-green-900/70" />

          <div className="flex justify-between px-1">
            <div className="flex gap-2">
              <PreviewWorkoutButton workout={workout} />
              <Link
                href={`/workout?id=${workout.id}`}
                className={`rounded-lg bg-gradient-to-r from-violet-400 to-violet-500 px-4 py-1 font-semibold text-white shadow-md transition active:scale-95 dark:from-violet-500 dark:to-violet-600 ${manrope.className}`}
              >
                Start
              </Link>
            </div>

            <EditSection workout={workout} />
          </div>
        </div>
      ))}
    </div>
  );
};
