import { useBoolean } from "../hooks/useBoolean";
import ReactDOM from "react-dom";
import ModalTask from "./Modals/ModalRTask";
import { useState } from "react";
import { useDataStore } from "../store/state";
import ModalDeleteBoard from "./Modals/ModalDelete";
import ModalCUTask from "./Modals/ModalCUTask";
import { motion } from "framer-motion";

function BoardColumn({ column }) {
    const [isOpenModalTask, setOpenModalTask] = useBoolean();
    const [currentTask, setCurrentTask] = useState([]);
    const [isOpenModalDelete, setOpenModalDelete] = useBoolean();
    const [isOpenModalCUTask, setModalCUTask] = useBoolean();

    const { data, selectedBoard } = useDataStore();

    const handleCurrentTask = (task) => {
        setCurrentTask((currentTask) => task);
    };

    const currentBoardColumns = data[selectedBoard].columns.map((column) => {
        return { name: column.name, id: column.id };
    });

    return (
        <>
            <section className="row min-w-[280px] max-w-[280px]  box-content flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                    <span
                        style={{ background: `${column.color}` }}
                        className="w-4 h-4 rounded-full inline-block"
                    ></span>
                    <h3 className="uppercase text-medium-grey text-sm font-bold">
                        {column.name} ({column.tasks.length})
                    </h3>
                </div>
                <div>
                    <ul className="flex flex-col gap-5">
                        {column.tasks.map((task) => {
                            return (
                                <Task
                                    key={task.id}
                                    task={task}
                                    onHandleCurrentTask={handleCurrentTask}
                                    onHandleOpenModalTask={setOpenModalTask}
                                />
                            );
                        })}
                    </ul>
                </div>
                <div className="h-full mt-5"></div>
            </section>
            {isOpenModalTask &&
                ReactDOM.createPortal(
                    <ModalTask
                        onClose={setOpenModalTask}
                        currentTask={currentTask}
                        currentBoardColumns={currentBoardColumns}
                        currentColumnName={column.name}
                        setOpenModalDelete={setOpenModalDelete}
                        setModalCUTask={setModalCUTask}
                    />,
                    document.body
                )}
            {isOpenModalDelete &&
                ReactDOM.createPortal(
                    <ModalDeleteBoard
                        onHandleClose={setOpenModalDelete}
                        current={currentTask}
                        whatIsIt={"task"}
                    />,
                    document.body
                )}
            {isOpenModalCUTask &&
                ReactDOM.createPortal(
                    <ModalCUTask
                        onHandleClose={setModalCUTask}
                        currentBoardColumns={currentBoardColumns}
                        task={currentTask}
                    />,
                    document.body
                )}
        </>
    );
}

function Task({ task, onHandleOpenModalTask, onHandleCurrentTask }) {
    const variants = {
        // visible: { scale: 1 },
        // hidden: { scale: 0.5 },
        visible: { y: "0%" },
        hidden: { y: "-50%" },
    };
    return (
        <motion.li
            transition={{
                ease: "easeOut",
                duration: 0.5,
            }}
            initial="hidden"
            animate="visible"
            variants={variants}
            whileHover={{ rotate: -5 }}
            key={task.id}
            className="relative bg-white dark:bg-dark-grey bg p-4 rounded-md shadow-task hover:cursor-pointer group"
            onClick={() => {
                onHandleOpenModalTask();
                onHandleCurrentTask(task);
            }}
        >
            <h4 className="font-bold text-black dark:text-white group-hover:text-main-purple transition-all duration-150 ease-in-out">
                {task.title}
            </h4>
            {task.is_completed && (
                <div className="absolute bottom-2 right-3 w-[22px] h-[22px] text-green-400">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-.997-4L6.76 11.757l1.414-1.414 2.829 2.829 5.657-5.657 1.414 1.414L11.003 16z"></path>
                    </svg>
                </div>
            )}
            <span className="text-sm font-bold text-medium-grey -mt-[5px]">
                {countCompletedSubtask(task.subtasks)} of {task.subtasks.length}{" "}
                subtasks
            </span>
        </motion.li>
    );
}

function countCompletedSubtask(subtasks) {
    let count = 0;

    subtasks.forEach((subtask) => {
        if (subtask.is_completed) {
            count++;
        }
    });
    return count;
}

export default BoardColumn;
