import Header from "./Header";
import Content from "./Content";
import Sidebar from "./Sidebar";
import { ThemeProvider } from "./contexts/theme";

function App() {
  return (
    <ThemeProvider>
      <Header />
      <div
        style={{
          display: "flex",
        }}
      >
        <Sidebar />
        <Content />
      </div>
    </ThemeProvider>
  );
}

export default App;
