'use client';
import '@/styles/globals.css';
import '@/styles/fonts.css';
import { ReactNode } from 'react';

import { ThemeProvider } from '@/components/ui/ThemeProvider';

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="mx-[8vw] my-[5vh] antialiased font-sans flex flex-col min-h-screen">
				<ThemeProvider>
					<main className="flex-grow">{children}</main>
				</ThemeProvider>
			</body>
		</html>
	);
}
