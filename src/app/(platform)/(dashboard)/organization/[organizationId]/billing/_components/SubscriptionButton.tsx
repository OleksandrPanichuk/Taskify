'use client'

import { toast } from 'sonner'

import { Button } from '@/components/ui'
import { stripeRedirect } from '@/actions/stripe-redirect'
import { useProModal, useAction } from '@/hooks'

interface SubscriptionButtonProps {
	isPro: boolean
}

export const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
	const proModal = useProModal()

	const { execute, isLoading } = useAction(stripeRedirect, {
		onSuccess: (data:string) => {
			window.location.href = data
		},
		onError: (error) => {
			toast.error(error)
		}
	})

	const onClick = () => {
		if (isPro) {
			execute({})
		} else {
			proModal.onOpen()
		}
	}

	return (
		<Button variant="primary" onClick={onClick} disabled={isLoading}>
			{isPro ? 'Manage subscription' : 'Upgrade to pro'}
		</Button>
	)
}
