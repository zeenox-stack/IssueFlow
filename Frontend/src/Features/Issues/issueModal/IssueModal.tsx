import React from "react";
import { PayloadIssueType } from "../renderIssues/RenderIssues";
import { useNavigate } from "react-router-dom";
import { getStatusStyles } from "../../../Utils/Utils";

const IssueModal: React.FC<{ issue: PayloadIssueType, projectId: string }> = React.memo(
  ({ issue, projectId }) => {
    const navigate = useNavigate();

    return (
      <div onClick={() => navigate(`/projects/${projectId}/issues/${issue.id}/`)} className="bg-white shadow-sm rounded-lg border border-gray-100 hover:shadow-md transition-shadow duration-200 p-3">
        <span className={"px-2 py-1 rounded-xl " + getStatusStyles(issue.status)}>{issue.status}</span>
        <h4 className="font-semibold font-[Poppins] ">{issue.title}</h4>
        <span>{issue.createdAt.split("T")[0]}</span>
        <p>
          {issue.description.slice(0, 18)}
          {issue.description.length >= 18 ? "..." : ""}
        </p>
      </div>
    );
  }
);

export default IssueModal;
