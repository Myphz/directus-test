'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/types/directus-schema';
import { updateCard } from '@/lib/directus/fetchers/card';

type UpdateCardModalProps = {
	onClose: () => void;
	card: Card;
};

const READ_ONLY_KEYS = ['id', 'user_created', 'date_created', 'user_updated', 'date_updated'];

export function UpdateCardModal({ onClose, card }: UpdateCardModalProps) {
	const [formData, setFormData] = useState(card);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setFormData(card);
	}, [card]);

	const handleChange = (key: string, value: any) => {
		setFormData((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const handleSubmit = async () => {
		setIsLoading(true);
		try {
			console.log(formData);
			await updateCard(card.id, formData);
			onClose();
		} finally {
			setIsLoading(false);
		}
	};

	const editableFields = Object.keys(formData).filter((key) => !READ_ONLY_KEYS.includes(key));

	return (
		<Dialog open={true} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Update Card #{card.id}</DialogTitle>
					<DialogDescription>Make changes to your card. Click save when you're done.</DialogDescription>
				</DialogHeader>

				<div className="grid gap-4 py-4">
					{editableFields.map((key) => (
						<div className="grid grid-cols-4 items-center gap-4" key={key}>
							<Label htmlFor={key} className="text-right capitalize">
								{key.replace('_', ' ')}
							</Label>
							<Input
								id={key}
								value={(formData[key as keyof typeof formData] as string) || ''}
								onChange={(e) => handleChange(key, e.target.value)}
								className="col-span-3"
								disabled={isLoading}
							/>
						</div>
					))}
				</div>

				<DialogFooter>
					<Button variant="outline" onClick={onClose} disabled={isLoading}>
						Cancel
					</Button>
					<Button onClick={handleSubmit} disabled={isLoading}>
						{isLoading ? 'Saving...' : 'Save changes'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
