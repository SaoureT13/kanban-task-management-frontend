import { useState } from "react";

export function useBoolean(d = false) {
    const [bool, setBool] = useState(d);

    const handleToggleBool = () => {
        setBool((bool) => !bool);
    };

    return [bool, handleToggleBool];
}
