import { Files } from "./types"
import { fileName2Language, getFilesFromUrl } from "./utils"
import AppCss from "./template/App.css?raw"
import App from "./template/App.tsx?raw"
import main from "./template/main.tsx?raw"
import importMap from "./template/import-map.json?raw"
export const MAIN_FILE_NAME = "App.tsx"
export const ENTRY_FILE_NAME = "main.tsx"
export const IMPORT_MAP_FILE_NAME = "import-map.json"
export const initFiles: Files = getFilesFromUrl() || {
    [ENTRY_FILE_NAME]: {
        name: ENTRY_FILE_NAME,
        language: fileName2Language(ENTRY_FILE_NAME),
        value: main,
    },
    [MAIN_FILE_NAME]: {
        name: MAIN_FILE_NAME,
        language: fileName2Language(MAIN_FILE_NAME),
        value: App,
    },
    "App.css": {
        name: "App.css",
        language: "css",
        value: AppCss,
    },
    [IMPORT_MAP_FILE_NAME]: {
        name: IMPORT_MAP_FILE_NAME,
        language: fileName2Language(IMPORT_MAP_FILE_NAME),
        value: importMap,
    },
}
