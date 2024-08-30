import { create } from "zustand";

export const useDataStore = create((set, get) => ({
    data: [],
    mainLoading: true,
    loading: false,
    errors: null,
    selectedBoard: null,

    getAllData: async () => {
        try {
            set({ mainLoading: true, errors: null });
            const response = await fetch(
                `${import.meta.env.VITE_API_ENDPOINT}/api/all_boards`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                const errorsData = await response.json();
                set({ errors: errorsData, mainLoading: false });
            } else {
                const data = await response.json();
                set({
                    data: data,
                    mainLoading: false,
                    selectedBoard: data.length > 0 ? 0 : null,
                });
            }
        } catch (errors) {
            set({ errors: errors.message, mainLoading: false });
        }
    },

    createBoard: async (body) => {
        try {
            set({ errors: null, loading: true });
            const response = await fetch(
                `${import.meta.env.VITE_API_ENDPOINT}/api/create_board`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            );
            if (!response.ok) {
                const errorsData = await response.json();
                set({ errors: errorsData, loading: false });
            } else {
                const createdData = await response.json();
                set((state) => ({
                    data: [...state.data, createdData],
                    errors: null,
                    loading: false,
                    selectedBoard: state.data.length,
                }));
            }
        } catch (errors) {
            set({ errors: errors.message, loading: false });
        }
    },

    createTask: async (body) => {
        set({ errors: null, loading: true });
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_ENDPOINT}/api/create_task`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            );
            if (!response.ok) {
                const errorsData = await response.json();
                set({ errors: errorsData, loading: false });
            } else {
                const data = await response.json();
                set((state) => ({
                    data: addTask(state.data, data.board_column, data),
                    errors: null,
                    loading: false,
                }));
            }
        } catch (errors) {
            set({ errors: errors.message, loading: false });
        }
    },

    editBoard: async (body) => {
        try {
            set({ errors: null, loading: true });
            const response = await fetch(
                `${import.meta.env.VITE_API_ENDPOINT}/api/update_board`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            );
            if (!response.ok) {
                const errorsData = await response.json();
                set({ errors: errorsData, loading: true });
            } else {
                const updateData = await response.json();
                set((state) => ({
                    data: updateBoard(state.data, updateData.id, updateData),
                    errors: null,
                    loading: false,
                }));
            }
        } catch (errors) {
            set({ errors: errors.message, loading: false });
        }
    },

    deleteBoard: async (boardId) => {
        try {
            set({ errors: null, loading: true });
            const response = await fetch(
                `${
                    import.meta.env.VITE_API_ENDPOINT
                }/api/delete_board?board_id=${boardId}`,
                {
                    method: "DELETE",
                }
            );
            if (!response.ok) {
                const errorsData = await response.json();
                set({ errors: errorsData, loading: false });
            } else {
                const data = await response.json();
                if (data.success) {
                    set((state) => ({
                        data: state.data.filter(
                            (board) => board.id !== boardId
                        ),
                        errors: null,
                        loading: null,
                        selectedBoard: state.data.length > 0 ? 0 : null,
                    }));
                }
            }
        } catch (error) {
            set({ errors: error.message, loading: false });
        }
    },

    updateCompletedSubTask: async (subtaskId) => {
        try {
            set({ errors: null, loading: true });
            const response = await fetch(
                `${
                    import.meta.env.VITE_API_ENDPOINT
                }/api/update_subtask?subtask_id=${subtaskId}`,
                {
                    method: "PUT",
                }
            );
            if (!response.ok) {
                const errorsData = await response.json();
                set({ errors: errorsData, loading: false });
            } else {
                const data = await response.json();
                if (data.success) {
                    set((state) => ({
                        data: editSubTaskCompleted(
                            state.data,
                            subtaskId,
                            data.task
                        ),
                        errors: null,
                        loading: false,
                    }));
                }
            }
        } catch (errors) {
            set({ errors: errors.message, loading: false });
        }
    },

    changeTaskColumn: async (taskId, columnId) => {
        try {
            set({ loading: true });
            const response = await fetch(
                `${
                    import.meta.env.VITE_API_ENDPOINT
                }/api/update_task_column?task_id=${taskId}&column_id=${columnId}`,
                {
                    method: "PUT",
                }
            );
            if (!response.ok) {
                const errorData = response.json();
                set({ errors: errorData, loading: false });
            } else {
                const data = await response.json();
                set((state) => ({
                    data: updateColumnTask(state.data, data),
                    loading: false,
                }));
            }
        } catch (error) {
            set({ errors: error.message, loading: false });
        }
    },

    deleteTask: async (taskId) => {
        try {
            set({ loading: true });
            const response = await fetch(
                `${
                    import.meta.env.VITE_API_ENDPOINT
                }/api/delete_task?task_id=${taskId}`,
                {
                    method: "DELETE",
                }
            );
            if (!response.ok) {
                const errorData = await response.json();
                set({ errors: errorData, loading: false });
            } else {
                const data = await response.json();
                if (data.success) {
                    set((state) => ({
                        data: deleteTask(state.data, taskId),
                        loading: false,
                    }));
                }
            }
        } catch (error) {
            set({ errors: error.message, loading: false });
        }
    },

    updateTask: async (body) => {
        try {
            set({ loading: true });
            const response = await fetch(
                `${import.meta.env.VITE_API_ENDPOINT}/api/update_task`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            );
            if (!response.ok) {
                const errorData = await response.json();
                set({ errors: errorData, loading: false });
            } else {
                const data = await response.json();
                set((state) => ({
                    data: updateTask(state.data, data),
                    loading: false,
                }));
            }
        } catch (error) {
            set({ errors: error.message, loading: true });
        }
    },

    changeSelectedBoard: (name) => {
        const currentElementIndex = get().data.findIndex(
            (elem) => elem.name == name
        );
        set({ selectedBoard: currentElementIndex });
    },
}));

/**
 *
 * @param {Array} data
 * @param {number} columnId
 * @param {object} task
 * @returns Array
 */
function addTask(data, columnId, task) {
    data.forEach((board) => {
        board.columns.forEach((column) => {
            if (column.id === columnId) {
                column.tasks.push(task);
            }
        });
    });
    return data;
}

/**
 *
 * @param {Array} data
 * @param {number} boardId
 * @param {object} newBoard
 * @returns Array
 */
function updateBoard(data, boardId, newBoard) {
    const updateBoard = data.map((board) => {
        if (board.id === boardId) {
            return {
                ...board,
                name: newBoard.name,
                slug: newBoard.slug,
                columns: newBoard.columns,
            };
        }
        return board;
    });

    return updateBoard;
}

function updateTask(data, newTask) {
    data.forEach((board) => {
        board.columns.forEach((column) => {
            let task = column?.tasks.find((task) => task.id === newTask.id);

            if (task) {
                column.tasks = column.tasks.filter(
                    (task) => task.id !== newTask.id
                );
            }
            if (column.id === newTask.board_column) {
                column.tasks.push(newTask);
            }
        });
    });

    return data;
}

function editSubTaskCompleted(data, subtaskId, newTask) {
    data.forEach((board) => {
        board.columns.forEach((column) => {
            column.tasks?.forEach((task) => {
                const subtask = task.subtasks?.find(
                    (subtask) => subtask.id === subtaskId
                );
                if (subtask) {
                    subtask.is_completed = !subtask.is_completed;
                }
                if (task.id === newTask.id) {
                    task.is_completed = newTask.is_completed;
                }
                return true;
            });
        });
    });
    return data;
}

function updateColumnTask(data, newTask) {
    data.forEach((board) => {
        board.columns.forEach((column) => {
            column.tasks = column?.tasks.filter(
                (task) => task.id !== newTask.id
            );
            if (column.id === newTask.board_column) {
                column.tasks.push(newTask);
            }
        });
    });

    return data;
}

function deleteTask(data, taskId) {
    data.forEach((board) => {
        board.columns.forEach((column) => {
            column.tasks = column?.tasks.filter((task) => task.id !== taskId);
        });
    });

    return data;
}

// export const useDataStoreAction = () => {
//     useDataStore((state) => state.actions);
// };
