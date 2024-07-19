'use client'
import { Link, RichTextEditor, getTaskListExtension } from '@mantine/tiptap'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import SubScript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TaskItem from '@tiptap/extension-task-item'
import TipTapTaskList from '@tiptap/extension-task-list'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { createLowlight } from 'lowlight'

import cpp from 'highlight.js/lib/languages/cpp'
import csharp from 'highlight.js/lib/languages/csharp'
import dart from 'highlight.js/lib/languages/dart'
import go from 'highlight.js/lib/languages/go'
import java from 'highlight.js/lib/languages/java'
import js from 'highlight.js/lib/languages/javascript'
import python from 'highlight.js/lib/languages/python'
import scss from 'highlight.js/lib/languages/scss'
import swift from 'highlight.js/lib/languages/swift'
import ts from 'highlight.js/lib/languages/typescript'

const lowlight = createLowlight({
	ts,
	java,
	js,
	scss,
	cpp,
	dart,
	go,
	csharp,
	python,
	swift
})

lowlight.register({})

import '@mantine/tiptap/styles.css'
import { PipetteIcon } from 'lucide-react'
import styles from'./Editor.module.scss'

interface EditorProps {
	onChange: (content: string) => void
	initialContent: string | null
}

const useTipTapEditor = (
	content: string | null,
	onChange?: (content: string) => void
) => {
	return useEditor({
		extensions: [
			StarterKit.configure({ codeBlock: false }),
			Underline,
			Link,
			Superscript,
			SubScript,
			Highlight,
			TextAlign.configure({ types: ['heading', 'paragraph'] }),
			TextStyle,
			Color,
			CodeBlockLowlight.configure({ lowlight }),
			getTaskListExtension(TipTapTaskList),
			TaskItem.configure({
				nested: true,
				HTMLAttributes: {
					class: 'test-item'
				}
			})
		],
		content: content ? JSON.parse(content) : {},
		onUpdate: (props) => {
			onChange?.(JSON.stringify(props.editor.getJSON()))
		}
	})
}

export const Editor = ({ onChange, initialContent }: EditorProps) => {
	const editor = useTipTapEditor(initialContent, onChange)

	return (
		<RichTextEditor className={styles.editor} editor={editor}>
			<RichTextEditor.Toolbar sticky>
				<RichTextEditor.ControlsGroup>
					<RichTextEditor.Bold />
					<RichTextEditor.Italic />
					<RichTextEditor.Underline />
					<RichTextEditor.Strikethrough />
					<RichTextEditor.ClearFormatting />
					<RichTextEditor.Highlight />
					<RichTextEditor.CodeBlock />
				</RichTextEditor.ControlsGroup>

				<RichTextEditor.ControlsGroup>
					<RichTextEditor.H1 />
					<RichTextEditor.H2 />
					<RichTextEditor.H3 />
					<RichTextEditor.H4 />
				</RichTextEditor.ControlsGroup>

				<RichTextEditor.ControlsGroup>
					<RichTextEditor.Blockquote />
					<RichTextEditor.Hr />
					<RichTextEditor.BulletList />
					<RichTextEditor.OrderedList />
					<RichTextEditor.Subscript />
					<RichTextEditor.Superscript />
				</RichTextEditor.ControlsGroup>

				<RichTextEditor.ControlsGroup>
					<RichTextEditor.Link />
					<RichTextEditor.Unlink />
				</RichTextEditor.ControlsGroup>

				<RichTextEditor.ColorPicker
					colors={[
						'#25262b',
						'#868e96',
						'#fa5252',
						'#e64980',
						'#be4bdb',
						'#7950f2',
						'#4c6ef5',
						'#228be6',
						'#15aabf',
						'#12b886',
						'#40c057',
						'#82c91e',
						'#fab005',
						'#fd7e14'
					]}
				/>

				<RichTextEditor.ControlsGroup>
					<RichTextEditor.Control interactive={false}>
						<PipetteIcon size="1rem" />
					</RichTextEditor.Control>
					<RichTextEditor.Color color="#F03E3E" />
					<RichTextEditor.Color color="#7048E8" />
					<RichTextEditor.Color color="#1098AD" />
					<RichTextEditor.Color color="#37B24D" />
					<RichTextEditor.Color color="#F59F00" />
				</RichTextEditor.ControlsGroup>

				<RichTextEditor.ControlsGroup>
					<RichTextEditor.TaskList />
					<RichTextEditor.TaskListLift />
					<RichTextEditor.TaskListSink />
				</RichTextEditor.ControlsGroup>

				<RichTextEditor.ControlsGroup>
					<RichTextEditor.AlignLeft />
					<RichTextEditor.AlignCenter />
					<RichTextEditor.AlignJustify />
					<RichTextEditor.AlignRight />
				</RichTextEditor.ControlsGroup>

				<RichTextEditor.ControlsGroup>
					<RichTextEditor.Undo />
					<RichTextEditor.Redo />
				</RichTextEditor.ControlsGroup>

				<RichTextEditor.UnsetColor />
			</RichTextEditor.Toolbar>

			<RichTextEditor.Content />
		</RichTextEditor>
	)
}
interface EditorOutputProps {
	content: string
}

export const EditorOutput = ({ content }: EditorOutputProps) => {
	const editor = useTipTapEditor(content)

	return (
		<RichTextEditor className={styles.editor} editor={editor} contentEditable={false}>
			<RichTextEditor.Content />
		</RichTextEditor>
	)
}
