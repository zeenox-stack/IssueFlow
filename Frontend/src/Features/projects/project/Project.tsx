import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProjectStore } from "../../../Hooks/useProjectStore";
import ProjectEditMode from "../edit/ProjectEditMode";
import { handleDeleteProject } from "../../../Services/api";
import RenderIssues from "../../Issues/renderIssues/RenderIssues";

import Edit from "../../../assets/edit.svg";
import Delete from "../../../assets/delete.svg";
import DeleteOnHover from "../../../assets/delete-hover.svg"; 
import EditOnHover from "../../../assets/edit-hover.svg";

const Project: React.FC = React.memo(() => {
  const { projectId: id } = useParams();
  if (!id)
    return <div>Error Occured try reloading or reopening the browser</div>;
  const { projects, getProject, deleteProject } = useProjectStore();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const project = getProject(id);
  const navigate = useNavigate();

  if (isEditMode)
    return (
      <ProjectEditMode
        title={project?.title || ""}
        description={project?.description || ""}
        projectId={id}
        close={(val = false) => setIsEditMode(val)}
      />
    );

  return (
    <section className="w-full h-full bg-gray-100 flex justify-between p-8">
      <div className="p-3 w-1/3 bg-white rounded-md min-h-[3rem] h-20 overflow-y-auto">
        <h3>Projects</h3>
        <ul className="pl-0 list-none">
          {Array.from(projects.values()).map((p, i) => {
            return (
              <li
                key={i}
                className={
                  "font-semibold p-2 rounded-md flex items-center " + p.id ===
                  id
                    ? "bg-blue-50 text-blue-700"
                    : "bg-transparent text-gray-800"
                }
              >
                {p.title}
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <div className="flex justify-between p-3 bg-white mb-2 rounded-lg">
          <div>
            <h2 className="font-medium ">{project?.title}</h2>
            <p className="font-[Inter]">{project?.description}</p>
            <div className="flex items-center gap-x-2">
              <span>created by: {project?.ownerName}</span>
              <button
                onClick={() => setIsEditMode(true)}
                className="group hover:bg-green-100 rounded-full p-1"
              >
                <img src={Edit} alt="edit icon" className="block group-hover:hidden"/> 
                <img src={EditOnHover} alt="hover edit icon" className="hidden group-hover:block"/>
              </button>
              <button
                onClick={() => {
                  handleDeleteProject(id).then((res) => {
                    if (res) {
                      deleteProject(id);
                      navigate("/dashboard");
                    }
                  });
                }}
                className="group hover:bg-red-100 rounded-full p-1"
              >
                <img
                  src={Delete}
                  alt="delete icon"
                  className="block group-hover:hidden"
                />
                <img
                  src={DeleteOnHover}
                  alt="hover delete icon"
                  className="hidden group-hover:block"
                />
              </button>
            </div>
          </div>
          <div>
            <button
              onClick={() => navigate(`/projects/${id}/issues/create`)}
              className="px-3 py-2 bg-blue-500 rounded-2xl text-white font-[Poppins] hover:bg-blue-300"
            >
              Add Issues
            </button>
          </div>
        </div>
        <RenderIssues />
      </div>
    </section>
  );
});

export default Project;
