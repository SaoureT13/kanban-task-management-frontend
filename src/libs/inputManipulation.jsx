export function removeInput(e) {
    const boardBox = document.querySelector(".inputs-box");

    if (boardBox.children.length > 2) {
        e.currentTarget.parentElement.remove();
    }
}

export function addNewInput({ inputName = "", plholder = "" }) {
    const boardBox = document.querySelector(".inputs-box");

    const board = document.createElement("div");
    board.classList.add("w-full", "flex", "items-center", "gap-4");
    board.innerHTML = `<input
        class="h-full w-full border-[1px] border-lines-light p-3 rounded-md"
        type="text"
        placeholder="${plholder}"
        name="${inputName}"
    />
    <button type="button" class="hover:text-red">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            fill="current-color"
        >
            <g fillRule="evenodd">
                <path d="M12.728 0l2.122 2.122L2.122 14.85 0 12.728z"></path>
                <path d="M0 2.122L2.122 0 14.85 12.728l-2.122 2.122z"></path>
            </g>
        </svg>
    </button>`;
    board.querySelector("button").addEventListener("click", removeInput);
    boardBox.appendChild(board);
}
