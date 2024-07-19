import { checkSubscription } from '@/lib'

import { SubscriptionButton } from './_components'

import { Divider } from '@mantine/core'
import { Info } from '../_components'

const BillingPage = async () => {
	const isPro = await checkSubscription()

	return (
		<div className="w-full">
			<Info isPro={isPro} />
			<Divider className="my-2" />
			<SubscriptionButton isPro={isPro} />
		</div>
	)
}

export default BillingPage
