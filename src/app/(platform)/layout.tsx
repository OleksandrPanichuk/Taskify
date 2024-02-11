import {
	ClerkProvider,
	ModalProvider,
	QueryProvider,
	ThemeProvider
} from '@/components/providers'

import { PropsWithChildren } from 'react'
import { Toaster } from 'sonner'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.scss'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`
	},
	description: siteConfig.description,
	icons: [
		{
			url: '/logo.svg',
			href: '/logo.svg'
		}
	]
}

const PlatformLayout = ({ children }: PropsWithChildren) => {
	return (
		<html suppressHydrationWarning lang="en">
			<body className={cn(inter.className)}>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					disableTransitionOnChange
				>
					<ClerkProvider>
						<QueryProvider>
							<ModalProvider />
							<Toaster richColors />
							{children}
						</QueryProvider>
					</ClerkProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}

export default PlatformLayout
