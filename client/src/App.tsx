import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Component/Login";
import NoteComp from "./Component/Notes";

import Signup from "./Component/SignUp";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/notes" element={<PrivateRoute>
              <NoteComp />
            </PrivateRoute>}/>
        <Route path="*" element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;
