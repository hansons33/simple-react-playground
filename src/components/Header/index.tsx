import { useContext, useState } from "react"
import style from "./index.module.less"
import { icons } from "./utils"
import { PlaygoundContext } from "../../PlaygroundContext"
import { CopyToClipboard } from "react-copy-to-clipboard"
export const Header: React.FC = (props) => {
    const { theme, changeTheme, filesHash } = useContext(PlaygoundContext)
    console.log(theme)
    const [copyed, setCopyed] = useState(false)
    const shareUrl =
        window.self !== window.top
            ? `${window.parent.location.host}${window.parent.location.pathname}#${filesHash}`
            : `${location.host}${location.pathname}#${filesHash}`
    const copyLink = () => {
        setCopyed(true)
        setTimeout(() => {
            setCopyed(false)
        }, 3000)
    }
    return (
        <div className={style.header}>
            <div className={style.logo}>
                <img src={icons.ReactSvg} alt="" />
                <span>React Playground</span>
            </div>
            <div className={style.links}>
                {theme === "light" && (
                    <button
                        title="Toggle dark mode"
                        className={style.theme}
                        dangerouslySetInnerHTML={{ __html: icons.SunSvg }}
                        onClick={() => changeTheme("dark")}
                    />
                )}
                {theme === "dark" && (
                    <button
                        title="Toggle light mode"
                        className={style.theme}
                        dangerouslySetInnerHTML={{ __html: icons.MoonSvg }}
                        onClick={() => changeTheme("light")}
                    />
                )}

                <CopyToClipboard text={shareUrl} onCopy={copyLink}>
                    <button
                        title="Copy sharable URL"
                        dangerouslySetInnerHTML={{
                            __html: copyed ? icons.SuccessSvg : icons.ShareSvg,
                        }}
                        onClick={copyLink}
                    />
                </CopyToClipboard>
                <a
                    href="https://github.com/hansons33/simple-react-playground"
                    target="_blank"
                    title="View on GitHub"
                >
                    <button
                        dangerouslySetInnerHTML={{ __html: icons.GithubSvg }}
                    />
                </a>
            </div>
        </div>
    )
}
