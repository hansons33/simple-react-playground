import MonacoEditor, { Monaco } from "@monaco-editor/react"
import { useContext, useEffect, useMemo, useRef } from "react"
import { PlaygoundContext } from "../../../PlaygroundContext"
import { debounce, fileName2Language } from "../../../utils"
import { MonacoEditorConfig } from "./options"
import { File } from "../../../types"
import { createATA } from "./ata"
export default function Editor() {
    const { files, selectedFileName, theme, setFiles } =
        useContext(PlaygoundContext)
    const language = files?.[selectedFileName]?.language
    const editorRef = useRef(null)
    const file: File = files[selectedFileName] || ({} as any)
    useEffect(() => {
        editorRef.current?.focus()
    }, [files.name])

    const handleEditorChange = debounce((value: string) => {
        files[selectedFileName].value = value
        setFiles({
            ...files,
        })
    }, 250)
    const handleEditorDidMount = async (editor: any, monaco: Monaco) => {
        editorRef.current = editor
        // ignore save event
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
            editor.getAction("editor.action.formatDocument").run()
        })
        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            jsx: monaco.languages.typescript.JsxEmit.Preserve,
            esModuleInterop: true,
        })
        const ata = createATA((code, path) => {
            monaco.languages.typescript.typescriptDefaults.addExtraLib(
                code,
                `file://${path}`
            )
        })
        editor.onDidChangeModelContent(() => {
            ata(editor.getValue())
        })
        ata(editor.getValue())
        Object.entries(files).forEach(([key]) => {
            if (!monaco?.editor?.getModel(monaco.Uri.parse(`file:///${key}`))) {
                monaco?.editor?.createModel(
                    files[key].value,
                    fileName2Language(key),
                    monaco.Uri.parse(`file:///${key}`)
                )
            }
        })
    }

    return (
        <MonacoEditor
            language={language}
            className="react-playground-editor"
            height="100%"
            theme={`vs-${theme}`}
            path={file.name}
            value={file.value}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            options={{
                ...MonacoEditorConfig,
                ...{
                    theme: undefined,
                },
            }}
        ></MonacoEditor>
    )
}
