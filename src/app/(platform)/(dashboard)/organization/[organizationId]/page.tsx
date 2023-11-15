import { Separator } from '@/components/ui'
import { Suspense } from 'react'
import { BoardList, Info } from './_components'



export default async function OrganizationIdPage() {
	return (
		<div className="w-full mb-20">
			<Info  />
			<Separator className="my-4" />
			<div className="px-2 md:px-4">
				<Suspense fallback={<BoardList.Skeleton />}>
					<BoardList  />
				</Suspense>
			</div> 
		</div>
	)
}
