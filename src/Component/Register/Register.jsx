import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../Redux/userSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  async function handleRegister(e) {
    e.preventDefault();
    let body = {
      name: name,
      email: email,
      password: password,
    };
    await dispatch(register(body));
  }

  useEffect(() => {
    if (status === "success") {
      // Redirection vers la page de connexion après l'inscription réussie
      navigate("/login");
    } else if (status === "failed") {
      console.log(error);
    }
  }, [status, navigate, error]);

  return (
    <div
      id="register"
      className="flex items-center justify-center h-screen bg-gray-100"
    >
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-xl font-bold mb-4">Inscription</h1>
        <form onSubmit={(e) => handleRegister(e)}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Nom:</label>
            <input
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email:</label>
            <input
              type="email"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Mot de passe:</label>
            <input
              type="password"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import "./Register.css";
// import { useDispatch, useSelector } from "react-redux";
// import { register } from "../../Redux/userSlice";

// const Register = () => {
//   let [name, setName] = useState("");
//   let [email, setEmail] = useState("");
//   let [password, setPassword] = useState("");
//   let navigate = useNavigate();

//   const { status, error } = useSelector(state => state.user);

//   const dispatch = useDispatch();

//   async function handleRegister(e) {
//     e.preventDefault();
//     let body = {
//       name: name,
//       email: email,
//       password: password,
//     };
//     await dispatch(register(body));
//   }

//   useEffect(() => {
//     if (status === 'success') {
//       navigate('/home');
//     } else if (status === 'failed') {
//       console.log(error);
//     }
//   }, [status, navigate, error]);

//   return (
//     <div id="register">
//       <div id="containerRegister">
//         <h1>Inscription</h1>
//         <form onSubmit={(e) => handleRegister(e)}>
//           <div className="inputRegister">
//             <label>Nom:</label>
//             <input onChange={(e) => setName(e.target.value)} value={name} />
//           </div>
//           <div className="inputRegister">
//             <label>Email:</label>
//             <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
//           </div>
//           <div className="inputRegister">
//             <label>Mot de passe:</label>
//             <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
//           </div>
//           <button>S'inscrire</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;
