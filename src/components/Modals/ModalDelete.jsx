import { useDataStore } from "../../store/state";

function ModalDeleteBoard({ onHandleClose, current, whatIsIt }) {
    const { deleteBoard, deleteTask } = useDataStore();

    const handleDelete = (id) => {
        if (whatIsIt == "board") {
            deleteBoard(id);
        }
        if (whatIsIt == "task") {
            deleteTask(id);
        }
        onHandleClose();
    };

    const handleCancel = () => {
        onHandleClose();
    };

    return (
        <div className="fixed min-w-full min-h-screen top-0 left-0 z-10">
            <div
                onClick={onHandleClose}
                className="hover:cursor-pointer absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50"
            ></div>
            <div className="absolute -bottom-1 sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:translate-x-[-50%] sm:translate-y-[-50%] w-full sm:max-w-md bg-white dark:bg-very-dark-grey rounded-md">
                <div className="rounded-md p-6 flex flex-col gap-4">
                    <div>
                        <h3 className="text-2xl text-red font-bold">
                            Delete this {whatIsIt} ?
                        </h3>
                    </div>
                    <div>
                        {whatIsIt === "board" ? (
                            <p className="text-sm font-bold text-medium-grey">
                                Are you sure you want to delete the "
                                {current.name}" board ? This action will remove
                                all columns and tasks and cannot be reversed.
                            </p>
                        ) : (
                            <p className="text-sm font-bold text-medium-grey">
                                Are you sure you want to delete the "
                                {current.title}" task and its subtasks? This
                                action cannot be reversed.
                            </p>
                        )}
                    </div>
                    <div className="flex justify-between items-center gap-8">
                        <button
                            onClick={() => handleDelete(current.id)}
                            className="p-2 bg-red hover:bg-red-light text-white capitalize font-bold rounded-full w-1/2 transition-all duration-150 ease-in-out"
                        >
                            Delete
                        </button>
                        <button
                            onClick={handleCancel}
                            className="p-2 bg-light-grey text-blue-500 hover:text-opacity-50 text-base capitalize font-bold rounded-full w-1/2"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalDeleteBoard;
