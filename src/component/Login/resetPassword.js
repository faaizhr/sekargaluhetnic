import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client"
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

import { ResetPasswordUser } from "../../graphql/mutation";

const GetLogin = gql `
query MyQuery($_eq: String!, $_eq1: String!) {
  sekargaluhetnic_user(where: {email: {_eq: $_eq}, password: {_eq: $_eq1}}) {
    email
    id
    name
    password
    telephone
    token
  }
}
`

const GetEmail = gql `
query MyQuery($_eq: String = "") {
  sekargaluhetnic_user(where: {token: {_eq: $_eq}}) {
    email
  }
}
`

function ResetPassword() {
  AOS.init();

  const search = window.location.pathname.substring(16, 28);
  const[getUser, { data, loading, error}] = useLazyQuery(GetLogin);
  const {data: dataEmail} = useQuery(GetEmail, {variables: { _eq: search}})

  const navigate = useNavigate();
  const [loginSuccess, setLoginSuccess] = useState("");
  const [loginFailed, setLoginFailed] = useState("");
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  console.log("cek email", dataEmail?.sekargaluhetnic_user[0].email)


  const [values, setValues] = useState({
    password: "",
    retypePassword: "",
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
  console.log("cek password", values.password)
  console.log("cek retypepassword", values.retypePassword)

  // useEffect(() => {
  //   if(data?.sekargaluhetnic_user.length === 1) {
  //     // console.log("data", data?.sekargaluhetnic_user[0]?.id);
  //     // setLoginSuccess("Login Berhasil, Harap Tunggu....")
  //     // Cookies.set("token", uuidv4(), {expires: 1 });
  //     // Cookies.set("okogaye", data?.sekargaluhetnic_user[0]?.id, {expires: 1 });
  //     // return navigate ("/")
  //   } 
  // }, [data]);

  const [resetPassword, {loading: loadingResetPassword}] = useMutation(ResetPasswordUser)

  const reset = (e) => {
    resetPassword({
        variables: {
            _eq: search,
            password: values.password
        }
    })
    e.preventDefault();
    setLoginSuccess("Anda berhasil me-reset password Anda, Harap melakukan login ulang menggunakan password baru Anda")
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

  const forgotPassword = () => {
    navigate("/forgot-password")
  }

  const backLogin = () => {
    navigate("/login")
  }

  
  // const params = new URLSearchParams(search);
  // const foo = params.get('bar');

  // console.log("search", window.location.pathname.substring(16, 28))

    return(
        <div className={style.loginBackground}>
          <div 
            data-aos="fade-down"
            data-aos-duration="1500"
            className={`grid lg:grid-cols-1 ${style.loginContainer}`}
          >
            {/* <div>
              <p>Halo {dataEmail?.sekargaluhetnic_user[0].email}, silahkan isi password baru Anda pada form yang sudah disediakan</p>
            </div> */}
            <div className={`px-5 ${style.loginForm}`}>
              <h1 className="mt-4 mb-4">Reset Password</h1>
              <p className="mb-5">Halo <span className="font-semibold underline">{dataEmail?.sekargaluhetnic_user[0].email}</span>, silahkan isi password baru Anda pada form yang sudah disediakan . . .</p>
              <form onSubmit={reset}>
                <div className="mb-2">
                  <h6 className="">Kata Sandi Baru</h6>
                  <FormControl fullWidth variant="outlined">
                    {/* <InputLabel htmlFor="standard-adornment-password">
                      Kata Sandi
                    </InputLabel> */}
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
                <div>
                  <h6 className="">Ulangi Kata Sandi Baru</h6>
                  <FormControl fullWidth variant="outlined">
                    {/* <InputLabel htmlFor="standard-adornment-password">
                      Kata Sandi
                    </InputLabel> */}
                    <OutlinedInput
                      required
                      error={errorMessagePassword === "" ? false : true}
                      name="retypePassword"
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

                <p>{loginSuccess}</p>
                
                <div className={style.loginButton}>
                  <button className="mb-10" type="submit">
                  { loading ? <LoadingSvg/> : "Submit"}
                  </button>
                </div>
              </form>
              <p className="mb-5 text-sm text-secondary hover:text-black cursor-pointer hover:underline" onClick={backLogin}> &lt; Kembali</p>
            </div>

            {/* <div className="lg:block hidden" >
              <img className="w-full h-full object-cover" src="https://firebasestorage.googleapis.com/v0/b/chiliesious-a5086.appspot.com/o/SekarGaluhEtnic%2FLogin%2Fsewing-keeps-my-mind-relaxed-cropped-shot-female-tailor-working-new-project-making-clothes-with-sewing-machine-workshop-being-busy-young-designer-making-her-ideas-come-true%20(1).jpg?alt=media&token=3e9cd4f8-b944-4ab1-a33b-e9d78ce20071"></img>
            </div>
             */}
          </div>
        </div>
    )
}

export default ResetPassword