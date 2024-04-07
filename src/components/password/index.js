export default {
    root: ({ props }) => ({
        class: [
            'flex w-full',
            'font-sora font-semibold leading-none',
            {
                'opacity-60 select-none pointer-events-none cursor-default': props.disabled
            }

        ]
    }),
    panel: {
        class: [
            // Spacing
            'p-5',

            // Shape
            'border-0 dark:border',
            'shadow-md rounded-md',

            // Colors
            'bg-offwhite',
            'text-black',
            'dark:border-surface-700'
        ]
    },
    meter: {
        class: [
            // Position and Overflow
            'overflow-hidden',
            'relative',

            // Shape and Size
            'border-0',
            'h-2',

            // Spacing
            'mb-2',

            // Colors
            'bg-offwhite'
        ]
    },
    meterlabel: ({ instance }) => ({
        class: [
            // Size
            '',
            // Colors
            {
                'bg-red-500 dark:bg-red-400/50': instance?.meter?.strength == 'weak',
                'bg-orange-500 dark:bg-orange-400/50': instance?.meter?.strength == 'medium',
                'bg-green-500 dark:bg-green-400/50': instance?.meter?.strength == 'strong'
            },

            // Transitions
            'transition-all duration-1000 ease-in-out'
        ]
    }),
    showicon: {
        class: ['absolute top-1/2 right-3 -mt-2', 'text-darkgrey']
    },
    hideicon: {
        class: ['absolute top-1/2 right-3 -mt-2', 'text-lightgrey']
    },
    input: {
        root: ({ props, context, parent }) => ({
            class: [
                // Font
                'font-sans leading-none w-full',

                // Flex
                { 'flex-1': parent.instance.$name == 'InputGroup' },

                // Spacing
                'm-0',
                {
                    'px-4 py-4': props.size == 'large',
                    'px-2 py-2': props.size == 'small',
                    'p-3': props.size == null
                },

                // Shape
                { 'rounded-xl': parent.instance.$name !== 'InputGroup' },
                { 'first:rounded-l-md rounded-none last:rounded-r-md': parent.instance.$name == 'InputGroup' },
                { 'border-0 border-y border-l last:border-r': parent.instance.$name == 'InputGroup' },
                { 'first:ml-0 ml-[-1px]': parent.instance.$name == 'InputGroup' && !props.showButtons },

                // Colors
                'text-black',
                'placeholder:text-lightgrey dark:placeholder:text-lightgrey',
                'bg-offwhite',

                // Invalid State
                { 'border-red-500 dark:border-red-400': parent.props.invalid },

                // States
                {
                    'hover:border-primary-500 dark:hover:border-primary-400': !context.disabled && !parent.props.invalid,
                    'focus:outline-none  focus:z-10': !context.disabled,
                    'opacity-60 select-none pointer-events-none cursor-default': context.disabled
                },

                // Misc
                'appearance-none',
                'transition-colors duration-200'
            ]
        })
    },
    transition: {
        enterFromClass: 'opacity-0 scale-y-[0.8]',
        enterActiveClass: 'transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]',
        leaveActiveClass: 'transition-opacity duration-100 ease-linear',
        leaveToClass: 'opacity-0'
    }
};
