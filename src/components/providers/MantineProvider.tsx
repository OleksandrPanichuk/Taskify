'use client'
import { MantineProvider as MantineBaseProvider } from '@mantine/core'
import { PropsWithChildren } from 'react'

export const MantineProvider = ({ children }: PropsWithChildren) => {
	return (
		<MantineBaseProvider defaultColorScheme={'dark'}>
			{children}
		</MantineBaseProvider>
	)
}
