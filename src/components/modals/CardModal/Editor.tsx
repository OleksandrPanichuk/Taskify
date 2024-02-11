'use client'

import { useMemo } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css'
import 'react-quill/dist/quill.snow.css'
interface EditorProps {
	onChange: (content: string) => void
	initialContent: string | null

}

export const Editor = ({
	onChange,
	initialContent,
}: EditorProps) => {
	const modules = useMemo(
		() => ({
			toolbar: {
				container: [
					[{ header: [1, 2, 3, 4, false] }],
					['bold', 'italic', 'underline', 'blockquote'],
					[{ color: [] }],
					[
						{ list: 'ordered' },
						{ list: 'bullet' },
						{ indent: '-1' },
						{ indent: '+1' }
					],
					['link'],
					['clean']
				]
			},
			clipboard: {
				matchVisual: true
			}
		}),
		[]
	)
	const formats = [
		'header',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'list',
		'bullet',
		'indent',
		'link',
		'color',
		'clean'
	]

	return (
		<ReactQuill
			formats={formats}
			onChange={onChange}
			modules={modules}
			defaultValue={initialContent ?? ''}
			className="bg-zinc-100 text-black "
			theme="snow"
		/>
	)
}
interface EditorOutputProps {
	content: string
}

export const EditorOutput = ({ content }: EditorOutputProps) => {
	return <ReactQuill className='bg-background rounded-md' theme={'bubble'} value={content} readOnly  />
}
