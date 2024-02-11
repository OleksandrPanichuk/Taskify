'use client'
import { ClerkProvider as NextClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'
import { PropsWithChildren } from 'react'

export const ClerkProvider = ({ children }: PropsWithChildren) => {
	const { theme } = useTheme()
	return (
		<NextClerkProvider
			appearance={{ baseTheme: theme === 'dark' ? dark : undefined }}
		>
			{children}
		</NextClerkProvider>
	)
}
