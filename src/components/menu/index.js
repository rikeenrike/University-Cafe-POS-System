export default {
  root: {
    class: [
      // Sizing and Shape
      "min-w-[1]",
      "rounded-lg",
      // Spacing
      "py-2",
      // Colors
      "text-black",
      "border border-surface-200",
      "bg-white",
    ],
  },
  menu: {
    class: [
      // Spacings and Shape
      "list-none",
      "m-0",
      "p-0",
      "outline-none",
    ],
  },

  content: ({ context }) => ({
    class: [
      //Shape
      "rounded-none",
      // Colors
      "text-black ",
      {
        "bg-surface-200 text-black": context.focused,
      },
      // Transitions
      "transition-shadow",
      "duration-200",
      // States
      "hover:text-surface-700 dark:hover:text-white/80",
      "hover:bg-surface-100 dark:bg-surface-700 dark:hover:bg-surface-400/10",
    ],
  }),
  action: {
    class: [
      "relative",
      // Flexbox

      "flex",
      "items-center",

      // Spacing
      "py-3",
      "px-5",

      // Color
      "text-black",

      // Misc
      "no-underline",
      "overflow-hidden",
      "cursor-pointer",
      "select-none",
    ],
  },
  icon: {
    class: [
      // Spacing
      "mr-2",

      // Color
      "text-black",
    ],
  },
  label: {
    class: ["leading-none font-sora text-[15px]"],
  },
  submenuheader: {
    class: [
      // Font
      "font-bold",
      // Spacing
      "m-0",
      "py-3 px-5",
      // Shape
      "rounded-tl-none",
      "rounded-tr-none",
      // Colors
      "bg-surface-0 dark:bg-surface-700",
      "text-black",
    ],
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass:
      "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0",
  },
};
