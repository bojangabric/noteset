import { twMerge } from "tailwind-merge";
import { InputFieldError } from "./InputFieldError";

export const TitleInput = ({
  title,
  titleError,
  handleTitleInput,
}: {
  title: string;
  titleError: string[] | undefined;
  handleTitleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex flex-col gap-2 px-4 group-disabled:opacity-50">
      <label
        htmlFor="title"
        className="pl-1 font-manrope text-sm font-semibold uppercase text-slate-600 dark:text-slate-200"
      >
        Title
      </label>
      <input
        required
        id="title"
        value={title ? title : ""}
        type="text"
        placeholder="e.g. Upper 1"
        onChange={(e) => handleTitleInput(e)}
        className={twMerge(
          "input-field",
          titleError && "ring-red-500 dark:ring-red-500",
        )}
      />
      <InputFieldError
        errorArr={titleError}
        className="pl-1 group-disabled:opacity-50"
      />
    </div>
  );
};

export const DescriptionInput = ({
  description,
  handleDescriptionInput,
}: {
  description: string | null;
  handleDescriptionInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex flex-col gap-2 px-4 group-disabled:opacity-50">
      <label
        htmlFor="description"
        className="flex items-center gap-1 pl-1 font-manrope text-sm font-semibold uppercase text-slate-600 dark:text-slate-200"
      >
        Description
        <span className="text-xs lowercase italic text-slate-400/80 dark:text-slate-500">
          (optional)
        </span>
      </label>
      <input
        id="description"
        value={description ? description : ""}
        type="text"
        placeholder="e.g. Workout for the upper body"
        onChange={(e) => handleDescriptionInput(e)}
        className="input-field"
      />
    </div>
  );
};