import { api } from "@/utils/api";
import { ProjectItem } from "./components/ProjectItem";
import { ProjectItemSkeleton } from "./components/ProjectItemSkeleton";

export function ProjectsList() {
  const { data: projects, isLoading } = api.project.getAll.useQuery();

  return (
    <div className="mx-auto grid w-full justify-center gap-6 pt-6 sm:grid-cols-2 md:max-w-screen-xl lg:grid-cols-3">
      {isLoading ? (
        <>
          <ProjectItemSkeleton />
          <ProjectItemSkeleton />
          <ProjectItemSkeleton />
        </>
      ) : (
        projects?.map(
          (project) =>
            project?.pictureUrl?.trim() && (
              <ProjectItem key={project.id} project={project} />
            ),
        )
      )}
    </div>
  );
}
