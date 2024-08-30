import ReactDOM from "react-dom";
import { useBoolean } from "../hooks/useBoolean";
import ModalNewBoard from "./Modals/ModalNewBoard";
import { useDataStore } from "../store/state";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect } from "react";

function SideBar({ hide, onHideSidebar, onToggleTheme, checked }) {
    const [isModalOpen, setModalOpen] = useBoolean();
    const { changeSelectedBoard } = useDataStore();

    const { data, mainLoading, selectedBoard } = useDataStore();

    return (
        <>
            {/* <div className="z-10 fixed transition-all translate-x-0"> */}
            <div
                className={`bg-white dark:bg-dark-grey sidebar py-6 border-r-[1px] border-r-lines-light dark:border-r-lines-dark absolute ${
                    hide
                        ? "sm:w-[256px] lg:w-[300px]"
                        : "sm:w-0 overflow-hidden"
                } min-h-[calc(100vh-80px)] hidden sm:flex flex-col z-10 transition-all duration-300 ease-in-out`}
            >
                <div>
                    <div className="px-6">
                        <h3 className="uppercase font-bold text-sm text-medium-grey">
                            All boards ({mainLoading ? "?" : data.length})
                        </h3>
                    </div>
                    <div>
                        <ul className="my-6 flex flex-col gap-2">
                            {mainLoading
                                ? Array.from({ length: 3 }).map((_, index) => (
                                      <Skeleton
                                          key={index}
                                          baseColor="#e0e5f1"
                                          highlightColor="#f4f7fd"
                                          containerClassName="flex-1 w-11/12 rounded-tr-full rounded-br-full"
                                          style={{
                                              height: 48,
                                              borderBottomRightRadius: "9999px",
                                              borderTopRightRadius: "9999px",
                                          }}
                                      />
                                  ))
                                : data.map((board) => {
                                      return (
                                          <li
                                              key={board.name}
                                              onClick={() =>
                                                  changeSelectedBoard(
                                                      board.name
                                                  )
                                              }
                                              className={`px-6 py-3 w-11/12 font-bold rounded-tr-full rounded-br-full hover:cursor-pointer flex items-center gap-4 ${
                                                  data[selectedBoard].name ==
                                                  board.name
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
                                              <span>{board.name}</span>
                                              {/* <Skeleton baseColor="#e0e5f1" highlightColor="#f4f7fd"  style={{ height: "100%", width: "100%" }}/> */}
                                          </li>
                                      );
                                  })}
                        </ul>
                        <button
                            onClick={setModalOpen}
                            className="px-6 py-3 w-11/12 font-bold rounded-tr-full rounded-br-full hover:bg-main-purple/10 text-main-purple flex items-center gap-4 cursor-pointer transition-all duration-150 ease-in-out capitalize"
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
                <div className="mt-auto">
                    <div className="mx-6 h-12 bg-light-grey dark:bg-very-dark-grey rounded-md p-1 flex items-center justify-center">
                        <div className="flex gap-4 items-center text-medium-grey">
                            <button
                                onClick={() => {
                                    if (!checked) {
                                        return;
                                    } else {
                                        onToggleTheme();
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
                                className="w-10 bg-main-purple cursor-pointer rounded-xl h-[22px] relative"
                                onClick={onToggleTheme}
                            >
                                <input
                                    type="checkbox"
                                    id="toggleCheckbox"
                                    className="absolute top-0 bottom-0 left-0 right-0 opacity-0 z-10 cursor-pointer"
                                    checked={checked}
                                    onChange={onToggleTheme}
                                />
                                <span
                                    className={`z-8 bg-white h-[15px] w-[15px] top-1/2 translate-y-[-50%] rounded-full absolute ${
                                        checked
                                            ? "translate-x-5"
                                            : "translate-x-1"
                                    } inline-block transition-all duration-300 ease-in-out`}
                                ></span>
                            </label>
                            <button
                                onClick={() => {
                                    if (checked) {
                                        return;
                                    } else {
                                        onToggleTheme();
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

                    <button
                        onClick={onHideSidebar}
                        className="hover:bg-main-purple/10 px-6 py-3 w-11/12 font-bold rounded-tr-full rounded-br-full text-medium-grey hover:text-main-purple flex items-center gap-4 cursor-pointer transition-all duration-300 ease-in-out mt-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="16"
                            fill="currentColor"
                        >
                            <path d="M8.522 11.223a4.252 4.252 0 01-3.654-5.22l3.654 5.22zM9 12.25A8.685 8.685 0 011.5 8a8.612 8.612 0 012.76-2.864l-.86-1.23A10.112 10.112 0 00.208 7.238a1.5 1.5 0 000 1.524A10.187 10.187 0 009 13.75c.414 0 .828-.025 1.239-.074l-1-1.43A8.88 8.88 0 019 12.25zm8.792-3.488a10.14 10.14 0 01-4.486 4.046l1.504 2.148a.375.375 0 01-.092.523l-.648.453a.375.375 0 01-.523-.092L3.19 1.044A.375.375 0 013.282.52L3.93.068a.375.375 0 01.523.092l1.735 2.479A10.308 10.308 0 019 2.25c3.746 0 7.031 2 8.792 4.988a1.5 1.5 0 010 1.524zM16.5 8a8.674 8.674 0 00-6.755-4.219A1.75 1.75 0 1012.75 5v-.001a4.25 4.25 0 01-1.154 5.366l.834 1.192A8.641 8.641 0 0016.5 8z"></path>
                        </svg>
                        <span>Hide sidebar</span>
                    </button>
                </div>
            </div>
            {/* </div> */}
            {isModalOpen &&
                ReactDOM.createPortal(
                    <ModalNewBoard onHandleClose={setModalOpen} />,
                    document.body
                )}
        </>
    );
}

export default SideBar;
