import React from "react";
import { useNavigate } from "react-router-dom";

const ProjectModal: React.FC<{
  id: string;
  title: string;
  description: string;
}> = React.memo(({ id, title, description }) => {
  const navigate = useNavigate();

  return (
    <div
      className="px-3 py-2 bg-white rounded-lg w-full h-[6.5rem] shadow-sm hover:shadow-md transition-shadow duration-300"
      onClick={() => navigate(`/projects/${id}`)}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/projects/${id}`)}
    >
      <h3 className="font-semibold text-lg font-[Roboto] text-gray-800">
        {title}
      </h3>
      <p className="font-[Poppins] text-gray-600">
        {description.slice(0, 20).trim()}
        {description.length >= 20 ? ".." : ""}
      </p>
    </div>
  );
});

export default ProjectModal;
