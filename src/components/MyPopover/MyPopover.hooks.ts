import { RefObject, useEffect, useRef, useState } from 'react'

type ListenerEvent = MouseEvent & {
	target: Element
}

export const usePopoverClickOutside = (
	ref: RefObject<HTMLElement>,
	contentRef: RefObject<HTMLElement>,
	callback: (event: MouseEvent) => void
) => {
	const handlerRef = useRef(callback)

	useEffect(() => {
		handlerRef.current = callback
	})

	useEffect(() => {
		const listener = (event: ListenerEvent) => {
			if (ref && ref.current && contentRef && contentRef.current) {
				if (event.target.shadowRoot) {
					if (
						!event.target.shadowRoot.contains(ref.current) &&
						!event.target.shadowRoot.contains(contentRef.current)
					) {
						handlerRef.current(event)
					}
				} else {
					if (
						!ref.current.contains(event.target) &&
						!contentRef.current.contains(event.target)
					) {
						handlerRef.current(event)
					}
				}
			}
		}

		//@ts-ignore
		document.addEventListener('click', listener)
		//@ts-ignore
		document.addEventListener('touchstart', listener)

		return () => {
			//@ts-ignore
			document.removeEventListener('click', listener)
			//@ts-ignore
			document.removeEventListener('touchstart', listener)
		}
	})
}




type TypeUseDisclosure = {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
	onToggle: () => void
}

export const useDisclosure = (defaultOpen:boolean = false): TypeUseDisclosure => {
	const [isOpen, setIsOpen] = useState<boolean>(defaultOpen)

	const onOpen = () => setIsOpen(true)
	const onToggle = () => setIsOpen((prev) => !prev)
	const onClose = () => setIsOpen(false)

	return {
		isOpen,
		onClose,
		onOpen,
		onToggle
	}
}