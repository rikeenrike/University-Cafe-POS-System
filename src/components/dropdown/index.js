export default {
  root: ({ props, state }) => ({
    class: [
      // Display and Position
      "inline-flex",
      "relative",

      // Shape
      "rounded-xl",

      // Color and Background
      "bg-offwhite",

      // Invalid State
      { "border-red-500 dark:border-red-400": props.invalid },

      // Transitions
      "transition-all",
      "duration-200",

      // States
      {
        "hover:border-primary-500 dark:hover:border-primary-300":
          !props.invalid,
      },
      {
        "outline-none outline-offset-0 ring-none": state.focused,
      },

      // Misc
      "cursor-pointer",
      "select-none",
      {
        "opacity-60": props.disabled,
        "pointer-events-none": props.disabled,
        "cursor-default": props.disabled,
      },
    ],
  }),
  input: ({ props }) => ({
    class: [
      //Font
      "font-sora font-bold text-[16px] ",
      "leading-none",

      // Display
      "block",
      "flex-auto",

      // Color and Background
      "bg-transparent",
      "border-0",
      {
        "text-black": props.modelValue != undefined,
        "text-black": props.modelValue == undefined,
      },
      "placeholder:text-black",

      // Sizing and Spacing
      "w-[1%] h-[53px]",
      "flex items-center justify-start mx-[20px]",
      { "pr-7": props.showClear },

      //Shape
      "rounded-none",

      // Transitions
      "transition",
      "duration-200",

      // States
      "focus:outline-none focus:shadow-none",

      // Misc
      "relative",
      "cursor-pointer",
      "overflow-hidden overflow-ellipsis",
      "whitespace-nowrap",
      "appearance-none",
    ],
  }),
  trigger: {
    class: [
      // Flexbox
      "flex items-center justify-center",
      "shrink-0",

      // Color and Background
      "bg-transparent",
      "text-black",

      // Size
      "w-12",

      // Shape
      "rounded-tr-md",
      "rounded-br-md",
    ],
  },
  panel: {
    class: [
      // Position
      "absolute top-0 left-0",

      // Shape
      "rounded-xl shadow-lg",

      // Color
      "bg-offwhite",
      "text-black",
    ],
  },
  wrapper: {
    class: [
      // Sizing
      "max-h-[200px]",

      // Misc
      "overflow-auto",
    ],
  },
  list: {
    class: "py-3 list-none m-0",
  },
  item: ({ context }) => ({
    class: [
      // Font
      "font-sora",
      "leading-none",

      // Position
      "relative ",

      // Shape
      "border-0",
      "rounded-none",

      // Spacing
      "m-0",
      "py-4 px-5",

      // Color
      {
        "text-black":
          !context.focused && !context.selected && !context.disabled,
      },
      {
        "text-black ":
          !context.focused && !context.selected && context.disabled,
      },
      {
        "text-black font-black": context.focused && !context.selected,
      },
      {
        "text-black font-black ": context.focused && context.selected,
      },
      {
        "text-black ": !context.focused && context.selected,
      },

      //States
      {
        "hover:text-regular dark:hover:bg-surface-600/80":
          !context.focused && !context.selected,
      },
      {
        "hover:text-black font-bold": context.focused && !context.selected,
      },
      "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring focus-visible:ring-inset focus-visible:ring-primary-400/50 dark:focus-visible:ring-primary-300/50",

      // Transitions
      "transition-shadow",
      "duration-200",

      // Misc
      { "pointer-events-none cursor-default": context.disabled },
      { "cursor-pointer": !context.disabled },
      "overflow-hidden",
      "whitespace-nowrap",
    ],
  }),
  itemgroup: {
    class: [
      //Font
      "font-bold",

      // Spacing
      "m-0",
      "py-3 px-5",

      // Color
      "text-black",
      "bg-surface-0 dark:bg-surface-600/80",

      // Misc
      "cursor-auto",
    ],
  },
  emptymessage: {
    class: [
      // Font
      "leading-none",

      // Spacing
      "py-3 px-5",

      // Color
      "text-surface-800 dark:text-white/80",
      "bg-transparent",
    ],
  },
  header: {
    class: [
      // Spacing
      "py-3 px-5",
      "m-0",

      //Shape
      "border-b",
      "rounded-tl-md",
      "rounded-tr-md",

      // Color
      "text-surface-700 dark:text-white/80",
      "bg-surface-100 dark:bg-surface-800",
      "border-surface-300 dark:border-surface-700",
    ],
  },
  filtercontainer: {
    class: "relative",
  },
  filterinput: {
    class: [
      // Font
      "font-sans",
      "leading-none",

      // Sizing
      "pr-7 py-3 px-3",
      "-mr-7",
      "w-full",

      //Color
      "text-surface-700 dark:text-white/80",
      "bg-surface-0 dark:bg-surface-900",
      "border-surface-200 dark:border-surface-700",

      // Shape
      "border",
      "rounded-lg",
      "appearance-none",

      // Transitions
      "transition",
      "duration-200",

      // States
      "hover:border-primary-500 dark:hover:border-primary-300",
      "focus:ring focus:outline-none focus:outline-offset-0",
      "focus:ring-primary-400/50 dark:focus:ring-primary-300/50",

      // Misc
      "appearance-none",
    ],
  },
  filtericon: {
    class: ["absolute", "top-1/2 right-3", "-mt-2"],
  },
  clearicon: {
    class: [
      // Color
      "text-surface-500",

      // Position
      "absolute",
      "top-1/2",
      "right-12",

      // Spacing
      "-mt-2",
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
