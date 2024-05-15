import { PlaygroundProvider } from "../../PlaygroundContext"
import { Header } from "../Header"
export default function Playground() {
    return (
        <PlaygroundProvider>
            <Header></Header>
        </PlaygroundProvider>
    )
}
