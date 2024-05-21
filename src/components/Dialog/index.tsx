import React, { memo, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import style from "./index.module.less"
export const Dialog: React.FC<{
    content: React.ReactNode
    visible: boolean
}> = (props) => {
    return (
        <div>
            {props.visible &&
                createPortal(
                    <div className={style.dialog}>{props.content}</div>,
                    document.querySelector("#root")
                )}
        </div>
    )
}
