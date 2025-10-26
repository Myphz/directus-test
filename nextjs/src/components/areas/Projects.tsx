'use client';
import { UpdateProjectModal } from '@/components/modals/UpdateProjectModal';
import { Button } from '@/components/ui/button';
import { createProject, getProjects } from '@/lib/directus/fetchers/project';
import { prettyPrintJson } from '@/lib/utils';
import { useState } from 'react';

type ProjectType = Awaited<ReturnType<typeof getProjects>>[number];

export default function Projects() {
	const [projects, setProjects] = useState<ProjectType[]>([]);
	const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

	const loadProjects = async () => {
		const data = await getProjects();
		setProjects(data);
	};

	const handleOpenModal = (project: ProjectType) => {
		setSelectedProject(project);
	};

	const handleCloseModal = () => {
		setSelectedProject(null);
	};

	return (
		<div className="flex flex-col gap-12">
			<div className="flex gap-4">
				<Button onClick={createProject}>Create project</Button>
				<Button onClick={loadProjects}>Load projects</Button>
			</div>

			<div className="flex flex-col gap-2">
				{projects.map((project) => (
					<div className="bg-gray-dark p-4 rounded-sm" key={project.id}>
						<div className="flex justify-between items-center mb-2">
							<span className="text-bold font-bold">Project #{project.id}</span>
							<Button variant="outline" size="sm" onClick={() => handleOpenModal(project)}>
								Update
							</Button>
						</div>
						{prettyPrintJson(project)}
					</div>
				))}
			</div>

			{selectedProject && <UpdateProjectModal onClose={handleCloseModal} project={selectedProject} />}
		</div>
	);
}
