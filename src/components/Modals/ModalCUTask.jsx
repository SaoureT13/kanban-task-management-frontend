import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import Input from "../Input.jsx";
import { useDataStore } from "../../store/state.jsx";

const schema = yup.object().shape({
    title: yup.string().required("Can't be empty"),
    description: yup.string().optional(),
    board_column_id: yup.number().required().notOneOf(["", "select..."]),
    subtasks: yup.array().of(
        yup.object().shape({
            title: yup.string().required("Can't be empty"),
        })
    ),
});

function ModalNewTask({ onHandleClose, currentBoardColumns, task }) {
    const { createTask, updateTask } = useDataStore();

    const {
        control,
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            subtasks: task
                ? defaultTasks(task)
                : [{ title: "" }, { title: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "subtasks",
    });

    const onSubmit = async (data) => {
        if (task) {
            //Dans le cas où la modal est affiché pour modifier une tâche
            data.id = task.id;
            let newSubtasks = [];

            for (let i = 0; i < data.subtasks.length; i++) {
                if (i < task.subtasks.length) {
                    newSubtasks.push({
                        title: data.subtasks[i].title,
                        id: task.subtasks[i].id,
                    });
                } else {
                    newSubtasks.push({
                        title: data.subtasks[i].title,
                    });
                }
            }
            data.subtasks = newSubtasks;

            try {
                await updateTask(data);
            } catch (error) {
                console.error(error.message);
            }
        } else {
            //Dans le cas où la modal est affiché pour créer une tâche
            try {
                await createTask(data);
            } catch (error) {
                console.log(error.message);
            }
        }

        onHandleClose();
    };

    return (
        <div className="fixed min-w-full min-h-screen top-0 left-0 z-10">
            <div
                onClick={onHandleClose}
                className="hover:cursor-pointer absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50"
            ></div>
            <div className="absolute bottom-0 sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:translate-x-[-50%] sm:translate-y-[-50%] w-full sm:max-w-md rounded-md">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    action=""
                    className="bg-white dark:bg-very-dark-grey rounded-md p-6"
                >
                    <div>
                        <h4 className="text-xl text-black dark:text-white font-bold capitalize mb-6">
                            {task ? "Edit" : "Add New"} task
                        </h4>
                    </div>
                    <div className="mb-6">
                        <p className="text-medium-grey capitalize text-sm font-bold mb-2">
                            Title
                        </p>
                        <div className="relative h-10 w-full text-sm">
                            <input
                                type="text"
                                className={`h-full w-full border-[1px] p-3 rounded-md ring-0 outline-none focus:border-main-purple hover:border-main-purple dark:bg-dark-grey dark:text-white ${
                                    errors.title
                                        ? "border-red"
                                        : "border-lines-light dark:border-lines-dark"
                                } transition-all duration-300 ease-in-out`}
                                placeholder="e g. Task coffee break"
                                {...register("title")}
                                defaultValue={task ? task.title : ""}
                            />
                            {errors.title && (
                                <span className="absolute text-red right-2 top-1/2 translate-y-[-50%]">
                                    {errors.title?.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="mb-6">
                        <p className="text-medium-grey capitalize text-sm font-bold mb-2">
                            Description
                        </p>
                        <div className="h-24 w-full text-sm">
                            <textarea
                                className="h-full w-full border-[1px] bg-white dark:bg-dark-grey border-lines-light dark:border-lines-dark p-3 rounded-md resize-none ring-0 outline-none focus:border-main-purple hover:border-main-purple transition-all duration-300 ease-in-out"
                                placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little."
                                {...register("description")}
                                defaultValue={task ? task.description : ""}
                            ></textarea>
                        </div>
                    </div>

                    <div className="mb-6">
                        <p className="text-medium-grey capitalize text-sm font-bold mb-2">
                            Subtasks
                        </p>
                        <div className="inputs-box flex flex-col gap-4 max-h-[280px] overflow-auto text-sm">
                            {fields.map((field, index) => {
                                if (index == 0 || index == 1) {
                                    return (
                                        <Input
                                            key={field.id}
                                            index={index}
                                            errors={
                                                errors.subtasks
                                                    ? errors.subtasks
                                                    : ""
                                            }
                                            register={register}
                                            name={"subtasks"}
                                            plholder={"e g. Make coffee"}
                                            description={"title"}
                                        />
                                    );
                                }

                                return (
                                    <Input
                                        key={field.id}
                                        index={index}
                                        errors={
                                            errors.subtasks
                                                ? errors.subtasks
                                                : ""
                                        }
                                        register={register}
                                        name={"subtasks"}
                                        plholder={"e g. WebDesign"}
                                        onRemove={remove}
                                        description={"title"}
                                    />
                                );
                            })}
                        </div>

                        <button
                            type="button"
                            onClick={() => append({ title: "" })}
                            className="bg-light-grey w-full py-2 rounded-full text-main-purple capitalize hover:bg-main-purple-light hover:text-white font-bold mt-4 flex justify-center items-center gap-2 transition-all duration-150 ease-in-out"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                fill="currentColor"
                            >
                                <path d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"></path>
                            </svg>
                            <span>Add New SubTask</span>
                        </button>
                    </div>

                    <div className="mb-4">
                        <p className="text-medium-grey text-sm font-bold mb-2 capitalize">
                            status
                        </p>
                        <div className="h-10 w-full text-sm">
                            <select
                                className="h-full w-full border-[1px] text-very-dark-grey font-bold capitalize hover:cursor-pointer bg-white dark:bg-dark-grey dark:text-white ring-0 outline-none focus:border-main-purple hover:border-main-purple transition-all duration-300 ease-in-out border-lines-light dark:border-lines-dark p-3 rounded-md"
                                {...register("board_column_id")}
                                defaultValue={task ? task.board_column : ""}
                            >
                                {currentBoardColumns.map((column) => {
                                    return (
                                        <option
                                            key={column.id}
                                            value={column.id}
                                        >
                                            {column.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="bg-main-purple w-full py-2 rounded-full text-white capitalize hover:bg-main-purple-light font-bold mt-4 transition-all duration-300 ease-in-out"
                    >
                        {task ? "edit" : "Create New"} Task
                    </button>
                </form>
            </div>
        </div>
    );
}

function defaultTasks(tasks) {
    const subtasks = [];
    for (let subtask of tasks.subtasks) {
        subtasks.push({
            title: subtask.title,
        });
    }

    return subtasks;
}

export default ModalNewTask;
