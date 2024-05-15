import { createContext, useEffect, useState } from "react"
import { MAIN_FILE_NAME } from "./files"
import { Files, PlaygroundContext, Theme } from "./types"
import { fileName2Language, setPlaygroundTheme, utoa } from "./utils"

const initialContext: Partial<PlaygroundContext> = {
    selectedFileName: MAIN_FILE_NAME,
}

export const PlaygoundContext = createContext<PlaygroundContext>(
    initialContext as PlaygroundContext
)

export const PlaygroundProvider = (props: {
    children: React.ReactElement
    saveOnUrl?: boolean
}) => {
    const { children, saveOnUrl = true } = props
    const [files, setFiles] = useState<Files>({})
    const [theme, setTheme] = useState(initialContext.theme!)
    const [selectedFileName, setSelectedFileName] = useState(
        initialContext.selectedFileName!
    )
    const [fileHash, setFilesHash] = useState("")
    const addFile = (name: string) => {
        files[name] = {
            name,
            language: fileName2Language(name),
            value: "",
        }
        setFiles({ ...files })
    }
    const removeFile = (name: string) => {
        delete files[name]
        setFiles({ ...files })
    }
    const updateFileName = (oldFileName: string, newFileName: string) => {
        if (
            !files[oldFileName] ||
            newFileName === undefined ||
            newFileName === null
        )
            return
        const { [oldFileName]: value, ...rest } = files
        const newFile = {
            [newFileName]: {
                ...value,
                language: fileName2Language(newFileName),
                name: newFileName,
            },
        }
        setFiles({
            ...rest,
            ...newFile,
        })
    }
    const changeTheme = (theme: Theme) => {
        setPlaygroundTheme(theme)
        setTheme(theme)
    }
    useEffect(() => {
        const hash = utoa(JSON.stringify(files))
        if (saveOnUrl) window.location.hash = hash
        setFilesHash(hash)
    }, [files])

    return (
        <PlaygoundContext.Provider
            value={{
                theme,
                fileHash,
                addFile,
                updateFileName,
                removeFile,
                changeTheme,
                setFiles,
                setTheme,
                setSelectedFileName,
                selectedFileName,
                files,
            }}
        >
            {children}
        </PlaygoundContext.Provider>
    )
}
