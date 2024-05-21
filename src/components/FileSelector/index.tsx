import { useContext, useEffect, useState } from "react"
import cns from "classnames"
import { PlaygoundContext } from "../../PlaygroundContext"
import style from "./index.module.less"
import { checkFileName } from "./utils"
import { Dialog } from "../Dialog"
import { ENTRY_FILE_NAME, IMPORT_MAP_FILE_NAME } from "../../files"
export const Selector: React.FC = () => {
    const {
        files,
        updateFileName,
        selectedFileName,
        addFile,
        setSelectedFileName,
    } = useContext(PlaygoundContext)
    const [activeTab, setActiveTab] = useState(selectedFileName)
    const [onEdit, setOnEdit] = useState(null)
    const [visible, setVisible] = useState(false)
    const [tabs, setTabs] = useState([])
    useEffect(() => {
        setTabs(
            Object.values(files).filter(
                (item) =>
                    ![ENTRY_FILE_NAME, IMPORT_MAP_FILE_NAME].includes(item.name)
            )
        )
    }, [files])
    function editFileName(fileName: string) {
        setOnEdit(fileName)
    }
    function checkEdit(e: any, oldFileName?: string) {
        if (e.key === "Enter") {
            const fileName = e.target.value
            if (checkFileName(fileName)) {
                if (oldFileName) {
                    updateFileName(oldFileName, fileName)
                } else {
                    addFile(fileName)
                    setActiveTab(fileName)
                }

                setOnEdit(null)
            } else {
                setVisible(true)
            }
        }
    }
    function changeTab(fileName: string) {
        setActiveTab(fileName)
        setSelectedFileName(fileName)
    }
    function createFile() {
        setOnEdit("create")
    }
    return (
        <div className={style.selector}>
            <Dialog content={"error"} visible={visible}></Dialog>
            {tabs.map((item) => {
                return (
                    <div
                        className={cns(
                            style.item,
                            !onEdit && activeTab === item.name && style.active
                        )}
                        key={item.name}
                        onClick={() => changeTab(item.name)}
                        onDoubleClick={() => editFileName(item.name)}
                        onBlur={() => setOnEdit(null)}
                    >
                        {onEdit === item.name ? (
                            <div className={style.onEdit}>
                                <input
                                    type="text"
                                    defaultValue={item.name}
                                    onKeyDown={(e) => checkEdit(e, item.name)}
                                    autoFocus={true}
                                />
                            </div>
                        ) : (
                            item.name
                        )}
                    </div>
                )
            })}
            <div
                className={style.item}
                onClick={createFile}
                onBlur={() => setOnEdit(null)}
            >
                +
                {onEdit === "create" && (
                    <div className={style.onEdit}>
                        <input
                            type="text"
                            onKeyDown={(e: any) => checkEdit(e)}
                            autoFocus={true}
                        />
                    </div>
                )}
            </div>
            <div
                className={cns(
                    style["import-map"],
                    !onEdit && activeTab === "import-map" && style.active
                )}
                onClick={() => setActiveTab("import-map")}
                onBlur={() => setOnEdit(null)}
            >
                import-map
            </div>
        </div>
    )
}
