import CompilerWorker from "./compiler.worker?worker&inline"
import { ViewSelector } from "../ViewSelector"
import { useContext, useEffect, useRef, useState } from "react"
import { IMPORT_MAP_FILE_NAME } from "../../files"
import { PreviewData } from "../../types"
import { PlaygoundContext } from "../../PlaygroundContext"
import { debounce } from "../../utils"
import { Preview } from "../Preview"
import MonacoEditor from "@monaco-editor/react"
export default function Sandbox() {
    const { files, selectedFileName } = useContext(PlaygoundContext)
    const [activeType, setActiveType] = useState<"preview" | "js">("preview")
    const [compiledFiles, setCompiledFiles] = useState<PreviewData>()
    const [compiledCode, setCompiledCode] = useState("")
    const workerRef = useRef(null)
    useEffect(() => {
        if (!Object.values(files).length) return
        if (!workerRef.current) {
            workerRef.current = new CompilerWorker()
            workerRef.current.addEventListener("message", ({ data }) => {
                if (data.type === "UPDATE_FILES") {
                    try {
                        JSON.parse(files[IMPORT_MAP_FILE_NAME].value)
                        data.data.importmap = files[IMPORT_MAP_FILE_NAME].value
                    } catch (error) {
                        console.error("importmap 解析错误:", error)
                    }
                    setCompiledFiles(data)
                } else if (data.type === "UPDATE_FILE") {
                    setCompiledCode(data.data)
                } else if (data.type === "ERROR") {
                    console.log(data)
                }
            })
        }
    }, [files])
    useEffect(() => {
        if (
            selectedFileName === IMPORT_MAP_FILE_NAME ||
            activeType === "preview"
        )
            return
        if (
            ["javascript", "typescript"].includes(
                files[selectedFileName]?.language
            )
        ) {
            workerRef.current?.postMessage(files[selectedFileName]?.value)
        } else {
            workerRef.current?.postMessage("")
        }
    }, [selectedFileName])
    useEffect(() => {
        sendCompiledCode()
    }, [activeType, files])
    function onChange(tab: "preview" | "js") {
        setActiveType(tab)
    }
    const sendCompiledCode = debounce(() => {
        if (activeType === "preview") workerRef.current?.postMessage(files)
        if (activeType === "js") {
            workerRef.current?.postMessage(files[selectedFileName].value)
        }
    }, 50)

    return (
        <>
            <ViewSelector onChange={onChange}></ViewSelector>
            <Preview
                data={compiledFiles}
                hidden={activeType !== "preview"}
            ></Preview>
            {activeType === "js" && <MonacoEditor value={compiledCode} />}
        </>
    )
}
