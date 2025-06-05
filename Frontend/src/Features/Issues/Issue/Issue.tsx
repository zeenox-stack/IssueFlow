import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleDeleteIssue, handleGetIssue } from "../../../Services/api";
import { PayloadIssueType } from "../renderIssues/RenderIssues";
import IssueEditMode from "../updateIssues/updateIssues";

const Issue: React.FC = React.memo(() => {
  const { projectId, issueId } = useParams();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  if (!issueId || !projectId) {
    return <div>Something went wrong!</div>;
  }

  const [loading, setLoading] = useState<boolean>(true);
  const [issue, setIssue] = useState<PayloadIssueType>(); 
  const navigate = useNavigate();

  useEffect(() => {
    const handleSetIssue = async () => {
      const fetchedIssue = await handleGetIssue(projectId, issueId);
      setIssue(fetchedIssue);
      setLoading(false);
    };

    handleSetIssue();
  }, [issueId, projectId]);

  if (loading) return <div>Loading Issue</div>;
  if (isEditMode)
    return (
      <IssueEditMode
        title={issue?.title || ""}
        status={issue?.status || ""}
        description={issue?.description || ""}
        projectId={projectId}
        issueId={issueId} 
        close={(val = false) => setIsEditMode(val)}
      />
    );

  return (
    <section>
      <h2>{issue?.title}</h2>
      <div>
        <span>{issue?.createdAt}</span>
        <span>{issue?.status}</span>
        <button onClick={() => setIsEditMode(true)}>Edit</button> 
        <button onClick={() => {
          handleDeleteIssue(projectId, issueId).then(res => {
            if (res) navigate(`/projects/${projectId}/issues/view`)
          })
        }}>Delete</button>
      </div>

      <p>{issue?.description}</p>
    </section>
  );
});

export default Issue;
