import Navbar from "./components/Navbar";
import AppRouter from "./routes/AppRouter";

const App = () => {
  return (
    <div className="relative flex flex-col items-center">
      <Navbar />
      <AppRouter />
    </div>
  );
};

export default App;
