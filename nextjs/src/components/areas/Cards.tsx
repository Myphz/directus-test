'use client';
import { Button } from '@/components/ui/button';
import { createCard, getCards } from '@/lib/directus/fetchers/card';
import { prettyPrintJson } from '@/lib/utils';
import { useState } from 'react';
import { UpdateCardModal } from '../modals/UpdateCardModal';

type Card = Awaited<ReturnType<typeof getCards>>[number];

export default function Cards() {
	const [cards, setCards] = useState<Card[]>([]);
	const [selectedCard, setSelectedCard] = useState<Card | null>(null);

	const loadCards = async () => {
		const data = await getCards();
		setCards(data);
	};

	const handleOpenModal = (project: Card) => {
		setSelectedCard(project);
	};

	const handleCloseModal = () => {
		setSelectedCard(null);
	};

	return (
		<div className="flex flex-col gap-12">
			<div className="flex gap-4">
				<Button onClick={createCard}>Create Card</Button>
				<Button onClick={loadCards}>Load Cards</Button>
			</div>

			<div className="flex flex-col gap-2">
				{cards.map((card) => (
					<div className="bg-gray-dark p-4 rounded-sm" key={card.id}>
						<div className="flex justify-between items-center mb-2">
							<span className="text-bold font-bold">Card #{card.id}</span>
							<Button variant="outline" size="sm" onClick={() => handleOpenModal(card)}>
								Update
							</Button>
						</div>
						{prettyPrintJson(card)}
					</div>
				))}
			</div>

			{selectedCard && <UpdateCardModal onClose={handleCloseModal} card={selectedCard} />}
		</div>
	);
}
