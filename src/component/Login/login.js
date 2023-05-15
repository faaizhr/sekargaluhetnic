import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { gql, useQuery, useLazyQuery } from "@apollo/client"
import Cookies from "js-cookie";
import { v4 as uuidv4 } from 'uuid';

import style from "./Login.module.css"
import LoadingSvg from "../Loading/LoadingSvg";
import AOS from 'aos';
import 'aos/dist/aos.css';

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";

const GetLogin = gql `
query MyQuery($_eq: String!, $_eq1: String!) {
  sekargaluhetnic_user(where: {email: {_eq: $_eq}, password: {_eq: $_eq1}}) {
    email
    id
    name
    password
    telephone
  }
}
`

function Login() {
  AOS.init();

  const[getUser, { data, loading, error}] = useLazyQuery(GetLogin);

  const navigate = useNavigate();
  const [loginSuccess, setLoginSuccess] = useState("");
  const [loginFailed, setLoginFailed] = useState("");
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;


  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleInput = (e) => {
    
    const name = e.target.name;
    const value = e.target.value;

    setValues({
      ...values,
      [name]: value,
    });
    // setTimeout(e, 1000);
  };

  useEffect(() => {
    if(data?.sekargaluhetnic_user.length === 1) {
      // console.log("data", data?.sekargaluhetnic_user[0]?.id);
      setLoginSuccess("Login Berhasil, Harap Tunggu....")
      Cookies.set("token", uuidv4(), {expires: 1 });
      Cookies.set("okogaye", data?.sekargaluhetnic_user[0]?.id, {expires: 1 });
      return navigate ("/")
    } 
  }, [data]);

  const login = (e) => {
    getUser({
        variables: {
            _eq: values.email,
            _eq1: values.password,
        }
    })
    e.preventDefault();
}

  // ====================================================================

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values?.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

    return(
        <div className={style.loginBackground}>
          <div 
            data-aos="fade-down"
            data-aos-duration="1500"
            className={`grid lg:grid-cols-2 ${style.loginContainer}`}
          >
            <div className={`px-5 ${style.loginForm}`}>
              <h1 className="mt-4 mb-4">Masuk</h1>
              <form onSubmit={login}>
                <div className="mb-3">
                  <h6 className="">Alamat Email</h6>
                  <FormControl fullWidth>
                    <TextField
                      // focused
                      required
                      error={errorMessageEmail === "" ? false : true}
                      fullWidth
                      labelId="email"
                      id="email"
                      label="Email"
                      name="email"
                      type="text"
                      onChange={handleInput}
                      helperText={errorMessageEmail}
                    />
                  </FormControl>
                </div>
                <div>
                  <h6 className="">Kata Sandi</h6>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="standard-adornment-password">
                      Kata Sandi
                    </InputLabel>
                    <OutlinedInput
                      required
                      error={errorMessagePassword === "" ? false : true}
                      name="password"
                      id="outlined-adornment-password"
                      type={values?.showPassword ? "text" : "password"}
                      onChange={handleInput}
                      helperText={errorMessagePassword}
                      endAdornment={
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                            {values.showPassword ? (
                              <VisibilityOff />
                              ) : (
                                <Visibility />
                                )}
                          </IconButton>
                      }
                      label="Password"
                      />
                    <FormHelperText error>
                      {errorMessagePassword}
                    </FormHelperText>
                  </FormControl>
                </div>
                {data && <h4 className={style.loginFailed}>Email atau kata sandi salah!!</h4>}
                
                <div className={style.loginButton}>
                  <button type="submit">
                  { loading ? <LoadingSvg/> : "Masuk"}
                  </button>
                </div>
              </form>
              <p className={`mt-3 text-center`}>Belum punya akun?<span className={style.loginDaftar}><a href="/register"> Daftar</a></span></p>
            </div>

            <div className="lg:block hidden" >
              <img className="w-full h-full object-cover" src="https://firebasestorage.googleapis.com/v0/b/chiliesious-a5086.appspot.com/o/SekarGaluhEtnic%2FLogin%2Fsewing-keeps-my-mind-relaxed-cropped-shot-female-tailor-working-new-project-making-clothes-with-sewing-machine-workshop-being-busy-young-designer-making-her-ideas-come-true%20(1).jpg?alt=media&token=3e9cd4f8-b944-4ab1-a33b-e9d78ce20071"></img>
            </div>
            
          </div>
        </div>
    )
}

export default Login