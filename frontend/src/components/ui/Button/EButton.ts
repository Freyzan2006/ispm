

export enum EButton {
    RED = "transition hover:scale-105 rounded-2xl pl-4 pr-4 pt-2 pb-2 bg-red-600 shadow-lg shadow-red-500/50 flex justify-center items-center gap-3 text-black dark:text-white",
    YELLOW = "transition hover:scale-105 rounded-2xl pl-4 pr-4 pt-2 pb-2 bg-yellow-500 shadow-lg shadow-yellow-500/50 flex justify-center items-center gap-3 text-black dark:text-white",
    GREEN = "transition hover:scale-105 rounded-2xl pl-4 pr-4 pt-2 pb-2 bg-green-500 shadow-lg shadow-green-500/50 flex justify-center items-center gap-3 text-black dark:text-white",
    BLUE = "transition hover:scale-105 rounded-2xl pl-4 pr-4 pt-2 pb-2 bg-sky-500 shadow-lg shadow-sky-500/50 flex justify-center items-center gap-3 text-black dark:text-white",

    IS_ACTIVE = "disabled:bg-red-800 disabled:shadow-red-500/50 transition disabled:hover:scale-100 hover:scale-105 rounded-2xl pl-4 pr-4 pt-2 pb-2 bg-green-500 shadow-lg shadow-green-500/50 flex justify-center items-center text-black dark:text-white gap-3",
    NO_STYLE = ""
}

export enum ITypeBtn {
    SUBMIT = "submit",
    RESET = "reset",
    BUTTON = "button",
}

