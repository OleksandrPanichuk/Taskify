'use client'
import { ClerkProvider as NextClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { PropsWithChildren } from 'react'

export const ClerkProvider = ({ children }: PropsWithChildren) => {
	return (
		<NextClerkProvider appearance={{ baseTheme: dark }}>
			{children}
		</NextClerkProvider>
	)
}
