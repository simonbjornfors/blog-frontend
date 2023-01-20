import logo from "./logo.svg";
import "./App.css";
import { TimeLine } from "./components/index";

function App() {
  return (
    <div>
      <div class="bg-image"></div>
      <header></header>
      <div className="App">
        <TimeLine />
      </div>
    </div>
  );
}

export default App;
