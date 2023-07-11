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

import { useRef } from 'react';
import emailjs from '@emailjs/browser';

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
const GetEmail = gql `
query MyQuery($_eq: String!) {
  sekargaluhetnic_user(where: {email: {_eq: $_eq}}) {
    email
    id
    name
    password
    telephone
  }
}
`

const GetToken = gql `
query MyQuery($_eq: String!) {
  sekargaluhetnic_user(where: {email: {_eq: $_eq}}) {
    token
  }
}
`

function ForgotPassword() {
  AOS.init();

  const[getUser, { data, loading, error}] = useLazyQuery(GetEmail);

  const navigate = useNavigate();
  const [emailFound, setEmailFound] = useState("");
  const [emailNotFound, setEmailNotFound] = useState("");
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

  const [token, setToken] = useState()

  const [resetURL, setResetURL] = useState("localhost:3000/reset-password")
  const [result, setResult] = useState("")

  const {data: dataToken} = useQuery(GetToken, {variables: { _eq:values.email}})
  useEffect(() => {
      // setResetURL(`localhost:3000/reset-password/${dataToken?.sekargaluhetnic_user[0].token}`)
  }, [dataToken])
  
  // console.log("cek data token", dataToken?.sekargaluhetnic_user[0].token)
  const handleInput = (e) => {
    
    const name = e.target.name;
    const value = e.target.value;

    setValues({
      ...values,
      [name]: value,
    });
    // setTimeout(e, 1000);
  };

  console.log("cek email", values.email)

  useEffect(() => {
    if(data?.sekargaluhetnic_user.length === 1) {
      // console.log("data", data?.sekargaluhetnic_user[0]?.id);
      setEmailFound("Alamat email terdaftar, harap menekan tombol kirim untuk mengirimkan link reset password ke email Anda")
      if (result == "OK") {
        setEmailFound("Kami mengirimkan link ke email Anda, harap cek email Anda.")
      }
      // emailjs.sendForm('service_r3mwl5h', 'template_a2u0mbc', form.current, 'pyby3Ek2xR0rJSzIP')
      //   .then((result) => {
      //       console.log(result.text);
      //   }, (error) => {
      //       console.log(error.text);
      //   });
      // setEmailNotFound("")
      // setLoginSuccess("Login Berhasil, Harap Tunggu....")
      // Cookies.set("token", uuidv4(), {expires: 1 });
      // Cookies.set("okogaye", data?.sekargaluhetnic_user[0]?.id, {expires: 1 });
      // return navigate ("/")
    } else if (data?.sekargaluhetnic_user.length !== 0)
    setEmailNotFound("Email tidak terdaftar !")
    // setEmailFound("")
  }, [data]);

  const login = (e) => {
    getUser({
        variables: {
            _eq: values.email,
            // _eq1: values.password,
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

  const backLogin = () => {
    navigate("/login")
  }

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    getUser({
      variables: {
          _eq: values.email,
          _eq1: values.password,
      }
    })

    if(data?.sekargaluhetnic_user.length === 1) {
      setEmailFound("Kami mengirimkan link ke email Anda, harap cek email Anda.");
      emailjs.sendForm('service_r3mwl5h', 'template_a2u0mbc', form.current
      , 'pyby3Ek2xR0rJSzIP')
        .then((result) => {
            console.log(result.text);
            setResult(result.text)
        }, (error) => {
            console.log(error.text);
        });

    } else if (data?.sekargaluhetnic_user.length !== 0)
    setEmailNotFound("Email tidak terdaftar !")

    // emailjs.sendForm('service_r3mwl5h', 'template_a2u0mbc', form.current
    // , 'pyby3Ek2xR0rJSzIP')
    //   .then((result) => {
    //       console.log(result.text);
    //   }, (error) => {
    //       console.log(error.text);
    //   });
  };


    return(
        <div className={style.loginBackground}>
          <div 
            data-aos="fade-down"
            data-aos-duration="1500"
            className={`grid lg:grid-cols-1 ${style.loginContainer}`}
          >

            <div className={`px-5 ${style.loginForm}`}>
              <h1 className="mt-4 mb-4">Lupa Kata Sandi</h1>
              <p className="text-base mb-3">Masukkan alamat email yang sudah terdaftar, kami akan mengirimkan link reset password ke email yang terdaftar</p>
              <form ref={form} onSubmit={sendEmail}>
                    {/* <label>Email</label> */}
                    <input type="email" name="email" onChange={handleInput} className="w-full border-b focus:outline-none focus:border-secondary p-1" placeholder="Email ( ex: andi123@gmail.com )"/>
                    {/* <label>Message</label> */}
                    <textarea name="message" value={`http://localhost:3000/reset-password/${dataToken?.sekargaluhetnic_user[0]?.token}`} className="hidden" />
                    <div className="flex justify-end mt-5">
                      <input type="submit" value="Kirim" className="px-5 py-1 bg-secondary border border-secondary rounded-md text-white hover:text-secondary hover:bg-white duration-200"/>
                    </div>
                  </form>

                    { data?.sekargaluhetnic_user.length === 1 ? <p>{emailFound}</p> : ""}
                    { data?.sekargaluhetnic_user.length === 0 ? <p>{emailNotFound}</p> : ""}
              {/* <form onSubmit={login}>
                <p className="text-base mb-3">Masukkan alamat email yang sudah terdaftar, kami akan mengirimkan link reset password ke email yang terdaftar</p>
                <div className="mb-3">
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
                
                <div className="flex justify-end">
                  <button className="px-10 py-2 bg-secondary text-white rounded-lg hover:bg-white hover:text-secondary border border-secondary duration-200 tracking-wider " type="submit">
                  { loading ? <LoadingSvg/> : "Kirim"}
                  </button>
                </div>
              </form> */}
              <p className="mb-5 text-sm text-secondary hover:text-black cursor-pointer hover:underline" onClick={backLogin}> &lt; Kembali</p>
            </div>


            {/* <div className="lg:block hidden" >
              <img className="w-full h-full object-cover" src="https://firebasestorage.googleapis.com/v0/b/chiliesious-a5086.appspot.com/o/SekarGaluhEtnic%2FLogin%2Fsewing-keeps-my-mind-relaxed-cropped-shot-female-tailor-working-new-project-making-clothes-with-sewing-machine-workshop-being-busy-young-designer-making-her-ideas-come-true%20(1).jpg?alt=media&token=3e9cd4f8-b944-4ab1-a33b-e9d78ce20071"></img>
            </div> */}
            
          </div>
        </div>
    )
}

export default ForgotPassword