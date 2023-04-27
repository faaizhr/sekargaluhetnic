import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client"

import Navbar from "../Navbar/Navbar"
import style from "./Register.module.css"
import Footer from "../Footer/Footer"
import LoadingSvg from "../Loading/LoadingSvg";
import AOS from 'aos';
import 'aos/dist/aos.css';

import Slide from "@mui/material/Slide";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
// import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const GetUser = gql `
query MyQuery {
  sekargaluhetnic_user {
    telephone
    password
    name
    id
    email
  }
}
`

const GetRegister = gql `
mutation MyMutation($object: sekargaluhetnic_user_insert_input!) {
  insert_sekargaluhetnic_user_one(object: $object) {
    id
  }
}
`

function Register() {
  AOS.init();

  const {data: dataUser, loading: loadingGetUser, error: errorGetUser} = useQuery(GetUser)
  console.log("cek data user", dataUser?.sekargaluhetnic_user)
  const [insertUser, {loading: loadingInsertUser}] = useMutation(GetRegister, {refetchQueries: [GetUser]});

  const navigate = useNavigate();

  const [regisFailed, setRegisFailed] = useState("");
  const [regisSuccess, setRegisSuccess] = useState("");

  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const [errorMessageNama, setErrorMessageNama] = useState("")
  const [errorMessagePhoneNumber, setErrorMessagePhoneNumber] = useState("")

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const nameRegex = /^([^0-9]*)$/;
  const phoneNumberRegex = /^[0-9]*$/;


  const [values, setValues] = useState({
    nama: "",
    phoneNumber: "",
    email: "",
    password: "",
    showPassword: false,
  });

  const handleInput = (e) => {
    
    const name = e.target.name;
    const value = e.target.value;

    if (name === "email") {
      if (emailRegex.test(value)) {
        setErrorMessageEmail("");
      } else {
        setErrorMessageEmail("Email Tidak Sesuai !!!");
      }
    } else if (name === "password") {
      if(passwordRegex.test(value)) {
        setErrorMessagePassword("")
      } else {
        setErrorMessagePassword("Kata sandi harus mengandung 8 karakter, setidaknya 1 huruf dan 1 angka")
      }
    } else if (name === "nama") {
      if(nameRegex.test(value)) {
        setErrorMessageNama("")
      } else {
        setErrorMessageNama("Nama tidak boleh terdapat angka")
      }
    } else if (name === "phoneNumber") {
      if(phoneNumberRegex.test(value)) {
        setErrorMessagePhoneNumber("")
      } else {
        setErrorMessagePhoneNumber("Hanya boleh memasukkan angka")
      }
    }

    setValues({
      ...values,
      [name]: value,
    });
    // setTimeout(e, 1000);
  };

  // console.log("cek values daftar", values)

  const register = (e) => {
    const isValid = dataUser?.sekargaluhetnic_user?.find(el => {
      if(values.email === el.email) {
        return true;
      }
      return false;
    })
    console.log(isValid)

    if(isValid !== undefined || isValid !== null || isValid !== "") {
      setRegisFailed("Email sudah digunakan")
      e.preventDefault();
      if(isValid === undefined || isValid === null || isValid === "") {
        if(errorMessageEmail === "" && errorMessagePassword === "" && errorMessageNama === "" && errorMessagePhoneNumber === "") {
          insertUser({variables: {
            object: {
              name: values.nama,
              telephone: values.phoneNumber,
              email: values.email,
              password: values.password
            }
          }})
          setRegisFailed("")
          setRegisSuccess("Berhasil, Harap Tunggu...")
          setTimeout(() => {
            navigate("/login");
          }, 4000);
        } else 
        setRegisFailed("Ada data yang tidak sesuai, cek kembali input data Anda")
        e.preventDefault();
      }
    } 
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
            <div className={`hidden lg:block ${style.registImage}`} >
              <img src="https://firebasestorage.googleapis.com/v0/b/chiliesious-a5086.appspot.com/o/SekarGaluhEtnic%2FLogin%2Fmany-colorful-buttons-brown-thread-needle-wooden-background%20(1).jpg?alt=media&token=d20f2804-86f0-44fc-bda5-e7dd3f622e38"></img>
            </div>

            <div className={`px-5 ${style.loginForm}`}>
              <h1 className="mt-4 mb-4">Daftar</h1>
              <form onSubmit={register}>
                <div className="mb-3">
                  <h6 className="">Nama</h6>
                  <FormControl fullWidth >
                    <TextField
                      // focused
                      required
                      error={errorMessageNama === "" ? false : true}
                      fullWidth
                      labelId="nama"
                      id="nama"
                      label="Nama"
                      name="nama"
                      type="text"
                      onChange={handleInput}
                      // helperText={errorMessageNama}
                      size="small"
                    />
                  </FormControl>
                  <p className={style.regexTest}>{errorMessageNama}</p>
                </div>
                <div className="mb-3">
                  <h6 className="">No. Telepon</h6>
                  <FormControl fullWidth>
                    <TextField
                      // focused
                      required
                      error={errorMessagePhoneNumber === "" ? false : true}
                      fullWidth
                      labelId="phoneNumber"
                      id="phoneNumber"
                      label="No. Telepon"
                      name="phoneNumber"
                      type="text"
                      onChange={handleInput}
                      // helperText={errorMessagePhoneNumber}
                      size="small"
                    />
                  </FormControl>
                  <p className={style.regexTest}>{errorMessagePhoneNumber}</p>
                </div>
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
                      // helperText={errorMessageEmail}
                      size="small"
                    />
                  </FormControl>
                  <p className={style.regexTest}>{errorMessageEmail}</p>
                </div>
                <div>
                  <h6 className="">Kata Sandi</h6>
                  <FormControl fullWidth variant="outlined" size="small">
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
                      // helperText={errorMessagePassword}
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
                  </FormControl>
                  <p className={style.regexTest}>{errorMessagePassword}</p>
                </div>
                <p className={style.regisFailed}>{regisFailed}</p>
                <p className={style.regisSuccess}>{regisSuccess}</p>
                <div className={style.loginButton}>
                  <button 
                    type="submit">
                    { loadingInsertUser ? <LoadingSvg/> : "Daftar"} 
                  </button>
                </div>
              </form>
              <p className={`mt-3 text-center`}>Sudah punya akun?<span className={style.loginDaftar}> <a href="/login"> Masuk</a></span></p>
            </div>

            
          </div>
        </div>
    )
}

export default Register