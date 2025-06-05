import { RouteObject } from "react-router-dom"; 
import CreateIssues from "../Features/Issues/createIssues/CreateIssues";
import RenderIssues from "../Features/Issues/renderIssues/RenderIssues";
import Issue from "../Features/Issues/Issue/Issue";

const IssueRoutes: RouteObject[] = [
    { path: "/projects/:projectId/issues/create", element: <CreateIssues/> }, 
    { path: "/projects/:projectId/issues/view",  element: <RenderIssues />}, 
    { path: "/projects/:projectId/issues/:issueId/", element: <Issue /> }
]; 

export default IssueRoutes;