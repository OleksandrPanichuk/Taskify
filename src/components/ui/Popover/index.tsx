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
import { cn, mergeRefs } from '@/lib'

import styles from './Popover.module.scss'
import {
	IPopoverCloseProps,
	type IPopoverContext,
	type IPopoverInputProps,
	type IPopoverProps,
	type IPopoverTriggerProps
} from '@/components/ui/Popover/Popover.types'
import { createPortal } from 'react-dom'
import { useClickOutside, useDisclosure } from './Popover.hooks'
import { Slot } from '@radix-ui/react-slot'
import { PopoverPositioner } from './Popover.helpers'
import { usePathname } from 'next/navigation'

const PopoverContext = createContext<IPopoverContext>({} as IPopoverContext)
const usePopover = () => useContext(PopoverContext)

export const Popover = ({
	children,
	toggleMode,
	className,
	canOpen,
	onOpenChange,
	defaultOpen,
	side ='bottom',
	autoPosition,
	inheritWidth
}: PropsWithChildren<Partial<IPopoverProps>>) => {
	const { isOpen, onOpen, onClose, onToggle } = useDisclosure(defaultOpen)
	const ref = useRef<HTMLDivElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const triggerRef = useRef<HTMLDivElement | HTMLLabelElement | null>(null)

	const pathname = usePathname()

	useClickOutside(ref, contentRef, onClose)

	useEffect(() => {
		onOpenChange?.(isOpen)
	}, [isOpen, onOpenChange])

	useEffect(() => {
		onClose()
	}, [pathname])

	useEffect(() => {
		if (!isOpen) return
		if (typeof canOpen === 'boolean' && !canOpen) return

		const trigger = triggerRef.current
		const content = contentRef.current

		if (trigger && content) {
			const popover = new PopoverPositioner(trigger, content)
			popover.setPosition(side, autoPosition)

			if (inheritWidth) popover.setWidth()
		}
	}, [isOpen, side, inheritWidth, autoPosition, canOpen])

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

	if (typeof canOpen === 'boolean' && !canOpen) return null

	return createPortal(
		<div {...props} ref={mergeRefs(ref, contentRef)} className={styles.content}>
			
				<div className={cn(styles.content__inner,'my-4', props.className)}>
					{props.children}
				</div>
		</div>,
		document.body
	)
})

export const PopoverInput = forwardRef(function PopoverInput(
	{ wrapperClassName, iconLeft, iconRight, ...props }: IPopoverInputProps,
	ref: ForwardedRef<HTMLLabelElement>
) {
	const { onOpen, triggerRef } = usePopover()

	const IconLeft = () => iconLeft
	const IconRight = () => iconRight

	return (
		<label
			ref={mergeRefs(ref, triggerRef)}
			className={cn(styles.input__wrapper, wrapperClassName)}
		>
			<IconLeft />
			<input
				{...props}
				className={cn(styles.input, props.className)}
				onFocus={(event) => {
					onOpen()
					props.onFocus?.(event)
				}}
			/>
			<IconRight />
		</label>
	)
})

export const PopoverClose = forwardRef<HTMLButtonElement, IPopoverCloseProps>(
	function PopoverClose({ asChild, ...props }, ref) {
		const Comp = asChild ? Slot : 'button'
		const { onClose } = usePopover()
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
	}
)

Popover.Trigger = PopoverTrigger
Popover.Input = PopoverInput
Popover.Content = PopoverContent
Popover.Close = PopoverClose


export  * from './Popover.types'