"use client"
import { useTheme } from 'next-themes'
import {Toaster as ToasterSonner} from 'sonner'

export const Toaster = () => {
	const {theme} = useTheme()
	return <ToasterSonner theme={theme as 'light' | 'dark' ?? 'dark'} />
};
