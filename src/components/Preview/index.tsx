import { useEffect, useRef } from "react"
import { PreviewData } from "../../types"
import iframeRaw from "./iframe.html?raw"
import { getIframeUrl } from "./utils"
const iframeUrl = getIframeUrl(iframeRaw)
export const Preview: React.FC<{ data: PreviewData; hidden: Boolean }> = (
    props
) => {
    const { data, hidden } = props
    const iframeRef = useRef<HTMLIFrameElement>(null)
    useEffect(() => {
        if (!data) return
        iframeRef.current.contentWindow.postMessage(data)
    }, [data])
    useEffect(() => {
        window.addEventListener("message", handleMessage)
        return () => {
            window.removeEventListener("message", handleMessage)
        }
    }, [])
    function handleMessage(msg) {
        const { type } = msg.data
        if (type === "LOADED") {
            iframeRef.current?.contentWindow?.postMessage(data)
        } else if (type === "ERROR") {
            console.log("ERROR")
        }
    }

    return (
        <iframe
            src={iframeUrl}
            ref={iframeRef}
            style={{
                width: "100%",
                height: "100%",
                padding: 0,
                border: "none",
                display: hidden ? "none" : "",
            }}
            sandbox="allow-popups-to-escape-sandbox allow-scripts allow-popups allow-forms allow-pointer-lock allow-top-navigation allow-modals allow-same-origin"
        ></iframe>
    )
}
