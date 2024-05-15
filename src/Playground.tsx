import { Editor } from "@monaco-editor/react"
import { useEffect, useRef } from "react"
import CompilerWorker from "./compiler.worker.ts?worker&inline"
export default function PlayGround() {
    const editorRef = useRef(null as any)
    const workerRef = useRef<Worker>(null as any)
    const iframeRef = useRef<HTMLIFrameElement>(null as any)
    useEffect(() => {
        workerRef.current = new CompilerWorker()
        workerRef.current.onmessage = (e) => {
            console.log(e.data.data, "编译后的代码")
            iframeRef.current.contentWindow?.postMessage(e.data.data)
        }
    }, [])
    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor
    }
    function submit() {
        const code = editorRef.current.getValue()

        workerRef.current.postMessage(code)
    }

    return (
        <div className="container">
            <div style={{ width: "50%" }}>
                <Editor
                    height="70vh"
                    defaultLanguage="javascript"
                    defaultValue="// some comment"
                    onMount={handleEditorDidMount}
                />
                <button onClick={submit}>提交</button>
            </div>
            <div style={{ flex: 1 }}>
                <iframe
                    src="../iframe.html"
                    ref={iframeRef}
                    style={{
                        width: "100%",
                        height: "100%",
                        padding: 0,
                        border: "none",
                    }}
                    sandbox="allow-popups-to-escape-sandbox allow-scripts allow-popups allow-forms allow-pointer-lock allow-top-navigation allow-modals allow-same-origin"
                ></iframe>
            </div>
        </div>
    )
}
