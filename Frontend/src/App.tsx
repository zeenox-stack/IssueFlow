import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/appRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <main className="w-[100vw] h-[100vh]">
        <AppRoutes />
      </main>
    </BrowserRouter>
  );
}
