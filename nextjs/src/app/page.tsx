'use client';
import { Button } from '@/components/ui/button';
import { createProject, getProjects } from '@/lib/directus/fetchers';
import { prettyPrintJson } from '@/lib/utils';
import { useState } from 'react';

export default function Page() {
	const [projects, setProjects] = useState<Awaited<ReturnType<typeof getProjects>>>([]);

	const loadProjects = async () => {
		const data = await getProjects();
		setProjects(data);
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
						<span className="text-bold font-bold">Project #{project.id}</span>
						{prettyPrintJson(project)}
					</div>
				))}
			</div>
		</div>
	);
}
