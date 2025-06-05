import { create } from "zustand";
import { handleGetProjects } from "../Services/api";

export interface ProjectType {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  ownerId: number;
  ownerName: string;
}

interface ProjectStoreType {
  projects: Map<string, ProjectType>;
  fetchProjects: () => void;
  setProject: (slug: string, data: ProjectType) => void;
  getProject: (slug: string) => ProjectType | undefined; 
  deleteProject: (slug: string) => void;
}

export const useProjectStore = create<ProjectStoreType>((set, get) => ({
  projects: new Map([
    [
      "dummy",
      {
        id: "",
        title: "",
        description: "",
        createdAt: "",
        ownerId: 0,
        ownerName: "",
      },
    ],
  ]),

  fetchProjects: async () => {
    try {
      const { projects, ownerName } = await handleGetProjects();

      set((state) => {
        const newProjects = new Map(state.projects);

        projects.forEach((project: ProjectType) =>
          newProjects.set(project.id, { ...project, ownerName })
        );
        newProjects.delete("dummy");
        return { projects: newProjects };
      });
    } catch (err) {
      console.error("Error: ", err);
    }
  },

  setProject: (slug, data) =>
    set((state) => {
      const newProjects = new Map(state.projects);
      newProjects.set(slug, data);
      return { projects: newProjects };
    }),

  getProject: (slug) => get().projects.get(slug), 
  deleteProject: (slug) => {
    set((state) => {
      const oldProjects = state.projects; 
      oldProjects.delete(slug); 
      return { projects: oldProjects };
    })
  }
}));
