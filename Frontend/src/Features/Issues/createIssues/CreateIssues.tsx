import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { handleCreateIssue } from "../../../Services/api";

export interface IssueType {
  id: string;
  projectId: string;
  title: string;
  description: string;
}

const CreateIssues: React.FC = React.memo(() => {
  const { projectId } = useParams();

  if (!projectId) {
    return <div>Something went wrong!</div>;
  }

  const [issue, setIssue] = useState<IssueType>({
    id: uuid(),
    projectId,
    title: "",
    description: "",
  });
  const [submit, setSubmit] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!submit) return;

    const handleSubmission = async () => {
      const newIssue = await handleCreateIssue(issue);
      setSubmit(false);

      if (newIssue) {
        navigate(`/projects/${issue.projectId}/issues/${issue.id}`);
      }
    };

    handleSubmission();
  }, [submit]);

  return (
    <section className="w-full h-full flex justify-center items-center bg-gray-50">
      <div className="p-5 rounded-2xl shadow-sm bg-white h-3/5 w-2/5">
        <div className="flex flex-col gap-y-4 ">
          <h2 className="text-lg text-gray-800 ">Create a NEW Issue</h2>
          <div className="flex flex-col justify-start mt-6">
            <label htmlFor="title" className="mb-4">
              Issue Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter the title of your Issue"
              className="w-full px-3 py-2 rounded-2xl border border-gray-100 hover:border-indigo-500 bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-150"
              onChange={(e) =>
                setIssue((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col justify-start mt-6">
            <label htmlFor="description" className="mb-4">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Add a description for your issue..."
              rows={4}
              className="w-full px-3 py-2 rounded-2xl border border-gray-100 hover:border-indigo-500 bg-gray-50 focus:ring-2 focus:ring-indnigo-500 focus:outline-none transition-all duration-150"
              onChange={(e) =>
                setIssue((prev) => ({ ...prev, description: e.target.value }))
              }
            ></textarea>
          </div>
        </div>
        <button
          onClick={() => setSubmit(true)}
          className="w-full px-3 py-2 bg-indigo-500 hover:bg-indigo-300 mt-6 rounded-lg shadow-sm hover:shadow-md disabled:bg-indigo-700 disabled:cursor-not-allowed text-white"
          disabled={
            submit || issue.title.length < 10 || issue.description.length < 20
          }
        >
          Submit
        </button>
        <button 
        onClick={() => navigate(`/projects/${projectId}`)} 
        className="w-full px-3 py-2 rounded-lg hover:bg-gray-100 text-indigo-500 hover:text-indigo-300 shadow-sm hover:shadow-md mt-4"
        >
          Cancel and go back 
        </button>
      </div>
    </section>
  );
});

export default CreateIssues;
