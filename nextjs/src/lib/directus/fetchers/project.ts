import { Project } from '@/types/directus-schema';
import { getDirectus } from '../directus';

export const createProject = async () => {
	const { createItem, directus } = getDirectus();
	console.log(await directus.request(createItem('project', { description: 'test description', title: 'test title' })));
	await getProjects();
};

export const getProjects = async () => {
	const { readItems, directus } = getDirectus();

	return await directus.request(readItems('project', { sort: '-id' }));
};

export const updateProject = async (id: string | number, newProject: Partial<Project>) => {
	delete newProject.user_created;
	delete newProject.user_updated;
	delete newProject.date_created;
	delete newProject.date_updated;
	delete newProject.id;

	const { updateItem, directus } = getDirectus();

	return await directus.request(updateItem('project', id, newProject));
};
