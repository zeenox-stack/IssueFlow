import React from "react";
import { useProjects } from "../../../Hooks/useGetProjects";
import ProjectModal from "../modal/ProjectModal"; 
import { getProjectLayout } from "../../../Utils/Utils";

const RenderProjects: React.FC<{ lIndex: number }> = React.memo(({ lIndex }) => {
  const { projects, loading } = useProjects();

  if (loading) return <div>Loading Projects...</div>;

  return (
    <section className={getProjectLayout(lIndex) + " mt-4 gap-2"}>
      {Array.from(projects.values()).map((project, idx) => (
        <ProjectModal
          id={project.id}
          title={project.title}
          description={project.description}
          key={idx}
        />
      ))}
    </section>
  );
});

export default RenderProjects;