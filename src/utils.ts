import { Files, Theme } from "./types"
export function debounce(fn: (...args: any[]) => void, n = 100) {
    let handle: any
    return (...args: any[]) => {
        if (handle) clearTimeout(handle)
        handle = setTimeout(() => {
            fn(...args)
        }, n)
    }
}
// 解码
export function atou(b64: string) {
    return decodeURIComponent(escape(atob(b64)))
}
// 编码
export function utoa(data: string) {
    return btoa(unescape(encodeURIComponent(data)))
}

const STORAGE_DARK_THEME = "react-playground-prefer-dark"

export const setPlaygroundTheme = (theme: Theme) => {
    localStorage.setItem(STORAGE_DARK_THEME, String(theme === "dark"))
    console.log(document.querySelectorAll('div[data-id="react-playground"]'))
    document
        .querySelectorAll('div[data-id="react-playground"]')
        ?.forEach((item) => item.setAttribute("class", theme))
}
export const getPlaygroundTheme = () => {
    const isDarkTheme = JSON.parse(
        localStorage.getItem(STORAGE_DARK_THEME) || "false"
    )
    return isDarkTheme ? "dark" : "light"
}
export const fileName2Language = (name: string) => {
    const suffix = name.split(".").pop() || ""
    if (["js", "jsx"].includes(suffix)) return "javascript"
    if (["ts", "tsx"].includes(suffix)) return "typescript"
    if (["json"].includes(suffix)) return "json"
    if (["css"].includes(suffix)) return "css"
    return "javascript"
}
// 从url hash中获取files
export const getFilesFromUrl = () => {
    let files: Files | undefined
    try {
        if (typeof window !== "undefined") {
            const hash = window.location.hash
            if (hash) files = JSON.parse(atou(hash?.split("#")[1]))
        }
    } catch (error) {
        console.error(error)
    }
    return files
}
