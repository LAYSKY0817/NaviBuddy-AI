import "./css/app.css"
import {HashRouter} from "react-router-dom";
import RouterIndex from "./router";

function App() {
  return (
      <HashRouter>
          <RouterIndex/>
      </HashRouter>
  )
}

export default App
