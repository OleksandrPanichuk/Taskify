import { Separator } from '@/components/ui'
import { Suspense } from 'react'
import { BoardList, Info } from './_components'



export default async function OrganizationIdPage() {
	// const isPro = await checkSubscription()
	return (
		<div className="w-full mb-20">
			<Info isPro={false} />
			<Separator className="my-4" />
			<div className="px-2 md:px-4">
				<Suspense fallback={<BoardList.Skeleton />}>
					<BoardList isPro={false} />
				</Suspense>
			</div> 
		</div>
	)
}
