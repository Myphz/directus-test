import { getDirectus } from './directus';

export const createProject = async () => {
	const { createItem, directus } = getDirectus();
	console.log(await directus.request(createItem('project', { description: 'test description', title: 'test title' })));
	await getProjects();
};

export const getProjects = async () => {
	const { readItems, directus } = getDirectus();

	return await directus.request(readItems('project', { sort: '-id' }));
};
