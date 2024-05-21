import { useState } from "react"
import cns from "classnames"
import style from "./index.module.less"
export const ViewSelector: React.FC<{
    onChange: (tab: string) => void
}> = (props) => {
    const tabs = ["preview", "js"]
    const [activeTab, setActiveTab] = useState("preview")
    function changeTab(tab: string) {
        if (tab !== activeTab) {
            setActiveTab(tab)
            props.onChange(tab)
        }
    }
    return (
        <div className={style.selector}>
            {tabs.map((item, index) => {
                return (
                    <div
                        key={index + item}
                        className={cns(
                            style.item,
                            activeTab === item && style.active
                        )}
                        onClick={() => changeTab(item)}
                    >
                        {item}
                    </div>
                )
            })}
        </div>
    )
}
