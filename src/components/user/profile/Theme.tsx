"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { twMerge } from "tailwind-merge";
import { Drawer } from "vaul";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  MoonIcon,
  SunIcon,
  SystemIcon,
  ThemeIcon,
} from "@/components/icons/theme";

const themeOptions = ["system", "dark", "light"] as const;
type ThemeOptionsType = (typeof themeOptions)[number];

export const Theme = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  function chooseTheme(option: ThemeOptionsType) {
    setTheme(option);
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <p className="font-manrope text-xl font-bold">Theme</p>
        {ThemeIcon}
      </div>

      {mounted ? (
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold italic text-slate-400 dark:text-slate-500">
            {theme}
          </p>
          <ChangeTheme theme={theme} chooseTheme={chooseTheme} />
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="h-8 w-14 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-20 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
        </div>
      )}
    </div>
  );
};

const ChangeTheme = ({
  theme,
  chooseTheme,
}: {
  theme: string | undefined;
  chooseTheme: (option: ThemeOptionsType) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root
      open={open}
      onOpenChange={setOpen}
      noBodyStyles
      disablePreventScroll
    >
      <button
        type="button"
        onClick={async () => {
          await new Promise((resolve) => setTimeout(resolve, 150));

          setOpen(true);
        }}
        className="rounded-lg px-3 py-1.5 text-sm text-violet-500 active:scale-95 active:bg-slate-200 dark:active:bg-slate-700"
      >
        Change
        <p className="sr-only">Change theme</p>
      </button>

      <Drawer.Portal>
        <Drawer.Overlay
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-20 bg-slate-700/45 backdrop-blur-sm data-[state=closed]:animate-overlay-hide data-[state=open]:animate-overlay-show dark:bg-slate-950/45"
        />

        <Drawer.Content
          aria-describedby={undefined}
          data-vaul-no-drag
          className="fixed inset-x-0 bottom-0 z-[9999] select-none space-y-4 px-4 pb-12 focus:outline-none"
        >
          <VisuallyHidden asChild>
            <Drawer.Title>Choose a theme</Drawer.Title>
          </VisuallyHidden>

          <div className="flex flex-col divide-y divide-slate-400/40 rounded-modal bg-white/90 text-center dark:divide-slate-600 dark:bg-slate-700/70">
            {themeOptions.map((value) => (
              <button
                key={value}
                onClick={async () => {
                  await new Promise((resolve) => setTimeout(resolve, 100));

                  chooseTheme(value);

                  setOpen(false);
                }}
                className={twMerge(
                  "flex items-center justify-center gap-6 p-3 font-manrope text-lg font-semibold text-blue-500 first:rounded-t-modal last:rounded-b-modal active:bg-slate-200 dark:border-slate-600 dark:text-blue-500 active:dark:bg-slate-600/90",
                  value === theme &&
                    "bg-white text-green-500 dark:bg-slate-900/50 dark:text-green-500",
                )}
              >
                {value}
                {value === "system"
                  ? SystemIcon
                  : value === "dark"
                    ? MoonIcon
                    : SunIcon}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={async () => {
              await new Promise((resolve) => setTimeout(resolve, 100));
              setOpen(false);
            }}
            className="w-full rounded-modal bg-white p-3 text-xl font-bold text-violet-500 focus:outline-none active:bg-slate-200 dark:bg-slate-700 dark:text-violet-400 active:dark:bg-slate-600/90"
          >
            Cancel
          </button>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};