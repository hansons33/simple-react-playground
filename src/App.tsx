import { PlaygroundProvider } from "./PlaygroundContext"
import Playground from "./components/Playground"
export default function App() {
    return (
        <PlaygroundProvider>
            <Playground></Playground>
        </PlaygroundProvider>
    )
}
