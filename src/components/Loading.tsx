import { AddIcon } from "./icons/user/modify";

export const LoadingWorkoutsSkeleton = () => {
  return (
    <main className="mt-safe-top space-y-4 px-6 pb-[91px] pt-[158px]">
      {[1, 2, 3, 4].map((skeleton) => (
        <div
          key={skeleton}
          className="flex w-full flex-col gap-4 rounded-xl bg-white px-4 py-6 shadow-md dark:bg-slate-900"
        >
          <div className="space-y-1 px-1">
            <div className="h-7 w-24 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-950/80" />
            <div className="h-4 w-52 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-950/50" />
          </div>

          <div className="h-[1px] bg-green-200 dark:bg-green-950/70" />

          <div className="flex justify-between px-1">
            <div className="flex gap-2">
              <div className="h-8 w-9 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-950/80" />
              <div className="h-8 w-18 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-950/80" />
            </div>
            <div className="flex items-center gap-4">
              <div className="size-6 animate-pulse rounded-full bg-slate-200 dark:bg-slate-950/50" />
              <div className="size-5 animate-pulse rounded-full bg-slate-200 dark:bg-slate-950/50" />
            </div>
          </div>
        </div>
      ))}
    </main>
  );
};

export const LoadingPostWorkoutPageSkeleton = () => {
  return (
    <>
      <main className="mt-safe-top space-y-4 px-6 pb-[91px] pt-[158px]">
        <div className="space-y-2 pt-4 text-center opacity-50">
          <div className="mx-auto h-8 w-3/4 animate-pulse rounded bg-slate-300 dark:bg-slate-700" />
          <div className="mx-auto h-6 w-2/3 animate-pulse rounded bg-slate-300 dark:bg-slate-700" />
        </div>

        <div className="space-y-2 py-2 opacity-50">
          <div className="h-6 w-1/3 animate-pulse rounded bg-slate-300 dark:bg-slate-700" />
          <div className="h-6 w-1/2 animate-pulse rounded bg-slate-300 dark:bg-slate-700" />
        </div>

        <div className="space-y-2 pb-4 text-center opacity-50">
          <div className="mx-auto h-6 w-4/5 animate-pulse rounded bg-slate-300 dark:bg-slate-700" />
          <div className="mx-auto h-6 w-3/5 animate-pulse rounded bg-slate-300 dark:bg-slate-700" />
        </div>

        <div className="flex justify-center gap-4 opacity-50">
          <div className="h-10 w-24 animate-pulse rounded-full bg-slate-300 dark:bg-slate-700" />
          <div className="w-[1px] bg-slate-300 dark:bg-slate-700/80" />
          <div className="h-10 w-24 animate-pulse rounded-full bg-slate-300 dark:bg-slate-700" />
        </div>
      </main>

      <footer className="flex justify-between border-t border-slate-300/80 px-6 pb-[26px] pt-2 group-disabled:pointer-events-none group-disabled:opacity-50 dark:border-slate-800">
        <div className="h-10 w-11 animate-pulse rounded-lg bg-slate-300 opacity-50 dark:bg-slate-700" />
      </footer>
    </>
  );
};

export const LoadingWorkoutToDoSkeleton = () => {
  return (
    <>
      <header className="bg-gradient-to-r from-green-600 from-20% to-violet-600 pt-safe-top dark:from-green-700 dark:to-violet-700">
        <div className="flex items-center gap-3 px-4 py-3.5 opacity-50">
          <div className="h-8 w-8 animate-pulse rounded-full bg-slate-300 dark:bg-slate-800" />
          <div className="mr-auto h-8 w-1/2 animate-pulse rounded bg-slate-300 dark:bg-slate-800" />
          <div className="mr-1.5 size-7 animate-pulse rounded-full bg-slate-300 p-1.5 dark:bg-slate-800" />
        </div>
      </header>

      <main className="flex flex-col divide-y divide-slate-300 px-6 dark:divide-slate-800">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex flex-col space-y-3 py-6 opacity-50">
            <div className="h-6 w-1/2 animate-pulse rounded bg-slate-300 dark:bg-slate-800" />

            <div className="flex gap-2">
              <div className="h-10 flex-1 animate-pulse rounded bg-slate-300 dark:bg-slate-800" />
              <div className="h-10 w-20 animate-pulse rounded bg-slate-300 dark:bg-slate-800" />
            </div>

            <div className="flex justify-evenly py-6">
              <div className="flex w-1/3 flex-col items-center gap-3">
                <div className="h-4 w-2/3 animate-pulse rounded bg-slate-300 dark:bg-slate-800" />
                <div className="h-8 w-full animate-pulse rounded bg-slate-300 dark:bg-slate-800" />
                <div className="h-8 w-full animate-pulse rounded bg-slate-300 dark:bg-slate-800" />
              </div>

              <div className="flex w-1/3 flex-col items-center gap-3">
                <div className="h-4 w-2/3 animate-pulse rounded bg-slate-300 dark:bg-slate-800" />
                <div className="h-8 w-full animate-pulse rounded bg-slate-300 dark:bg-slate-800" />
                <div className="h-8 w-full animate-pulse rounded bg-slate-300 dark:bg-slate-800" />
              </div>
            </div>

            <div className="flex items-center justify-center text-slate-500/85 dark:text-slate-400">
              <div className="flex h-10 w-1/2 animate-pulse rounded-lg bg-slate-300 dark:bg-slate-800" />
            </div>
          </div>
        ))}
      </main>

      <footer className="fixed inset-x-0 bottom-0 flex items-center justify-between border-t border-slate-300/80 bg-white px-6 pb-6 pt-2 dark:border-slate-800 dark:bg-slate-950">
        <div className="flex gap-4 opacity-50">
          <div className="h-10 w-10 animate-pulse rounded-full bg-slate-300 dark:bg-slate-800" />
          <div className="h-10 w-10 animate-pulse rounded-full bg-slate-300 dark:bg-slate-800" />
        </div>

        <div className="h-10 w-24 animate-pulse rounded-full bg-slate-300 opacity-50 dark:bg-slate-800" />
      </footer>
    </>
  );
};

export const LoadingEditWorkoutPageSkeleton = () => {
  return (
    <>
      <main className="mt-safe-top px-8 py-4 pb-[89px] pt-[158px]">
        <div className="space-y-4">
          <div className="space-y-2 px-4">
            <div className="h-4 w-20 animate-pulse bg-slate-200 dark:bg-slate-900" />
            <div className="h-10 animate-pulse rounded-md bg-slate-200 dark:bg-slate-900" />
          </div>

          <div className="space-y-2 px-4">
            <div className="h-4 w-32 animate-pulse bg-slate-200 dark:bg-slate-900" />
            <div className="h-10 animate-pulse rounded-md bg-slate-200 dark:bg-slate-900" />
          </div>

          <div className="space-y-4 px-2 pb-2 pt-6">
            {[1, 2, 3, 4].map((skeleton) => (
              <div
                key={skeleton}
                className="animate-pulse rounded-lg bg-slate-200 p-4 dark:bg-slate-900"
              >
                <div className="flex items-center gap-2 border-b border-slate-300 pb-3 dark:border-slate-700/70 [&>*:nth-child(2)]:mr-auto">
                  <div className="h-[26px] w-[36px] rounded-md bg-slate-300 dark:bg-slate-800" />
                  <div className="h-[26px] w-[70px] rounded-md bg-slate-300 dark:bg-slate-800" />
                  <div className="h-[26px] w-[36px] rounded-md bg-slate-300 dark:bg-slate-800" />
                  <div className="h-[26px] w-[36px] rounded-md bg-slate-300 dark:bg-slate-800" />
                </div>

                <div className="flex justify-center gap-4 divide-x divide-slate-300 p-4 dark:divide-slate-700/70">
                  <div className="flex flex-col gap-3">
                    <div className="h-5 w-12 rounded-lg bg-slate-300 dark:bg-slate-800" />
                    <div className="h-5 w-12 rounded-lg bg-slate-300 dark:bg-slate-800" />
                  </div>
                  <div className="flex flex-col gap-3 pl-4">
                    <div className="h-5 w-12 rounded-lg bg-slate-300 dark:bg-slate-800" />
                    <div className="h-5 w-12 rounded-lg bg-slate-300 dark:bg-slate-800" />
                  </div>
                </div>

                <div className="border-t border-slate-300 pt-3 dark:border-slate-700/70">
                  <div className="h-[26px] w-[140px] rounded-md bg-slate-300 dark:bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <fieldset className="group fixed inset-x-0 bottom-0 border-t border-slate-300/80 bg-white px-6 pb-6 pt-2 dark:border-slate-800 dark:bg-slate-900">
        <footer className="flex items-center justify-between opacity-70">
          <div className="rounded-full p-1.5 text-violet-400 active:bg-slate-200 dark:text-violet-400 dark:active:bg-slate-700">
            <AddIcon size={26} strokeWidth={2} />
          </div>

          <div className="rounded-lg px-3 py-1.5 text-xl font-extrabold text-green-500 active:scale-95 active:bg-slate-200 dark:active:bg-slate-700">
            Save
          </div>
        </footer>
      </fieldset>
    </>
  );
};
