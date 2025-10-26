import { Project } from '@/types/directus-schema';
import { getDirectus } from '../directus';

export const createCard = async () => {
	const { createItem, directus } = getDirectus();
	console.log(await directus.request(createItem('card', { description: 'test description', title: 'test title' })));
	await getCards();
};

export const getCards = async () => {
	const { readItems, directus } = getDirectus();

	return await directus.request(readItems('card', { sort: '-id' }));
};

export const updateCard = async (id: string | number, newCard: Partial<Project>) => {
	delete newCard.user_created;
	delete newCard.user_updated;
	delete newCard.date_created;
	delete newCard.date_updated;
	delete newCard.id;

	const { updateItem, directus } = getDirectus();

	return await directus.request(updateItem('card', id, newCard));
};
