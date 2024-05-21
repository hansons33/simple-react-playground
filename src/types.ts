export type Theme = "light" | "dark"

export type File = {
    name: string
    value: string
    language: string
    active?: boolean
    hidden?: boolean
}
export type Files = {
    [key: string]: File
}

export type PlaygroundContext = {
    files: Files
    filesHash: string
    theme: Theme
    setTheme: (theme: Theme) => void
    setFiles: (files: Files) => void
    selectedFileName: string
    addFile: (fileName: string) => void
    removeFile: (fileName: string) => void
    updateFileName: (oldFieldName: string, newFieldName: string) => void
    changeTheme: (theme: Theme) => void
    setSelectedFileName: (fileName: string) => void
}
export type PreviewData = {
    compileCode: string
    importmap: string
}
