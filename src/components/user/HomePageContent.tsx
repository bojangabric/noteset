"use client";

import Link from "next/link";
import { useState } from "react";
import { EmptyIcon } from "../icons/user/warning";
import { RemoveWorkoutModal } from "./RemoveWorkoutModal";
import { StatusIndicator } from "../StatusIndicator";
import { PreviewWorkoutButtonDrawer } from "./PreviewWorkoutButtonDrawer";
import { EditWorkoutIcon, TrashBinIcon } from "../icons/user/modify";

import type { PartialWorkoutType } from "@/db/schema";

export const HomePageContent = ({
  workouts,
}: {
  workouts: PartialWorkoutType[];
}) => {
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [workoutToRemove, setWorkoutToRemove] = useState({ title: "", id: 0 });

  return (
    <>
      <RemoveWorkoutModal
        open={openRemoveModal}
        setOpen={setOpenRemoveModal}
        workoutToRemove={workoutToRemove}
      />

      {workouts.length === 0 ? (
        <main className="mt-safe-top flex flex-col justify-center px-6 pb-[91px] pt-[158px]">
          <EmptyPage />
        </main>
      ) : (
        <main className="mt-safe-top space-y-4 px-6 pb-[91px] pt-[158px]">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className="flex w-full flex-col gap-4 rounded-xl border border-slate-300/80 bg-white px-4 py-6 shadow-md dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="space-y-1.5 px-1">
                <div className="flex justify-between gap-4">
                  <p className="text-pretty font-manrope text-lg font-bold uppercase dark:text-slate-300">
                    {workout.title}
                  </p>

                  <StatusIndicator status={workout.status} />
                </div>

                <p className="text-pretty text-sm font-semibold italic leading-none text-slate-400/80 dark:text-slate-400/60">
                  {workout.description
                    ? workout.description
                    : "Description not provided"}
                </p>
              </div>

              <div className="h-[1px] bg-green-200 dark:bg-green-900/70" />

              <div className="flex gap-2 px-1 [&>*:nth-child(2)]:mr-auto">
                <PreviewWorkoutButtonDrawer
                  workout={workout}
                  className="px-2"
                  size={5}
                />

                <Link
                  href={`/workout-to-do?id=${workout.id}`}
                  scroll={false}
                  className="flex items-center rounded-lg bg-gradient-to-r from-violet-400 to-violet-500 px-4 py-1 font-bold text-white shadow-md transition active:scale-90 active:from-violet-300 active:to-violet-400 dark:from-violet-500 dark:to-violet-600 dark:active:from-violet-700 dark:active:to-violet-800"
                >
                  Start
                  <p className="sr-only">Start this workout</p>
                </Link>

                <Link
                  href={`/edit?id=${workout.id}`}
                  scroll={false}
                  className="rounded-full p-1.5 text-green-500 shadow-md ring-1 ring-inset ring-slate-300 active:scale-95 active:bg-slate-200 dark:shadow-slate-900 dark:ring-slate-600 dark:active:bg-slate-700"
                >
                  {EditWorkoutIcon}
                  <span className="sr-only">Edit workout</span>
                </Link>

                <button
                  type="button"
                  onClick={async () => {
                    await new Promise((resolve) => setTimeout(resolve, 100));
                    setWorkoutToRemove({
                      id: workout.id,
                      title: workout.title,
                    });
                    setOpenRemoveModal(true);
                  }}
                  className="rounded-full p-1.5 text-red-500 shadow-md ring-1 ring-inset ring-slate-300 active:scale-95 active:bg-slate-200 dark:text-red-400 dark:shadow-slate-900 dark:ring-slate-600 dark:active:bg-slate-700"
                >
                  <TrashBinIcon className="size-5" strokeWidth={1.2} />
                  <span className="sr-only">Remove workout</span>
                </button>
              </div>
            </div>
          ))}
        </main>
      )}
    </>
  );
};

const EmptyPage = () => {
  return (
    <div className="flex flex-col items-center gap-8 pb-18">
      <div className="text-slate-400/60 dark:text-slate-700/80">
        {EmptyIcon}
      </div>

      <div className="space-y-4 text-center">
        <h3>Seems like you haven&apos;t created any workout yet</h3>
        <p className="font-semibold italic text-slate-400/85">
          Tap the plus button to create one
        </p>
      </div>
    </div>
  );
};
