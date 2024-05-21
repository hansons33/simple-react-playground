export const getIframeUrl = (iframeRaw: string) => {
    return URL.createObjectURL(new Blob([iframeRaw], { type: "text/html" }))
}
