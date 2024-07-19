import { Suspense } from 'react'

import { Info } from '../_components'

import { checkSubscription } from '@/lib/subscription'
import { Divider } from '@mantine/core'
import { ActivityList } from './_components'

const ActivityPage = async () => {
	const isPro = await checkSubscription()

	return (
		<div className="w-full">
			<Info isPro={isPro} />
			<Divider className="my-2" />
			<Suspense fallback={<ActivityList.Skeleton />}>
				<ActivityList />
			</Suspense>
		</div>
	)
}

export default ActivityPage
