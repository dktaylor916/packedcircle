import PackedCircleChart from "./components/PackedCircleChart/PackedCircleChart";
import Sources from "./components/Sources/Sources";
import Legend from "./components/Legend/Legend";
import Title from "./components/Title/Title";

function App() {
  return (
    <div className="App">
      <Title />
      <Legend />
      <header className="App-header">
        <PackedCircleChart />
      </header>
      <Sources />
    </div>
  );
}

export default App;
