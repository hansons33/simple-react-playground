import { PlaygoundContext } from "../../PlaygroundContext"
import { Header } from "../Header"
import { useContext, useEffect, useState } from "react"
import { EditorContainer } from "../EditorContainer"
import { initFiles } from "../../files"
export default function Playground() {
    const [hasInit, setHasInit] = useState(false)
    const { theme, setFiles } = useContext(PlaygoundContext)
    useEffect(() => {
        setFiles(initFiles)
        setHasInit(true)
    }, [])

    return (
        <div data-id="react-playground" className={theme}>
            <Header></Header>
            {hasInit && <EditorContainer></EditorContainer>}
        </div>
    )
}
