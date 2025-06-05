import React, { useState, useEffect } from "react";
import { handleUpdateProject } from "../../../Services/api";
import { useProjectStore } from "../../../Hooks/useProjectStore";
import { useNavigate } from "react-router-dom";

interface EditModeProps {
  title: string;
  description: string;
  projectId: string;
  close: () => void;
}

interface EditedProjectProps {
  title: string;
  description: string;
}

const ProjectEditMode: React.FC<EditModeProps> = React.memo(
  ({ title, description, projectId, close }) => {
    const [updatedProject, setUpdatedProject] = useState<EditedProjectProps>({
      title,
      description,
    });
    const [submit, setSubmit] = useState<boolean>(false);
    const { setProject } = useProjectStore();
    const navigate = useNavigate();

    useEffect(() => {
      if (!submit) return;

      const handleSubmission = async () => {
        const uProject = await handleUpdateProject(
          updatedProject.title,
          updatedProject.description,
          projectId
        );

        if (uProject) {
          setSubmit(false);
          close();
          setProject(projectId, uProject);
          navigate(`/dashboard`);
        }
      };

      handleSubmission();
    }, [submit]);

    return (
      <section>
        <div>
          <input
            type="text"
            value={updatedProject.title}
            onChange={(e) =>
              setUpdatedProject((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="title"
          />
          <textarea
            name="description"
            value={updatedProject.description}
            onChange={(e) =>
              setUpdatedProject((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            placeholder="description"
          ></textarea>
        </div>
        <button
          onClick={() => setSubmit(true)}
          disabled={
            submit ||
            (title === updatedProject.title &&
              description === updatedProject.description)
          }
        >
          submit
        </button>
      </section>
    );
  }
);

export default ProjectEditMode;
