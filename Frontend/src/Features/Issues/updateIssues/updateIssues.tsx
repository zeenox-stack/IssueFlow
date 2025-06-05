import React, { useState, useEffect } from "react";
import { handleUpdateIssue } from "../../../Services/api";

interface EditModeType {
  title: string;
  description: string;
  status: string;
}

interface EditModeProps {
  title: string;
  description: string;
  status: string;
  projectId: string;
  issueId: string;
  close: () => void;
}

const IssueEditMode: React.FC<EditModeProps> = React.memo(
  ({ title, status, description, projectId, issueId, close }) => {
    const [updatedIssue, setUpdatedIssue] = useState<EditModeType>({
      title,
      status,
      description,
    });
    const [submit, setSubmit] = useState<boolean>(false);

    useEffect(() => {
      if (!submit) return;

      const handleSubmission = async () => {
        const response = await handleUpdateIssue(
          updatedIssue.title,
          updatedIssue.status,
          updatedIssue.description,
          projectId,
          issueId
        );

        if (response) {
          setSubmit(false);
          close();
        }
      };

      handleSubmission();
    }, [submit]);

    return (
      <section>
        <div>
          <input
            type="text"
            value={updatedIssue.title}
            placeholder="title..."
            onChange={(e) =>
              setUpdatedIssue((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <select
            name="status"
            onChange={(e) =>
              setUpdatedIssue((prev) => ({ ...prev, status: e.target.value }))
            }
            value={updatedIssue.status}
          >
            {["open", "in-progress", "closed"].map((s, idx) => {
              return (
                <option value={s} key={idx}>
                  {s}
                </option>
              );
            })}
          </select>
          <textarea
            name="description"
            value={updatedIssue.description}
            onChange={(e) =>
              setUpdatedIssue((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          ></textarea>
        </div>
        <button
          onClick={() => setSubmit(true)}
          disabled={
            submit ||
            (title === updatedIssue.title &&
              status === updatedIssue.status &&
              description === updatedIssue.description)
          }
        >
          Submit
        </button>
      </section>
    );
  }
);

export default IssueEditMode;
