'use client'
import {
	createContext,
	ForwardedRef,
	forwardRef,
	HTMLAttributes,
	PropsWithChildren,
	useContext,
	useEffect,
	useRef
} from 'react'
import { Slot } from "@radix-ui/react-slot"
import { cn, mergeRefs } from '@/lib'

import styles from './MyPopover.module.css'
import {
    IPopoverCloseProps,
	type IPopoverContext,
	type IPopoverInputProps,
	type IPopoverProps,
	type IPopoverTriggerProps
} from './MyPopover.types'
import { createPortal } from 'react-dom'
import { usePopoverClickOutside, useDisclosure } from './MyPopover.hooks'

const PopoverContext = createContext<IPopoverContext>({} as IPopoverContext)
const usePopover = () => useContext(PopoverContext)

export const Popover = ({
	children,
	toggleMode,
	className,
	canOpen,
	onOpenChange,
	defaultOpen,
}: PropsWithChildren<IPopoverProps>) => {
	const { isOpen, onOpen, onClose, onToggle } = useDisclosure(defaultOpen)
	const ref = useRef<HTMLDivElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const triggerRef = useRef<HTMLDivElement | HTMLLabelElement | null>(null)

	usePopoverClickOutside(ref, contentRef, onClose)

	useEffect(() => {
		onOpenChange?.(isOpen)
	}, [isOpen])

	useEffect(() => {
		if (!isOpen) return

		const trigger = triggerRef.current
		const content = contentRef.current

		

		if (trigger && content) {
			const triggerPosition = trigger.getBoundingClientRect()

			const scrollTop = document.documentElement.scrollTop

			content.style.top =
				triggerPosition.top + scrollTop + triggerPosition.height + 'px'

			content.style.left = triggerPosition.left + 'px'
			content.style.width = trigger.clientWidth + 'px'
		}
	}, [isOpen])

	return (
		<PopoverContext.Provider
			value={{
				isOpen,
				onOpen,
				onClose,
				ref,
				contentRef,
				onToggle,
				toggleMode,
				canOpen,
				triggerRef
			}}
		>
			<div className={cn(styles.wrapper, className)} ref={ref}>
				{children}
			</div>
		</PopoverContext.Provider>
	)
}

export const PopoverTrigger = forwardRef(function PopoverTrigger(
	props: IPopoverTriggerProps,
	ref: ForwardedRef<HTMLDivElement>
) {
	const { onOpen, toggleMode, onToggle, triggerRef } = usePopover()

	if (typeof props.children === 'function')
		return (
			<div {...props} ref={ref} className={cn(props.className)}>
				{props.children(toggleMode ? onToggle : onOpen)}
			</div>
		)

	return (
		<div
			onFocus={(event) => {
				props?.onFocus?.(event)
			}}
			onClick={(event) => {
				toggleMode ? onToggle() : onOpen()
				props?.onClick?.(event)
			}}
			{...props}
			ref={mergeRefs(ref, triggerRef)}
			className={cn(props.className)}
		>
			{props.children}
		</div>
	)
})

export const PopoverContent = forwardRef(function PopoverContent(
	props: HTMLAttributes<HTMLDivElement>,
	ref: ForwardedRef<HTMLDivElement>
) {
	const { isOpen, canOpen, contentRef } = usePopover()

	if (!isOpen) return null

	return createPortal(
		<div {...props} ref={mergeRefs(ref, contentRef)} className={styles.content}>
			{typeof canOpen === 'boolean' ? (
				canOpen ? (
					<div className={cn(styles.content__inner, props.className)}>
						{props.children}
					</div>
				) : null
			) : (
				<div className={cn(styles.content__inner, props.className)}>
					{props.children}
				</div>
			)}
		</div>,
		document.body
	)
})

export const PopoverClose = forwardRef(function PopoverClose({asChild, ...props}:IPopoverCloseProps, ref:ForwardedRef<HTMLElement>) {
	
		const {onClose} = usePopover()
		const Comp = asChild ? Slot : "button"
		return (
		  <Comp
			{...props}
			onClick={(event) => {
				props.onClick?.(event)
				onClose()
			}}
			ref={ref}
		  />
		)
	
})