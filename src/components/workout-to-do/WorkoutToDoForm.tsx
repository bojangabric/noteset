"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { useWorkoutToDo, useWorkoutDuration } from "@/util/hooks";
import { submitDoneWorkout } from "@/util/actions/workout";
import { biggerSlideX, slideX } from "@/util/utils";
import { showToast } from "../Toasts";
import { BackButtonModal } from "../BackButtonModal";
import { WorkoutToDoTooltip } from "../Tooltips";
import {
  AddIcon,
  RemoveExerciseIcon,
  TrashBinIcon,
} from "../icons/user/modify";
import { AddExerciseDrawer } from "../user/AddExerciseDrawer";
import { SubmitDoneWorkoutButton } from "../SubmitButtons";

import type { CreateWorkoutType, ExerciseType } from "@/util/types";

type NoteType = { add: boolean; onExercise: string };

export const WorkoutToDoForm = ({
  workoutToDo,
}: {
  workoutToDo: CreateWorkoutType;
}) => {
  const {
    currWorkout,
    placeholderExercises,
    removeMode,
    handleNoteInput,
    resetNoteInput,
    handleSetsInput,
    addNewSet,
    removeSet,
    updateExercises,
    enterRemoveMode,
    resetChangesInRemoveMode,
    saveChangesInRemoveMode,
  } = useWorkoutToDo(workoutToDo);
  const { mutate: clientAction, isPending } = useMutation({
    mutationFn: async () => {
      const workoutDuration = calcWorkoutDuration();

      const res = await submitDoneWorkout(currWorkout, workoutDuration);

      return res;
    },
    onSuccess: (res) => {
      if (res.status === "success-redirect") {
        router.push(`/post-workout?workoutTitle=${currWorkout.title}`);
      }

      if (res.status === "error") {
        showToast(res.message);
      }

      setOpenDoneModal(false);
    },
  });
  const { endWorkout, calcWorkoutDuration } = useWorkoutDuration();
  const [note, setNote] = useState<NoteType>({ add: false, onExercise: "" });
  const [openDoneModal, setOpenDoneModal] = useState(false);
  const router = useRouter();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-20 bg-gradient-to-r from-green-600 from-20% to-violet-600 pt-safe-top dark:from-green-700 dark:to-violet-700">
        <div className="flex items-center gap-3 px-4 py-2 [&>*:nth-child(2)]:mr-auto [&>*:nth-child(3)]:mr-2">
          <BackButtonModal className="mr-4 rounded-full p-1.5 text-white active:bg-slate-300/60 dark:active:bg-slate-300/50" />

          <p className="font-manrope text-xl uppercase text-white">
            {currWorkout.title}
          </p>

          <WorkoutToDoTooltip />
        </div>
      </header>

      <main className="mt-safe-top flex flex-col px-6 pb-[73px] pt-14">
        <form
          id="submit-done-workout"
          action={() => clientAction()}
          className="divide-y divide-slate-300 dark:divide-slate-800"
        >
          {currWorkout.exercises.map((exercise, exerciseIndex) => (
            <div key={exercise.id} className="flex flex-col py-6">
              <p className="pb-1 text-2xl font-bold">{exercise.name}</p>

              <AnimatePresence mode="wait" initial={false}>
                {note.add && note.onExercise === exercise.id ? (
                  <NoteInputField
                    exercise={exercise}
                    removeMode={removeMode}
                    handleNoteInput={handleNoteInput}
                    resetNoteInput={resetNoteInput}
                    closeNoteInput={() =>
                      setNote({ add: false, onExercise: "" })
                    }
                  />
                ) : exercise.note ? (
                  <EditNote
                    exercise={exercise}
                    removeMode={removeMode}
                    showNoteInput={() =>
                      setNote({ add: true, onExercise: exercise.id })
                    }
                  />
                ) : (
                  <AddNote
                    removeMode={removeMode}
                    showNoteInput={() =>
                      setNote({ add: true, onExercise: exercise.id })
                    }
                  />
                )}
              </AnimatePresence>

              <div className="py-8">
                <div className="flex justify-evenly pb-3 text-center">
                  <label
                    htmlFor={`${exercise.name} - rep 1`}
                    className="w-1/3 font-manrope text-xs font-semibold uppercase dark:text-slate-300"
                  >
                    Reps
                  </label>

                  <label
                    htmlFor={`${exercise.name} - weight 1`}
                    className="w-1/3 font-manrope text-xs font-semibold uppercase dark:text-slate-300"
                  >
                    Weights - kg
                  </label>
                </div>

                <AnimatePresence initial={false}>
                  {exercise.sets.map((set, setIndex) => (
                    <motion.div
                      key={set.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                      }}
                      transition={{
                        opacity: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
                        height: {
                          duration: 0.5,
                          ease: [0.36, 0.66, 0.04, 1],
                        },
                      }}
                    >
                      <div
                        className={`flex items-center justify-evenly ${setIndex !== exercise.sets.length - 1 ? "pb-3" : "pb-0"}`}
                      >
                        <input
                          type="text"
                          name="reps"
                          disabled={removeMode}
                          inputMode="tel"
                          placeholder={
                            placeholderExercises[exerciseIndex]?.sets[setIndex]
                              ?.reps
                          }
                          onChange={(e) => {
                            handleSetsInput(e, exercise.id, set.id);
                          }}
                          className={twMerge(
                            "input-field w-1/3 py-1.5 text-center caret-violet-500 focus:ring-violet-500 disabled:opacity-60 dark:caret-violet-500 dark:focus:ring-violet-500",
                            !/^\d+(?:[-+]\d+)?$/.test(set.reps) &&
                              set.reps !== "" &&
                              "ring-red-500 focus:ring-red-500 dark:ring-red-500 dark:focus:ring-red-500",
                          )}
                        />

                        <input
                          type="text"
                          name="weight"
                          disabled={removeMode}
                          inputMode="decimal"
                          placeholder={
                            placeholderExercises[exerciseIndex]?.sets[setIndex]
                              ?.weight
                          }
                          onChange={(e) => {
                            handleSetsInput(e, exercise.id, set.id);
                          }}
                          className={twMerge(
                            "input-field w-1/3 py-1.5 text-center caret-violet-500 focus:ring-violet-500 disabled:opacity-60 dark:caret-violet-500 dark:focus:ring-violet-500",
                            !/^\d+(,\d+|\.\d+)?$/.test(set.weight) &&
                              set.weight !== "" &&
                              "ring-red-500 focus:ring-red-500 dark:ring-red-500 dark:focus:ring-red-500",
                          )}
                        />
                        <AnimatePresence>
                          {removeMode && (
                            <motion.div
                              key={`remove-set-btn-${set.id}`}
                              variants={slideX}
                              initial="right-hidden"
                              animate="slide-from-right"
                              exit={{
                                opacity: 0,
                                x: 16,
                                transition: {
                                  duration: 0.15,
                                  ease: [0.36, 0.66, 0.04, 1],
                                },
                              }}
                            >
                              <button
                                type="button"
                                onClick={() => removeSet(exercise.id, set.id)}
                                className="rounded-full bg-red-500 p-1.5 text-white"
                              >
                                {RemoveExerciseIcon}
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <button
                type="button"
                disabled={removeMode}
                onClick={async () => {
                  await new Promise((resolve) => setTimeout(resolve, 100));

                  addNewSet(exercise.id);
                }}
                className="mx-auto flex w-fit items-center gap-1 rounded-lg px-3 py-[5px] text-sm font-bold active:bg-slate-200 disabled:pointer-events-none disabled:opacity-30 dark:text-slate-300 dark:active:bg-slate-800"
              >
                <AddIcon size={20} strokeWidth={1.2} />
                <p className="font-semibold uppercase">Add set</p>
              </button>
            </div>
          ))}
        </form>
      </main>

      <footer className="fixed inset-x-0 bottom-0 border-t border-slate-300/80 bg-white px-6 pb-6 pt-2 text-end dark:border-slate-800 dark:bg-slate-950">
        <AnimatePresence mode="wait" initial={false}>
          {removeMode ? (
            <motion.div
              key="remove-mode-footer"
              variants={biggerSlideX}
              initial="right-hidden"
              animate="slide-from-right"
              exit="slide-to-left"
              className="flex items-center justify-between"
            >
              <button
                type="button"
                onClick={resetChangesInRemoveMode}
                className="rounded-lg px-3 py-1.5 text-lg font-semibold active:scale-95 active:bg-slate-200 dark:text-slate-300 dark:active:bg-slate-700"
              >
                Close
                <p className="sr-only">Close Remove mode</p>
              </button>

              <button
                type="button"
                onClick={saveChangesInRemoveMode}
                className="rounded-lg px-3 py-1.5 text-xl font-bold text-green-500 active:scale-95 active:bg-slate-200 dark:text-green-600 dark:active:bg-slate-700"
              >
                Save
                <p className="sr-only">Save changes in Remove mode</p>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form-footer"
              variants={biggerSlideX}
              initial="right-hidden"
              animate="slide-from-right"
              exit="slide-to-left"
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <AddExerciseDrawer
                  updateExercises={updateExercises}
                  className="rounded-full p-1.5 text-slate-400 active:scale-95 active:bg-slate-200 dark:text-slate-300 dark:active:bg-slate-700"
                />

                <button
                  type="button"
                  onClick={enterRemoveMode}
                  className="rounded-full p-1.5 text-red-500 active:bg-slate-200 dark:active:bg-slate-700"
                >
                  <TrashBinIcon className="size-6" strokeWidth={1.8} />
                  <p className="sr-only">Enter Remove mode</p>
                </button>
              </div>

              <SubmitDoneWorkoutButton
                formId="submit-done-workout"
                pending={isPending}
                open={openDoneModal}
                setOpen={setOpenDoneModal}
                endWorkout={endWorkout}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </footer>
    </>
  );
};

const NoteInputField = ({
  exercise,
  removeMode,
  handleNoteInput,
  resetNoteInput,
  closeNoteInput,
}: {
  exercise: ExerciseType;
  removeMode: boolean;
  handleNoteInput: (
    event: React.ChangeEvent<HTMLInputElement>,
    exerciseId: string,
  ) => void;
  resetNoteInput: (exerciseId: string) => void;
  closeNoteInput: () => void;
}) => {
  return (
    <motion.div
      key="editing-note"
      variants={slideX}
      initial="right-hidden"
      animate="slide-from-right"
      exit="slide-to-left"
      className="flex gap-2"
    >
      <div className="relative w-full border-b-2 border-violet-500 py-1.5">
        <input
          autoFocus
          id="note"
          type="text"
          disabled={removeMode}
          value={exercise.note ?? ""}
          placeholder="Leave a note..."
          onChange={(e) => handleNoteInput(e, exercise.id)}
          className="w-[90%] rounded-none bg-transparent font-semibold placeholder-slate-400/80 caret-violet-500 placeholder:text-sm placeholder:italic focus:placeholder-slate-300 focus:outline-none disabled:opacity-30 dark:text-white dark:placeholder-slate-500 dark:focus:placeholder-slate-700"
        />

        <button
          type="button"
          disabled={removeMode}
          onClick={async () => {
            await new Promise((resolve) => setTimeout(resolve, 150));

            resetNoteInput(exercise.id);
          }}
          className="absolute inset-y-0 right-0 z-10"
        >
          <div className="rounded-full bg-slate-400 p-[3px] text-slate-100 active:bg-slate-300 dark:bg-slate-500 dark:text-slate-900 dark:active:bg-slate-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-[14px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        </button>
      </div>

      <button
        type="button"
        disabled={removeMode}
        onClick={async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));

          closeNoteInput();
        }}
        className="rounded-lg px-4 font-manrope font-bold text-blue-400 active:bg-slate-200 disabled:pointer-events-none disabled:opacity-30 dark:text-blue-500 dark:active:bg-slate-800"
      >
        Done
      </button>
    </motion.div>
  );
};

const EditNote = ({
  exercise,
  removeMode,
  showNoteInput,
}: {
  exercise: ExerciseType;
  removeMode: boolean;
  showNoteInput: () => void;
}) => {
  return (
    <motion.div
      key="edit-note"
      variants={slideX}
      initial="right-hidden"
      animate="slide-from-right"
      exit="slide-to-left"
      className="flex items-center justify-between gap-2"
    >
      <p className="py-1.5 font-semibold italic text-slate-400 dark:text-slate-400">
        {exercise.note}
      </p>

      <button
        type="button"
        disabled={removeMode}
        onClick={async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));

          showNoteInput();
        }}
        className="rounded-lg px-4 py-[3px] font-manrope font-bold text-green-500 active:bg-slate-200 disabled:pointer-events-none disabled:opacity-30 dark:text-green-600 dark:active:bg-slate-800"
      >
        Edit
      </button>
    </motion.div>
  );
};

const AddNote = ({
  removeMode,
  showNoteInput,
}: {
  removeMode: boolean;
  showNoteInput: () => void;
}) => {
  return (
    <motion.div
      key="add-note"
      variants={slideX}
      initial="right-hidden"
      animate="slide-from-right"
      exit="slide-to-left"
      className="flex justify-end"
    >
      <button
        type="button"
        disabled={removeMode}
        onClick={async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));

          showNoteInput();
        }}
        className="rounded-lg px-4 py-[11px] font-manrope font-bold leading-none text-green-500 active:bg-slate-200 disabled:pointer-events-none disabled:opacity-30 dark:text-green-600 dark:active:bg-slate-800"
      >
        Add note
      </button>
    </motion.div>
  );
};
