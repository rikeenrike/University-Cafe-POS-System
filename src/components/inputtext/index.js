export default {
  root: ({ props, context, parent }) => ({
    class: [
      // Font
      "font-sora font-semibold leading-none",

      // Flex
      { "flex-1": parent.instance.$name == "InputGroup" },

      // Width
      { "w-[100%]": true },

      {
        "px-4 py-4": props.size == "large",
        "px-2 py-2": props.size == "small",
        "p-3": props.size == null,
      },

      // Shape
      { "rounded-xl": parent.instance.$name !== "InputGroup" },
      {
        "first:rounded-l-md rounded-none last:rounded-r-md":
          parent.instance.$name == "InputGroup",
      },
      {
        "border-0 border-y border-l last:border-r":
          parent.instance.$name == "InputGroup",
      },
      {
        "first:ml-0 ml-[-1px]":
          parent.instance.$name == "InputGroup" && !props.showButtons,
      },

      // Colors
      "text-lightgrey dark:text-surface-200",
      "placeholder:text-lightgrey",
      "bg-offwhite dark:bg-surface-900",

      // Invalid State
      { "border-red-500 dark:border-red-400": props.invalid },

      // States
      {
        "hover:border-primary-500 dark:hover:border-primary-400":
          !context.disabled && !props.invalid,
        "focus:outline-none focus:outline-offset-0 focus:ring-0 focus:ring-primary-500/50 dark:focus:ring-primary-400/50 focus:z-10":
          !context.disabled,
        "opacity-60 select-none pointer-events-none cursor-default":
          context.disabled,
      },

      // Filled State *for FloatLabel
      { filled: parent.instance?.$name == "FloatLabel" && context.filled },

      // Misc
      "appearance-none",
      "transition-colors duration-200",
    ],
  }),
};
