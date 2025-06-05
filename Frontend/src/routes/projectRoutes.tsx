import { RouteObject } from "react-router-dom";
import Project from "../Features/projects/project/Project"; 
import CreateProjects from "../Features/projects/createProjects/CreateProjects";

const ProjectRoutes: RouteObject[] = [
    { path: "/projects/:projectId", element: <Project /> }, 
    { path:"/project/create-project", element: <CreateProjects /> }
];

export default ProjectRoutes;