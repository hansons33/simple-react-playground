export const checkFileName = (fileName: string) => {
    if (!["tsx", "jsx", "css", "json"].includes(fileName.split(".").pop())) {
        return false
    }
    return true
}
