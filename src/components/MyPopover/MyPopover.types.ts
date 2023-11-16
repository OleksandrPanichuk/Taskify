import {
	HTMLAttributes,
	InputHTMLAttributes,
	MutableRefObject,
	RefObject
} from 'react'

export interface IPopoverContext {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
	onToggle: () => void
	toggleMode?: boolean
	ref: MutableRefObject<HTMLDivElement | null>
	canOpen?: boolean
	contentRef: RefObject<HTMLDivElement | null>
	triggerRef: RefObject<HTMLDivElement | HTMLLabelElement | null>
}

export interface IPopoverProps {
	toggleMode?: boolean
	className?: string
	canOpen?: boolean
	onOpenChange?: (isOpen: boolean) => void
	defaultOpen?: boolean
	
}

export interface IPopoverInputProps
	extends InputHTMLAttributes<HTMLInputElement> {
	iconLeft?: JSX.Element
	iconRight?: JSX.Element
	wrapperClassName?: string
}

// @ts-ignore
export interface IPopoverTriggerProps extends HTMLAttributes<HTMLDivElement> {
	children: ((triggerFunction: () => void) => JSX.Element) | JSX.Element | React.ReactNode
	asChild?:boolean
}


export interface IPopoverCloseProps extends HTMLAttributes<HTMLElement> {
	asChild?:boolean
}