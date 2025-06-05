import { useProjectStore } from "./useProjectStore"; 
import { useEffect } from "react";

export const useProjects = () => {
    const { projects, fetchProjects } = useProjectStore(); 
    const hasDummy = projects.has("dummy"); 

    useEffect(() => {
        if (hasDummy) fetchProjects();
    }, [hasDummy])

    return { projects, loading: hasDummy };
};