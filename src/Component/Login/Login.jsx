import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import "./Login.css"
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../Redux/userSlice";
const Login = () => {
  let [password, setPassword] = useState("")
  let [email, setEmail] = useState("")
  let navigate = useNavigate()

  // useSelector est une fonction qui permet de recuperer une variable depuis le store
  const { status, error } = useSelector(state => state.user);

  // Executer une action depuis le store
  const dispatch = useDispatch();


  async function connection(e) {
    e.preventDefault()
    let body = {
      "email":email,
      "password": password,
    }
    await dispatch(login(body));
  }

  useEffect(() => {
    // Si le status est 'success', on navigue
    if (status === 'success') {
      navigate('/home');
    } else if (status === 'failed'){
      console.log(error)
    }
  }, [status]);

  return (
    <div id={"login"}>
      <div id={"containerLogin"}>
        <h1></h1>
        <form onSubmit={(e) => connection(e)}>
          <div className={"inputLogin"}>
            <label>Email:</label>
            <input onChange={(e) => setEmail(e.target.value)} value={email}/>
          </div>
          <div className={"inputLogin"}>
            <label>mot de passe:</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
          </div>
          <button>Connexion</button>
        </form>
      </div>
    </div>
  )
};

export default Login;