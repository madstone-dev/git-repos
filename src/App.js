import { HashRouter, Route, Routes } from "react-router-dom";
import { ReposProvider } from "./ContextProviders/ReposProvider";
import Home from "./Pages/Home";
import Issue from "./Pages/Issue";
import Search from "./Pages/Search";

export default function App() {
  return (
    <ReposProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/issue" element={<Issue />} />
        </Routes>
      </HashRouter>
    </ReposProvider>
  );
}
