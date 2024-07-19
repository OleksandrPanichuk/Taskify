import {
	ClerkProvider,
	MantineProvider,
	ModalProvider,
	QueryProvider,
	Toaster
} from '@/components/providers'

import { PropsWithChildren } from 'react'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@mantine/core/styles.css'
import '../globals.scss'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib'
import { ColorSchemeScript } from '@mantine/core'

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
		<html suppressHydrationWarning lang="en" className='dark'>
			<head>
				<ColorSchemeScript />
			</head>
			<body className={cn(inter.className)}>
					<ClerkProvider>
						<QueryProvider>
							<MantineProvider>
								<ModalProvider />
								<Toaster />
								{children}
							</MantineProvider>
						</QueryProvider>
					</ClerkProvider>

			</body>
		</html>
	)
}

export default PlatformLayout
