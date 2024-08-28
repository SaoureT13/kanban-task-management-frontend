import { useEffect, useState } from "react";
import BoardColumn from "../components/BoardColumn";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { useDataStore } from "../store/state";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useBoolean } from "../hooks/useBoolean";
import ModalEditBoard from "../components/Modals/ModalEditBoard";
import ReactDOM from "react-dom";

function Root() {
    const { data, mainLoading, errors, selectedBoard, getAllData } =
        useDataStore();

    const [hide, setHide] = useBoolean(true);
    //Mettre la valeur de isDarkMode à true si theme dans le localStorage est dark ou si theme pas dans le localStorage mais theme de l'user est dark
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.theme === "dark" ||
            (!localStorage.theme &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
    );

    const handleThemeToggle = () => {
        const newTheme = isDarkMode ? "light" : "dark";
        setIsDarkMode(!isDarkMode);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.remove(
            isDarkMode ? "dark" : "light"
        );
        document.documentElement.classList.add(newTheme);
    };

    useEffect(() => {
        getAllData();
    }, [getAllData]);

    const [isOpenModalEditBoard, setModalEditBoard] = useBoolean();

    if (errors) return <p>Erreur : {errors}</p>;

    return (
        <>
            <Header
                isDarkMode={isDarkMode}
                onHandleThemeToggle={handleThemeToggle}
                onHandleOpenModalEdit={setModalEditBoard}
            />
            <main className="">
                <div className="flex w-full">
                    <SideBar
                        hide={hide}
                        onHideSidebar={setHide}
                        onToggleTheme={handleThemeToggle}
                        checked={isDarkMode}
                    />
                    <div
                        className={`relative w-screen h-full max-h-[calc(100vh-64px)] ${
                            hide ? "sm:pl-[256px] lg:pl-[300px]" : ""
                        } bg-light-grey dark:bg-very-dark-grey transition-all duration-300 ease-in-out`}
                    >
                        <div className="w-full p-6 overflow-auto transition-all max-h-[calc(100vh-64px)]">
                            <div className="flex h-full gap-6">
                                {mainLoading
                                    ? // Afficher des Skeletons pendant le chargement
                                      Array.from({ length: 3 }).map(
                                          (_, index) => (
                                              <div
                                                  key={index}
                                                  className="min-w-[240px]"
                                              >
                                                  <Skeleton
                                                      height={20}
                                                      baseColor="#e0e5f1"
                                                      highlightColor="#f4f7fd"
                                                      style={{
                                                          marginBottom: 24,
                                                      }}
                                                  />
                                                  <Skeleton
                                                      count={5}
                                                      height={80}
                                                      baseColor="#e0e5f1"
                                                      highlightColor="#f4f7fd"
                                                      style={{ marginTop: 20 }}
                                                  />
                                              </div>
                                          )
                                      )
                                    : data[selectedBoard].columns.map(
                                          (column) => (
                                              <BoardColumn
                                                  key={column.id}
                                                  column={column}
                                              />
                                          )
                                      )}

                                <div className="min-w-[240px] min-h-full rounded-md relative">
                                    <div className="h-[calc(100vh-142px)] pr-6 sticky top-0 left-0 text-2xl font-bold select-none flex justify-center items-center pt-11">
                                        <button
                                            onClick={setModalEditBoard}
                                            className="w-full h-full bg-gradient-to-b from-[#E9EFFA] to-[#E9EFFA]/50 dark:from-dark-grey dark:to-dark-grey/25 rounded-md text-medium-grey hover:text-main-purple cursor-pointer text-2xl font-bold flex items-center justify-center transition-all duration-150 ease-in-out"
                                        >
                                            New column
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <button
                onClick={setHide}
                className="hidden sm:block absolute bottom-2 bg-main-purple p-4 rounded-tr-full rounded-br-full hover:bg-main-purple-light cursor-pointer transition-all duration-300 ease-in-out"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="11">
                    <path
                        fill="#FFF"
                        d="M15.815 4.434A9.055 9.055 0 008 0 9.055 9.055 0 00.185 4.434a1.333 1.333 0 000 1.354A9.055 9.055 0 008 10.222c3.33 0 6.25-1.777 7.815-4.434a1.333 1.333 0 000-1.354zM8 8.89a3.776 3.776 0 01-3.778-3.78A3.776 3.776 0 018 1.333a3.776 3.776 0 013.778 3.778A3.776 3.776 0 018 8.89zm2.889-3.778a2.889 2.889 0 11-5.438-1.36 1.19 1.19 0 101.19-1.189H6.64a2.889 2.889 0 014.25 2.549z"
                    ></path>
                </svg>
            </button>
            {isOpenModalEditBoard &&
                ReactDOM.createPortal(
                    <ModalEditBoard
                        onHandleClose={setModalEditBoard}
                        currentBoard={data[selectedBoard]}
                    />,
                    document.body
                )}
        </>
    );
}

function detectCurrentTheme() {
    let theme;
    if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
        theme = "dark";
    } else {
        theme = "light";
    }

    return theme;
}
export default Root;
