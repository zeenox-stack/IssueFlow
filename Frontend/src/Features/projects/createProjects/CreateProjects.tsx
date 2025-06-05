import React, { useState } from "react";
import InputBox from "../../../components/InputBox/InputBox";
import { v4 as uuid } from "uuid";
import { handleCreateproject } from "../../../Services/api";
import { useNavigate } from "react-router-dom";
import { useProjectStore } from "../../../Hooks/useProjectStore";

export interface FormType {
  id: string;
  title: string;
  description: string;
}

const CreateProjects: React.FC = React.memo(() => {
  const [formData, setFormData] = useState<FormType>({
    id: uuid(),
    title: "",
    description: "",
  });
  const [submit, setSubmit] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setProject } = useProjectStore();

  const handleSubmit = async () => {
    if (formData.title.length < 5 || formData.description.length < 20) {
      return;
    }
    setSubmit(true);

    try {
      const project = await handleCreateproject(formData);

      if (!project) throw new Error("Error occured couldn't receive project");

      setProject(project.id, project);
      navigate(`/projects/${project.id}`);
    } catch (err) {
      console.error("Error occured: ", err);
    } finally {
      setSubmit(false);
    }
  };

  return (
    <section className="w-full h-full px-10 flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl h-3/4 w-2/5 p-6">
        <div className="flex flex-col justify-start mb-6">
          <h2 className="font-semibold text-xl text-gray-800 mb-2">
            Create a New Project
          </h2>
          <p className="text-gray-500 text-sm">
            Start organising your tasks with a new project
          </p>
        </div>
        <InputBox
          name="Project Title"
          inputType={true}
          onChange={(value) => setFormData((n) => ({ ...n, title: value }))}
          isEmpty={submit && formData.title.length < 5}
          placeholder="Enter project title..."
        />
        <InputBox
          name="Description"
          inputType={false}
          onChange={(value) =>
            setFormData((n) => ({ ...n, description: value }))
          }
          isEmpty={submit && formData.description.length < 20}
          placeholder={"Describe your project goals and objectives"}
        />
        <div className="w-full flex flex-col justify-center items-center mt-4">
          <button
            onClick={handleSubmit}
            disabled={submit}
            className="rounded-xl bg-emerald-500 hover:bg-emerald-700 py-2 w-11/12 mb-2 text-white disabled:bg-emerald-700 disabled:cursor-not-allowed"
          >
            Create Project
          </button>
          <button
            className="text-emerald-500 hover:bg-gray-100 w-11/12 py-2 rounded-xl"
            onClick={() => navigate("/dashboard")}
          >
            Cancel and go back to dashboard
          </button>
        </div>
      </div>
    </section>
  );
});

export default CreateProjects;
