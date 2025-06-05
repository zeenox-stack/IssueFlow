import axios from "axios";
import { FormType } from "../Features/projects/createProjects/CreateProjects";
import { IssueType } from "../Features/Issues/createIssues/CreateIssues";

const backend = "http://localhost:3000";

export const handleGetProjects = async () => {
  try {
    const response = await axios.get(backend + "/api/project/get", {
      withCredentials: true,
    });

    return { ...response.data };
  } catch (err) {
    console.error("Error occured: ", err);
  }
};

export const handleCreateproject = async (formData: FormType) => {
  try {
    const response = await axios.post(
      backend + "/api/project/create",
      formData,
      {
        withCredentials: true,
      }
    );

    if (response.status !== 201) throw new Error(response.data.error);
    return response.data.project;
  } catch (err) {
    console.error("Error occured: ", err);
  }
};

export const handleCreateIssue = async (issue: IssueType) => {
  try {
    const response = await axios.post(
      `${backend}/api/project/${issue.projectId}/issues/create`,
      issue,
      {
        withCredentials: true,
      }
    );

    if (response.status !== 201) throw new Error(response.data.error);
    return response.data.issue;
  } catch (error) {
    console.error("Error occured: ", error);
  }
};

export const handleGetIssues = async (projectId: string) => {
  try {
    const response = await axios.get(
      `${backend}/api/project/${projectId}/issues/get`,
      {
        withCredentials: true,
      }
    );

    if (response.status !== 200) throw new Error(response.data.error);
    return response.data.issues;
  } catch (error) {
    console.error("Error occured: ", error);
    return [];
  }
};

export const handleGetIssue = async (projectId: string, issueId: string) => {
  try {
    const response = await axios.get(
      `${backend}/api/project/${projectId}/issues/${issueId}`,
      {
        withCredentials: true,
      }
    );

    if (response.status !== 200) throw new Error(response.data.error);
    return response.data.issue;
  } catch (error) {
    console.error("Error occured: ", error);
  }
};

export const handleUpdateIssue = async (
  title: string,
  status: string,
  description: string,
  projectId: string,
  issueId: string
) => {
  try {
    const response = await axios.patch(
      `${backend}/api/project/${projectId}/issues/${issueId}`,
      {
        title,
        status,
        description,
      },
      {
        withCredentials: true,
      }
    );

    if (response.status !== 200) throw new Error("Couldn't update the issue");
    return response.data.issue;
  } catch (error) {
    console.error("Error occured: ", error);
  }
};

export const handleDeleteIssue = async (projectId: string, issueId: string) => {
  try {
    const response = await axios.delete(
      `${backend}/api/project/${projectId}/issues/${issueId}`,
      {
        withCredentials: true,
      }
    );

    return response.status === 200;
  } catch (error) {
    console.error("Error occured: ", error);
  }
};

export const handleUpdateProject = async (
  title: string,
  description: string,
  projectId: string
) => {
  try {
    const response = await axios.patch(
      `${backend}/api/project/${projectId}`,
      {
        title,
        description,
      },
      {
        withCredentials: true,
      }
    );

    if (response.status !== 200) throw new Error("Couldn't update project");
    return response.data.updatedProject;
  } catch (error) {
    console.error("Error occured: ", error);
  }
};

export const handleDeleteProject = async (projectId: string) => {
  try {
    const response = await axios.delete(`${backend}/api/project/${projectId}`, {
      withCredentials: true,
    });

    return response.status === 200;
  } catch (error) {
    console.error("Error occured: ", error);
  }
};
