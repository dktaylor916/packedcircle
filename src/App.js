import PackedCircleChart from "./PackedCircleChart";
import Sources from "./Sources";
import Legend from "./Legend";
import Title from "./Title";

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
