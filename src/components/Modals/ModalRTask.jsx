import { useRef, useState } from "react";
import { useBoolean } from "../../hooks/useBoolean";
import { useDataStore } from "../../store/state";
import ModalDeleteBoard from "./ModalDelete";
import ReactDOM from "react-dom";

function ModalTask({
    onClose,
    currentTask,
    currentBoardColumns,
    currentColumnName,
    setOpenModalDelete,
    setModalCUTask,
}) {
    const [IsShowDrop, setShowDrop] = useBoolean();
    const [show, setShow] = useBoolean();
    const [currentColumn, setCurrentColumn] = useState(currentColumnName);
    const currentHeight = useRef();

    const { changeTaskColumn } = useDataStore();

    const handleCurrentState = (text) => {
        setCurrentColumn(text);
    };

    const handleChangeTaskColumn = async (taskId, columnId) => {
        try {
            await changeTaskColumn(taskId, columnId);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="modal-task fixed min-w-full min-h-screen top-0 left-0 z-10">
                <div
                    onClick={onClose}
                    className="hover:cursor-pointer absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50"
                ></div>
                <div className="absolute -bottom-1 sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:translate-x-[-50%] sm:translate-y-[-50%] w-full sm:max-w-lg bg-white dark:bg-very-dark-grey rounded-md">
                    <div className="p-6 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-xl text-black dark:text-white">
                                {currentTask.title}
                            </h3>
                            <div
                                onClick={setShowDrop}
                                className="relative px-4 py-2  hover:cursor-pointer hover:bg-light-grey dark:hover:bg-dark-grey rounded-md transition-all duration-150 ease-in-out"
                            >
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="5"
                                        height="20"
                                        className="fill-medium-grey"
                                    >
                                        <g fillRule="evenodd">
                                            <circle
                                                cx="2.308"
                                                cy="2.308"
                                                r="2.308"
                                            ></circle>
                                            <circle
                                                cx="2.308"
                                                cy="10"
                                                r="2.308"
                                            ></circle>
                                            <circle
                                                cx="2.308"
                                                cy="17.692"
                                                r="2.308"
                                            ></circle>
                                        </g>
                                    </svg>
                                </div>
                                {IsShowDrop && (
                                    <div className="absolute top-6 right-1 z-10">
                                        <div className="flex flex-col w-36 shadow-task bg-white dark:bg-dark-grey rounded-md">
                                            <button
                                                onClick={() => {
                                                    setModalCUTask();
                                                    setShowDrop();
                                                }}
                                                className="p-3 text-left hover:text-medium-grey font-bold text-sm text-very-dark-grey dark:text-white transition-all duration-300 ease-in-out"
                                            >
                                                Edit Task
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setOpenModalDelete();
                                                    setShowDrop();
                                                    onClose();
                                                }}
                                                className="p-3 text-left text-red font-bold text-sm"
                                            >
                                                Delete Task
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {currentTask.description && (
                            <div>
                                <p className="text-md font-bold text-medium-grey">
                                    {currentTask.description}
                                </p>
                            </div>
                        )}
                        <div>
                            <h4 className="font-bold mb-2 text-medium-grey">
                                Subtasks ({currentTask.subtasks.length})
                            </h4>
                            <div className="flex flex-col gap-2">
                                {currentTask.subtasks.map((subtask) => (
                                    <Subtask
                                        key={subtask.id}
                                        subtask={subtask}
                                    />
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-medium-grey text-sm font-bold mb-2">
                                Status
                            </p>
                            <div className="w-full text-sm">
                                <button
                                    onClick={setShow}
                                    className={`w-full flex justify-between items-center rounded-md p-3 border-[2px] text-very-dark-grey font-bold capitalize hover:cursor-pointer bg-white  dark:bg-dark-grey dark:text-white dark:border-lines-dark hover:border-main-purple outline-[1px] outline-main-purple border-lines-light transition-all duration-300 ease-in-out ${
                                        show
                                            ? "border-main-purple dark:border-main-purple"
                                            : ""
                                    }`}
                                >
                                    <span>{currentColumn}</span>
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="10"
                                            height="7"
                                        >
                                            <path
                                                fill="none"
                                                stroke="#635FC7"
                                                strokeWidth="2"
                                                d="M1 1l4 4 4-4"
                                            ></path>
                                        </svg>
                                    </span>
                                </button>

                                <div
                                    className="bg-white dark:bg-dark-grey w-full overflow-hidden transition-height duration-300 ease-in-out"
                                    ref={currentHeight}
                                    style={
                                        show
                                            ? {
                                                  height: currentHeight.current
                                                      .scrollHeight,
                                              }
                                            : { height: "0px" }
                                    }
                                >
                                    {currentBoardColumns.map((column) => {
                                        return (
                                            <button
                                                onClick={() => {
                                                    handleCurrentState(
                                                        column.name
                                                    );
                                                    setShow();
                                                    handleChangeTaskColumn(
                                                        currentTask.id,
                                                        column.id
                                                    );
                                                }}
                                                key={column.id}
                                                value={column.id}
                                                className="flex justify-between items-center text-left font-bold w-full p-2 text-medium-grey hover:bg-main-purple-light/10 hover:text-white transition-all duration-300 ease-in-out"
                                            >
                                                <span>{column.name}</span>
                                                {column.name ==
                                                    currentColumn && (
                                                    <span className="w-[14px] inline-block">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path d="M10 15.17l9.192-9.191 1.414 1.414L10 17.999l-6.364-6.364 1.414-1.414 4.95 4.95z"></path>
                                                        </svg>
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function Subtask({ subtask }) {
    const { updateCompletedSubTask } = useDataStore();
    const [checked, setChecked] = useBoolean(subtask.is_completed);
    const [isLoading, setIsLoading] = useState(false);
    const handleCheckedTask = async (subtaskID) => {
        setIsLoading(true);
        try {
            await updateCompletedSubTask(subtaskID);
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
        setChecked((v) => !v);
    };

    return (
        <div
            key={subtask.id}
            className="flex gap-4 w-full bg-light-grey hover:bg-main-purple-light dark:bg-dark-grey hover:dark:bg-main-purple p-4 rounded-md text-base text-black transition-all duration-150 ease-in-out"
        >
            <input
                type="checkbox"
                id={`subtask-${subtask.id}`}
                checked={checked}
                onChange={(e) => {
                    handleCheckedTask(subtask.id);
                    e.stopPropagation();
                }}
                className="w-6 cursor-pointer shrink-0"
            />
            <label
                htmlFor={`subtask-${subtask.id}`}
                className={`cursor-pointer dark:text-white transition-all duration-300 ease-in-out ${
                    checked
                        ? "line-through text-medium-grey dark:text-medium-grey font-bold"
                        : " "
                }`}
            >
                {subtask.title}
            </label>
            {isLoading && (
                <div role="status">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 dark:fill-white fill-dark-grey"
                        viewBox="0 0 100 101"
                    >
                        <path
                            fill="currentColor"
                            d="M100 50.59c0 27.615-22.386 50.001-50 50.001s-50-22.386-50-50 22.386-50 50-50 50 22.386 50 50zm-90.919 0c0 22.6 18.32 40.92 40.919 40.92 22.599 0 40.919-18.32 40.919-40.92 0-22.598-18.32-40.918-40.919-40.918-22.599 0-40.919 18.32-40.919 40.919z"
                        ></path>
                        <path
                            fill="currentFill"
                            d="M93.968 39.04c2.425-.636 3.894-3.128 3.04-5.486A50 50 0 0041.735 1.279c-2.474.414-3.922 2.919-3.285 5.344.637 2.426 3.12 3.849 5.6 3.484a40.916 40.916 0 0144.131 25.769c.902 2.34 3.361 3.802 5.787 3.165z"
                        ></path>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            )}
        </div>
    );
}

export default ModalTask;
