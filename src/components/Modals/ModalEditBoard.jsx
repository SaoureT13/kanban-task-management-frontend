import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../Input.jsx";
import { useDataStore } from "../../store/state.jsx";

const schema = yup
    .object()
    .shape({
        name: yup.string().required("Can't be empty."),
        columns: yup
            .array()
            .of(
                yup.object().shape({
                    name: yup.string().required("Can't be empty."),
                })
            )
            .required(),
    })
    .required();

function ModalEditBoard({ onHandleClose, currentBoard }) {
    const { editBoard } = useDataStore();

    const columns = [];
    for (let column of currentBoard.columns) {
        columns.push({
            name: column.name,
        });
    }

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            columns: columns,
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "columns",
    });

    const onSubmit = (data) => {
        data.id = currentBoard.id;
        let newColumn = [];

        for (let i = 0; i < data.columns.length; i++) {
            if (i < currentBoard.columns.length) {
                newColumn.push({
                    name: data.columns[i].name,
                    id: currentBoard.columns[i].id,
                });
            } else {
                newColumn.push({
                    name: data.columns[i].name,
                });
            }
        }
        data.columns = newColumn;
        editBoard(data);
        onHandleClose()
    };

    return (
        <div className="fixed min-w-full min-h-screen top-0 left-0 z-10">
            <div
                onClick={onHandleClose}
                className="hover:cursor-pointer absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50"
            ></div>
            <div className="absolute bottom-0 sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:translate-x-[-50%] sm:translate-y-[-50%] w-full sm:max-w-md bg-white dark:bg-very-dark-grey rounded-md">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="rounded-md p-6"
                >
                    <div>
                        <h4 className="text-xl font-bold capitalize mb-6 text-black dark:text-white">
                            Edit Board
                        </h4>
                    </div>
                    <div className="mb-6">
                        <p className="text-medium-grey text-sm font-bold mb-2">
                            Board Name
                        </p>
                        <div className="relative h-10 w-full text-sm">
                            <input
                                type="text"
                                className={`h-full w-full border-[1px] p-3 rounded-md ring-0 outline-none focus:border-main-purple hover:border-main-purple dark:bg-dark-grey dark:text-white ${
                                    errors.name
                                        ? "border-red"
                                        : "border-lines-light dark:border-lines-dark"
                                } transition-all duration-300 ease-in-out`}
                                placeholder="e g. WebDesign"
                                {...register("name")}
                                defaultValue={currentBoard.name}
                            />
                            {errors.name && (
                                <span className="absolute text-red right-2 top-1/2 translate-y-[-50%]">
                                    {errors.name?.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="mb-4">
                        <p className="text-medium-grey text-sm font-bold mb-2">
                            Board Columns
                        </p>
                        <div className="inputs-box flex flex-col gap-4 max-h-[280px] overflow-auto text-sm">
                            {fields.map((field, index) => {
                                if (index == 0 || index == 1) {
                                    return (
                                        <Input
                                            key={field.id}
                                            index={index}
                                            errors={
                                                errors.columns
                                                    ? errors.columns
                                                    : ""
                                            }
                                            register={register}
                                            name={"columns"}
                                            plholder={"e g. WebDesign"}
                                            description={"name"}
                                        />
                                    );
                                }

                                return (
                                    <Input
                                        key={field.id}
                                        index={index}
                                        errors={
                                            errors.columns ? errors.columns : ""
                                        }
                                        register={register}
                                        name={"columns"}
                                        plholder={"e g. WebDesign"}
                                        onRemove={remove}
                                        description={"name"}
                                    />
                                );
                            })}
                        </div>

                        <button
                            onClick={() => {
                                append({ name: "" });
                            }}
                            type="button"
                            className="bg-light-grey w-full py-2 rounded-full text-main-purple hover:bg-main-purple-light hover:text-white font-bold mt-4 flex justify-center items-center gap-2 transition-all duration-150 ease-in-out"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                fill="currentColor"
                            >
                                <path d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"></path>
                            </svg>
                            <span>Add New column</span>
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="bg-main-purple capitalize w-full py-2 rounded-full text-white hover:bg-main-purple-light font-bold mt-4 transition-all duration-150 ease-in-out"
                    >
                        Edit Board
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ModalEditBoard;
