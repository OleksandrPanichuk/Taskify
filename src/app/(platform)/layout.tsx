import {
	ClerkProvider,
	ModalProvider,
	QueryProvider,
	ThemeProvider
} from '@/components/providers'

import { PropsWithChildren } from 'react'
import { Toaster } from 'sonner'

const PlatformLayout = ({ children }: PropsWithChildren) => {
	return (
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
	)
}

export default PlatformLayout
