import { useContext } from "react"
import style from "./index.module.less"
import { icons } from "./utils"
import { PlaygoundContext } from "../../PlaygroundContext"
export const Header: React.FC = (props) => {
    console.log(icons)
    const { theme } = useContext(PlaygoundContext)
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
                        className={styles.theme}
                        dangerouslySetInnerHTML={{ __html: icons.SunSvg }}
                        onClick={() => changeTheme("dark")}
                    />
                )}
                {theme === "dark" && (
                    <button
                        title="Toggle light mode"
                        className={styles.theme}
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

                <button
                    title="Download project files"
                    dangerouslySetInnerHTML={{
                        __html: downloaded
                            ? icons.SuccessSvg
                            : icons.DownloadSvg,
                    }}
                    onClick={downloadProject}
                />

                <a
                    href="https://github.com/fewismuch/react-playground"
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
