import { transform } from "@babel/standalone"
const babelTransform = (filename: string, code: string, files) => {
    const _code = beforeTransformCodeHandler(code, filename)
    let result = ""
    try {
        result = transform(_code, {
            presets: ["react", "typescript"],
            filename,
            plugins: [customResolver(files)],
        }).code!
    } catch (e) {
        self.postMessage({ type: "ERROR", error: e })
    }
    return result
}

self.addEventListener("message", async ({ data }) => {
    console.log("收到消息", data)
    try {
        if (typeof data === "string") {
            data = beforeTransformCodeHandler(data)
            self.postMessage({
                type: "UPDATE_FILE",
                data: transform(data, {
                    presets: ["react", "typescript"],
                    retainLines: true,
                    filename: "tempFileName",
                }).code,
            })
            return
        }
    } catch (e) {
        self.postMessage({ type: "ERROR", error: e })
    }
})
const customResolver = (files) => {
    return {
        visitor: {
            ImportDeclaration(path: any) {
                const moduleName: string = path.node.source.value
                if (moduleName.startsWith(".")) {
                    const module = getModuleFile(files, moduleName)
                    if (!module) return
                    if (module.name.endsWith(".css")) {
                        path.node.source.value = css2Js(module)
                    } else {
                        path.node.source.value = URL.createObjectURL(
                            new Blob(
                                [
                                    babelTransform(
                                        module.name,
                                        module.value,
                                        files
                                    ),
                                ],
                                {
                                    type: "application/javascript",
                                }
                            )
                        )
                    }
                }
            },
        },
    }
}
const getModuleFile = (files, moduleName: string) => {
    let _moduleName = moduleName.split("./").pop() || ""
    if (!_moduleName.includes(".")) {
        const realModuleName = Object.keys(files).find((key) =>
            key.split(".").includes(_moduleName)
        )
        if (realModuleName) _moduleName = realModuleName
    }
    return files[_moduleName]
}
export const beforeTransformCodeHandler = (code: string, fileName?: string) => {
    let _code = code
    // 如果没有引入React，开头添加React引用
    const regexReact = /import\s+React/g
    if (!regexReact.test(code)) {
        _code = `import React from 'react'; import ReactDOM from "react-dom/client"; \n${code}`
    }
    return _code
}
export const css2Js = (file) => {
    const randomId = new Date().getTime()
    const js = `
                    (() => {
                      let stylesheet = document.getElementById('style_${randomId}_${file.name}');
                      if (!stylesheet) {
                        stylesheet = document.createElement('style')
                        stylesheet.setAttribute('id', 'style_${randomId}_${file.name}')
                        document.head.appendChild(stylesheet)
                      }
                      const styles = document.createTextNode(\`${file.value}\`)
                      stylesheet.innerHTML = ''
                      stylesheet.appendChild(styles)
                    })()
                    `
    return URL.createObjectURL(
        new Blob([js], { type: "application/javascript" })
    )
}
