import React from "react";
//import { useDispatch, useSelector } from "react-redux";
import "./App.css";
//import { decrement, increment, login, register } from "../../Redux/userSlice";
//import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Home/Home"; // Assurez-vous que le chemin d'importation est correct
import Register from "../Register/Register";
import Login from "../Login/Login";
import SecuredPage from "../SecuredPage";
import PrivateRoute from "../privateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/secured-page" // Corrige le nom de la route pour respecter la convention de nommage
          element={
            <PrivateRoute>
              <SecuredPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// import React from "react";
// //import { useDispatch, useSelector } from "react-redux";
// import "./App.css";
// //import { decrement, increment, login, register } from "../../Redux/userSlice";
// //import { useEffect } from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "../Home/Home";
// import Register from "../Register/Register";
// import Login from "../Login/Login";
// import SecuredPage from "../SecuredPage";
// import PrivateRoute from "../privateRoute";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/home" element={<Home />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route
//           path="/SecuredPage"
//           element={
//             <PrivateRoute>
//               <SecuredPage />
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
