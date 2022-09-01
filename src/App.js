import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Admin from "./pages/Admin";
import Asylum from "./pages/Asylum";
import Crime from "./pages/Crime";
import Landing from "./pages/Landing";
import List from "./pages/List";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Loading from "./components/Loading";

import useAuthContext from "./hooks/useAuthContext";

function App() {
  const { authIsReady, user } = useAuthContext();
  return (
    <div className="App">
      {authIsReady ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={!user ? <Login /> : <Landing />} />
            <Route
              path="/register"
              element={!user ? <Register /> : <Landing />}
            />
            <Route
              path="/crimeform"
              element={
                user && user.displayName !== "asylum" ? <Crime /> : <Landing />
              }
            />
            <Route
              path="/asylumform"
              element={user ? <Asylum /> : <Landing />}
            />
            <Route path="/list" element={user ? <List /> : <Landing />} />
            <Route
              path="/admin"
              element={
                user && user.displayName === "admin" ? <Admin /> : <Landing />
              }
            />
          </Routes>
        </BrowserRouter>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default App;
