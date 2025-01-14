import { useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { EditExerciseDrawer } from "./EditExerciseDrawer";
import { RemoveExerciseModal } from "./RemoveExerciseModal";
import { ErrorComponent } from "../ErrorComponent";
import {
  DragExerciseIcon,
  EditExerciseIcon,
  RemoveExerciseIcon,
} from "../icons/user/modify";

import type { ExerciseType, CreateWorkoutType } from "@/util/types";

export const ExercisesList = ({
  workout,
  exercisesError,
  editForm,
  setWorkout,
  editExercises,
  removeExercise,
}: {
  workout: CreateWorkoutType;
  exercisesError: string[] | undefined;
  editForm?: boolean;
  setWorkout: (workout: CreateWorkoutType) => void;
  editExercises: (editedExercise: ExerciseType) => void;
  removeExercise: (id: string) => void;
}) => {
  const [openEditDrawer, setOpenEditDrawer] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [currentExercise, setCurrentExercise] = useState<ExerciseType>({
    id: "",
    name: "",
    sets: [],
    note: "",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: { distance: 50 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id === over.id) return;

    const prevExercises = [...workout.exercises];
    const activeIndex = prevExercises.findIndex(
      (exercise) => exercise.id === active.id,
    );
    const overIndex = prevExercises.findIndex(
      (exercise) => exercise.id === over!.id,
    );

    setWorkout({
      ...workout,
      exercises: arrayMove(prevExercises, activeIndex, overIndex),
    });
  }

  return (
    <>
      <EditExerciseDrawer
        isOpen={openEditDrawer}
        setIsOpen={setOpenEditDrawer}
        exercise={currentExercise}
        editExercises={editExercises}
      />

      <RemoveExerciseModal
        isOpen={openRemoveModal}
        setIsOpen={setOpenRemoveModal}
        exerciseName={currentExercise.name}
        removeExercise={() => removeExercise(currentExercise.id)}
        isEditWorkoutPage={editForm}
        openEditDrawer={() => setOpenEditDrawer(true)}
      />

      {workout.exercises.length === 0 ? (
        <ExerciseShell exercisesError={exercisesError} />
      ) : (
        <DndContext
          sensors={sensors}
          modifiers={[restrictToVerticalAxis]}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="relative space-y-4 px-2 pb-2 pt-6 group-disabled:opacity-50">
            <SortableContext
              items={workout.exercises}
              strategy={verticalListSortingStrategy}
            >
              {workout.exercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  setCurrentExercise={setCurrentExercise}
                  openEditDrawer={() => setOpenEditDrawer(true)}
                  openRemoveModal={() => setOpenRemoveModal(true)}
                />
              ))}
            </SortableContext>
          </div>
        </DndContext>
      )}
    </>
  );
};

const ExerciseShell = ({
  exercisesError,
}: {
  exercisesError: string[] | undefined;
}) => {
  return (
    <div className="space-y-2 pt-6">
      <div
        className={twMerge(
          "space-y-3 rounded-xl border-2 border-dashed border-slate-400/60 bg-white px-4 py-24 text-center group-disabled:opacity-30 dark:border-slate-600 dark:bg-slate-800",
          exercisesError && "border-red-500 dark:border-red-500",
        )}
      >
        <h3 className="font-manrope">Exercises not added yet</h3>

        <p className="text-sm text-slate-400/80 dark:text-slate-400">
          Press the{" "}
          <span className="font-bold uppercase text-violet-400 dark:text-violet-400">
            plus
          </span>{" "}
          button to add one
        </p>
      </div>

      <ErrorComponent
        errorArr={exercisesError}
        className="justify-center py-4 group-disabled:opacity-50"
      />
    </div>
  );
};

const ExerciseCard = ({
  exercise,
  setCurrentExercise,
  openEditDrawer,
  openRemoveModal,
}: {
  exercise: ExerciseType;
  setCurrentExercise: (exercise: ExerciseType) => void;
  openEditDrawer: () => void;
  openRemoveModal: () => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: exercise.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex w-full flex-col gap-3 rounded-lg bg-white p-4 shadow-md ring-1 ring-slate-400/40 dark:bg-slate-800 dark:ring-slate-600"
    >
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 dark:border-slate-700 [&>*:nth-child(2)]:mr-auto">
        <button
          {...attributes}
          {...listeners}
          type="button"
          className="cursor-move touch-none rounded-lg px-2 py-1 active:bg-slate-200 active:dark:bg-slate-600"
        >
          {DragExerciseIcon}
        </button>

        <p className="font-bold uppercase dark:text-slate-200">
          {exercise.name}
        </p>

        <button
          type="button"
          onClick={() => {
            setCurrentExercise({ ...exercise });
            openEditDrawer();
          }}
          className="rounded-full p-1.5 text-green-500 shadow-md ring-1 ring-inset ring-slate-300 transition focus:outline-none active:scale-95 dark:shadow-slate-900 dark:ring-slate-600"
        >
          {EditExerciseIcon}
          <span className="sr-only">Edit exercise</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setCurrentExercise({ ...exercise });
            openRemoveModal();
          }}
          className="rounded-full p-1.5 text-red-500 shadow-md ring-1 ring-inset ring-slate-300 transition focus:outline-none active:scale-95 dark:text-red-400 dark:shadow-slate-900 dark:ring-slate-600"
        >
          {RemoveExerciseIcon}
          <span className="sr-only">Remove exercise</span>
        </button>
      </div>

      <div className="flex flex-col items-center gap-2">
        {exercise.sets.map((set) => (
          <div
            key={set.id}
            className="flex w-full justify-center gap-3 text-sm"
          >
            <p className="w-1/5 text-right">{set.reps}</p>

            <div className="w-[1px] bg-slate-200 dark:bg-slate-700" />

            <p className="w-1/5 text-left">{set.weight} kg</p>
          </div>
        ))}
      </div>

      {exercise.note && (
        <p className="border-t border-slate-200 pl-1 pt-3 text-sm italic text-slate-400 dark:border-slate-700 dark:text-slate-500">
          {exercise.note}
        </p>
      )}
    </div>
  );
};
