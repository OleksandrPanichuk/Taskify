import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Footer, Navbar } from './_components'
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
const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html suppressHydrationWarning lang="en">
			<body className={cn(inter.className)}>
				<div className="h-full bg-slate-100">
					<Navbar />
					<main className="pt-40 pb-20 bg-slate-100">{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	)
}

export default MarketingLayout
