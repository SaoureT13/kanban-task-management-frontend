function Input({
    name,
    register,
    plholder,
    errors,
    index,
    onRemove,
    description,
}) {
    return (
        <div className="relative w-full flex gap-4 h-10">
            <div className="h-full w-full relative">
                <input
                    type="text"
                    className={`h-full w-full border-[1px] p-3 rounded-md ring-0 outline-none focus:border-main-purple hover:border-main-purple  dark:bg-dark-grey dark:text-white transition-all duration-300 ease-in-out ${
                        errors && errors[index]
                            ? "border-red"
                            : "border-lines-light dark:border-lines-dark "
                    }`}
                    placeholder={plholder}
                    {...(description == "title"
                        ? { ...register(`${name}.${index}.title`) }
                        : { ...register(`${name}.${index}.name`) })}
                />
                {description == "title" && errors && errors[index] && (
                    <span className="absolute text-red right-2 top-1/2 translate-y-[-50%]">
                        {errors[index].title?.message}
                    </span>
                )}

                {description == "name" && errors && errors[index] && (
                    <span className="absolute text-red right-2 top-1/2 translate-y-[-50%]">
                        {errors[index].name?.message}
                    </span>
                )}
            </div>
            {onRemove && (
                <button
                    onClick={() => onRemove(index)}
                    type="button"
                    className="hover:text-red dark:text-white transition-all duration-300 ease-in-out"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        fill="currentColor"
                    >
                        <g fillRule="evenodd">
                            <path d="M12.728 0l2.122 2.122L2.122 14.85 0 12.728z"></path>
                            <path d="M0 2.122L2.122 0 14.85 12.728l-2.122 2.122z"></path>
                        </g>
                    </svg>
                </button>
            )}
        </div>
    );
}

export default Input;
