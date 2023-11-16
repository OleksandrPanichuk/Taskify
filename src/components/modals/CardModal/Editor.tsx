'use client'
import { BlockNoteEditor, PartialBlock } from '@blocknote/core'
import { BlockNoteView, useBlockNote } from '@blocknote/react'
import '@blocknote/core/style.css'

interface EditorProps {
	onChange: (content: string) => void
	editable: boolean
	initialContent: string | null
	id: string
}

export const Editor = ({
	editable,
	onChange,
	initialContent,
	id
}: EditorProps) => {
	let content: PartialBlock[] = []
	try {
		content = initialContent
			? (JSON.parse(initialContent) as PartialBlock[])
			: []
	} catch {
		content = initialContent
			? [{ content: initialContent, type: 'paragraph' }]
			: []
	}
	const editor: BlockNoteEditor = useBlockNote({
		editable,
		initialContent: content,
		onEditorContentChange: (editor) => {
			onChange(JSON.stringify(editor.topLevelBlocks, null, 2))
		}
	})
	return (
		<BlockNoteView
			className="description-editor"
			id={id}
			editor={editor}
			theme={'light'}
		/>
	)
}
interface EditorOutputProps {
	content: string | null
}


export const EditorOutput = ({ content }: EditorOutputProps) => {
	try {
		const editor = useBlockNote({
			initialContent: content
				? (JSON.parse(content) as PartialBlock[])
				: undefined,
			editable: false
		})
		
		return (
			<BlockNoteView
				className="description-editor-output"
				editor={editor}
				theme={'light'}
			/>
		)
	} catch {
		
		return (
			<div className="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md">
				{content}
			</div>
		)
	}
}
