import { useContext, useRef, useState } from "react"
import { PlaygoundContext } from "../../PlaygroundContext"
import style from "./index.module.less"
import { Allotment } from "allotment"
import "allotment/dist/style.css"
import Editor from "./Editor"
import Sandbox from "../Sandbox"
import { Selector } from "../FileSelector"
export const EditorContainer: React.FC = (props: {
    defaultSizes: number[]
}) => {
    const { defaultSizes = [100, 100] } = props
    const ref = useRef<any>(null)
    const SplitLinePosition = {
        LEFT: [0, Infinity],
        CENTER: defaultSizes,
        RIGHT: [Infinity, 0],
    }
    const [SplitLine, setSplitLine] = useState(SplitLinePosition.CENTER)
    const hiddenLeft =
        JSON.stringify(SplitLine) === JSON.stringify(SplitLinePosition.LEFT)
    const hiddenRight =
        JSON.stringify(SplitLine) === JSON.stringify(SplitLinePosition.RIGHT)
    const resize = () => {
        if (
            JSON.stringify(SplitLine) !==
            JSON.stringify(SplitLinePosition.CENTER)
        ) {
            ref.current.resize(SplitLinePosition.CENTER)
            setSplitLine(SplitLinePosition.CENTER)
            return true
        }
        return false
    }
    return (
        <div className={style["editor-container"]}>
            <Allotment defaultSizes={defaultSizes}>
                <Allotment.Pane minSize={0} snap>
                    <Selector></Selector>
                    <Editor></Editor>
                </Allotment.Pane>
                <Allotment.Pane minSize={0} snap>
                    <Sandbox></Sandbox>
                </Allotment.Pane>
            </Allotment>
        </div>
    )
}
