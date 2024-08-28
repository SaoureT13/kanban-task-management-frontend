import { useEffect } from "react";
import { useBoolean } from "../../hooks/useBoolean";
import { useDataStore } from "../../store/state";

function ModalMenu({
    onHandleClose,
    onOpenModalNewBoard,
    boardNames,
    isDarkMode,
    onHandleThemeToggle,
}) {
    const { changeSelectedBoard, data, selectedBoard } = useDataStore();
    // useEffect(() => {
    //     const html = document.documentElement;
    //     if (checked) {
    //         html.classList.add("dark");
    //     } else {
    //         html.classList.remove("dark");
    //     }
    // }, [checked]);

    return (
        <div className="fixed min-w-full min-h-screen top-0 left-0 z-10">
            <div
                onClick={onHandleClose}
                className="hover:cursor-pointer absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50"
            ></div>
            <div className="flex flex-col absolute bottom-0 sm:top-1/2 sm:left-1/2 sm:translate-x-[-50%] sm:translate-y-[-50%] p-6 rounded-md w-full max-w-[665px] min-h-[468px] max-h-[645px] bg-white dark:bg-very-dark-grey">
                <div>
                    <div className="flex justify-between items-center">
                        <h3 className="uppercase font-bold text-lg text-medium-grey">
                            All boards ({boardNames.length})
                        </h3>

                        <div className="flex gap-4 items-center text-medium-grey">
                            <button
                                onClick={() => {
                                    () => alert("hello");
                                    if (!isDarkMode) {
                                        return;
                                    } else {
                                        onHandleThemeToggle();
                                    }
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="19"
                                    height="19"
                                    fill="currentColor"
                                >
                                    <path d="M9.167 15.833a.833.833 0 01.833.834v.833a.833.833 0 01-1.667 0v-.833a.833.833 0 01.834-.834zM3.75 13.75a.833.833 0 01.59 1.422l-1.25 1.25a.833.833 0 01-1.18-1.178l1.25-1.25a.833.833 0 01.59-.244zm10.833 0c.221 0 .433.088.59.244l1.25 1.25a.833.833 0 01-1.179 1.178l-1.25-1.25a.833.833 0 01.59-1.422zM9.167 5a4.167 4.167 0 110 8.334 4.167 4.167 0 010-8.334zm-7.5 3.333a.833.833 0 010 1.667H.833a.833.833 0 110-1.667h.834zm15.833 0a.833.833 0 010 1.667h-.833a.833.833 0 010-1.667h.833zm-1.667-6.666a.833.833 0 01.59 1.422l-1.25 1.25a.833.833 0 11-1.179-1.178l1.25-1.25a.833.833 0 01.59-.244zm-13.333 0c.221 0 .433.088.59.244l1.25 1.25a.833.833 0 01-1.18 1.178L1.91 3.09a.833.833 0 01.59-1.422zM9.167 0A.833.833 0 0110 .833v.834a.833.833 0 11-1.667 0V.833A.833.833 0 019.167 0z"></path>
                                </svg>
                            </button>
                            <label
                                htmlFor="toggleCheckbox"
                                className="relative w-10 bg-main-purple rounded-xl h-[22px] cursor-pointer"
                                onClick={onHandleThemeToggle}
                            >
                                <input
                                    type="checkbox"
                                    id="toggleCheckbox"
                                    className="absolute top-0 bottom-0 left-0 right-0 opacity-0 z-10 cursor-pointer"
                                    checked={isDarkMode}
                                />
                                <span
                                    className={`z-8 bg-white h-[15px] w-[15px] top-1/2 translate-y-[-50%] rounded-full absolute ${
                                        isDarkMode
                                            ? "translate-x-5"
                                            : "translate-x-1"
                                    } inline-block transition-all duration-300 ease-in-out`}
                                ></span>
                            </label>
                            <button
                                onClick={() => {
                                    if (isDarkMode) {
                                        return;
                                    } else {
                                        onHandleThemeToggle();
                                    }
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                >
                                    <path d="M6.474.682c.434-.11.718.406.481.78A6.067 6.067 0 006.01 4.72c0 3.418 2.827 6.187 6.314 6.187.89.002 1.77-.182 2.584-.54.408-.18.894.165.724.57-1.16 2.775-3.944 4.73-7.194 4.73-4.292 0-7.771-3.41-7.771-7.615 0-3.541 2.466-6.518 5.807-7.37zm8.433.07c.442-.294.969.232.674.674l-.525.787a1.943 1.943 0 000 2.157l.525.788c.295.441-.232.968-.674.673l-.787-.525a1.943 1.943 0 00-2.157 0l-.786.525c-.442.295-.97-.232-.675-.673l.525-.788a1.943 1.943 0 000-2.157l-.525-.787c-.295-.442.232-.968.674-.673l.787.525a1.943 1.943 0 002.157 0z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div>
                        <ul className="my-6 flex flex-col gap-2">
                            {boardNames.map((board, i) => {
                                return (
                                    <li
                                        key={i}
                                        onClick={() =>
                                            changeSelectedBoard(board)
                                        }
                                        className={`px-6 py-3 w-11/12 font-bold rounded-tr-full rounded-br-full hover:cursor-pointer flex items-center gap-4 ${
                                            data[selectedBoard].name == board
                                                ? "bg-main-purple text-white"
                                                : "hover:bg-main-purple/10 hover:text-main-purple text-medium-grey"
                                        } transition-all duration-300 ease-in-out`}
                                    >
                                        <div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                            >
                                                <path d="M0 2.889A2.889 2.889 0 012.889 0H13.11A2.889 2.889 0 0116 2.889V13.11A2.888 2.888 0 0113.111 16H2.89A2.889 2.889 0 010 13.111V2.89zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333zm8.445-1.333V1.333h-6.89A1.556 1.556 0 001.334 2.89v4.22h8.445zm4.889-1.333H11.11v4.444h3.556V5.778zm0 5.778H11.11v3.11h2a1.556 1.556 0 001.556-1.555v-1.555zm0-7.112V2.89a1.555 1.555 0 00-1.556-1.556h-2v3.111h3.556z"></path>
                                            </svg>
                                        </div>
                                        <span>{board}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
                <div className="mt-auto">
                    <button
                        onClick={() => {
                            onOpenModalNewBoard();
                            onHandleClose();
                        }}
                        className="py-3 w-full font-bold rounded-md bg-light-grey dark:bg-dark-grey text-main-purple flex items-center justify-center gap-4 cursor-pointer transition-all duration-150 ease-in-out capitalize"
                    >
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                fill="currentColor"
                            >
                                <path d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"></path>
                            </svg>
                        </span>
                        <span>Create New board</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalMenu;
