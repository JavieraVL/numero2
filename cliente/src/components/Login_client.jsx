import { Fragment, Suspense, useState } from "react";
import { Menu_client } from "./Menu_client";
import { useForm } from "react-hook-form";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Formulario_admin_paciente_add } from "./Formulario_admin_paciente_add";
import { Ver_dietas } from "./Ver_dietas";
import {Ver_colaciones_dieta} from "./form_dieta_colacion";
import { Agregar_paciente } from "./Agregar_paciente";
import { Mostrar_ingredientes } from "./Mostrar_ingredientes";
import { Ver_infonutri_profesional } from "./Ver_infonutri_profesional";
import { Home } from "./Home";
import "../css/style.css";
import { Admin_ver_profesionales } from "./Admin_ver_profesionales";
import { Admin_agregar_profesional } from "./Admin_agregar_profesional";
import { Doc_agregar_dietas } from "./Doc_agregar_dietas";
import { Home_admin } from "./Home_admin";

export const Login_client = () => {
    const { register, formState: { errors, }, handleSubmit } = useForm(); //maneja funcion elemento submit: agarra los datos del formulario y logea 
    const [estado, setEstado] = useState(false);
    const [mensajeError, setmensajeError] = useState(false); //para mensaje de error
    const [rol, setRol] = useState();

    const cambiarEstado = () => {
        setEstado(!estado);
    };

    const cambiarRol = (roln) => {
        setRol(roln);
    }
    //funcion handlesubmit=> toma todos los datos del formulario y los manda a una funcion
    //manejador de eventos para el onclick

    //== compara datos
    //=== compara tipos


    //funcion validar usuario
    const validUser = (e) => {
        let user = e.usuario;
        let pass = e.clave;

        let url = "http://localhost:4000/app/login";
        let obUser = {
            "user": user,
            "pass": pass,
        };

        const params = {
            method: "POST",
            body: JSON.stringify(obUser),
            headers: { "Content-Type": "application/json" },
        };

        fetch(url, params).then((response) => {
            // console.log(obUser);
            //console.log("hola"+response.status);
            if (response.status === 201) {
                cambiarEstado();
                setmensajeError(false);
                return response.json();
            }
            setmensajeError(true);
        }).then((data) => {
            //rol = data.rol;
            sessionStorage.setItem("info", JSON.stringify(data.token));
            sessionStorage.setItem("rol", ("jhjhhjhj"));
            sessionStorage.setItem("data.rol", (data.rol));
            cambiarRol(data.rol);
            console.log(data);
        }).catch((e) => {
            console.log(e);
        });
    };


    return (
        <Fragment>

            {
                estado ?
                    rol == "doctor" ?
                        <Router>
                            <Menu_client  path="/" cambiarEstado={cambiarEstado} rol={rol}></Menu_client>
                            <Suspense fallback={<div>Loading....</div>}>
                                  <Routes>
                    
                                    <Route  index element={<Home/>}></Route>
                                    <Route path="/ver_ingredientes" element={<Mostrar_ingredientes></Mostrar_ingredientes>}></Route>
                                    <Route path="/ver_dietas" element={<Ver_dietas></Ver_dietas>}></Route>
                                    <Route path="/agregar_dietas" element={<Doc_agregar_dietas></Doc_agregar_dietas>}></Route>
                                    <Route path="/agregar_paciente" element={<Agregar_paciente></Agregar_paciente>}></Route>
                                    <Route path="/form_pacientes" element={<Formulario_admin_paciente_add></Formulario_admin_paciente_add>}></Route>
                                    <Route path="/ver_infoNutri" element={<Ver_infonutri_profesional></Ver_infonutri_profesional>}></Route>
                                    <Route path="/ver_colaciones_dieta" element={<Ver_colaciones_dieta></Ver_colaciones_dieta>}></Route>
                                   
                                </Routes>
                            </Suspense>
                        </Router>
                        :
                        rol == "paciente" ?
                            <Router>
                                <Menu_client path="/" cambiarEstado={cambiarEstado} rol={rol}></Menu_client>
                                <Suspense fallback={<div>Loading....</div>}>
                                    <Routes>
                                    <Route  index element={<Home_admin></Home_admin>}></Route>
                                        <Route path="/ver_dietas" element={<Ver_dietas></Ver_dietas>}></Route>
                                        <Route path="/ver_ingredientes" element={<Mostrar_ingredientes></Mostrar_ingredientes>}></Route>
                                    </Routes>
                                </Suspense>
                            </Router>
                            : //vista admin
                            <Router>
                                <Menu_client cambiarEstado={cambiarEstado} rol={rol}></Menu_client>
                                <Suspense fallback={<div>Loading....</div>}>
                                    <Routes>
                                        <Route path="/form_pacientes" element={<Formulario_admin_paciente_add></Formulario_admin_paciente_add>}></Route>
                                        <Route path="/form_profesionales" element={<Admin_ver_profesionales></Admin_ver_profesionales>}></Route>
                                        <Route path="/agregar_paciente" element={<Agregar_paciente></Agregar_paciente>}></Route>
                                        <Route path="/agregar_profesionales" element={<Admin_agregar_profesional></Admin_agregar_profesional>}></Route>
                                    </Routes>
                                </Suspense>
                                <Suspense>
                                    <Routes>
                                        <Route path="/home_admin" element={<Home_admin></Home_admin>}></Route>
                                    </Routes>
                                </Suspense>
                            </Router>
                    :
                    <Fragment>
                        <div className="container2">
                            <div className="container">
                                <input type="checkbox" id="flip" />
                                <div className="cover">
                                    <div className="front">
                                        <img src="https://hips.hearstapps.com/hmg-prod/images/dieta-fodmap-pros-contras-elle-1660415938.jpg" alt="" />
                                        <div className="text">
                                            <span className="text-1">Bienvenido a </span>
                                            <span className="text-2">Medical Diet</span>
                                        </div>
                                    </div>
                                    <div className="back">

                                        <div className="text">
                                            <span className="text-1">Complete miles of journey </span>
                                            <span className="text-2">Let's get started</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="forms">
                                    <div className="form-content">
                                        <div className="login-form">
                                            <div align="center"
                                                className="title">Accede a tu cuenta!
                                            </div>
                                            <form align="center" onSubmit={handleSubmit(validUser)}>
                                                <div className="row justify-content-center">
                                                    <div className="input-box">
                                                        <i className="large material-icons">account_box</i>
                                                        <input className="rounded" type="text" placeholder="Ingrese su usuario"{...register("usuario", {
                                                            required: true,
                                                            maxLength: 20
                                                        })} required />
                                                        <td>
                                                            <hr />
                                                        </td>
                                                        {errors.user?.type === "required" && <p className="fst-italic text-danger" >Requerido!</p>}
                                                        {errors.user?.type === "maxLength" && <p className="fst-italic text-danger">Menos de 20</p>}
                                                    </div>
                                                    <div className="input-box">
                                                        <i className="large material-icons">lock</i>
                                                        <input className="rounded" type="password" placeholder="Ingrese su clave"{...register("clave", {
                                                            required: true,
                                                            maxLength: 20
                                                        })} required />
                                                        <td>
                                                            <hr />
                                                        </td>
                                                        {errors.pass?.type === "required" && <p className="fst-italic text-danger">Requerido!</p>}
                                                        {errors.pass?.type === "maxLength" && <p className="fst-italic text-danger">Menos de 20</p>}
                                                    </div>
                                                    <div className="text"></div>
                                                    <div className="button input-box">
                                                        <br></br>
                                                        <input type="submit" value="Ingresar" />
                                                    </div>
                                                </div>
                                            </form>
                                            {
                                                mensajeError ?
                                                    //si es verdad
                                                    <Fragment>
                                                        <div align="center">
                                                            <br />
                                                            <p className="fw-bolder">❌ Usuario no valido ❌</p>
                                                        </div>
                                                    </Fragment>
                                                    : //caso falso
                                                    <Fragment>

                                                    </Fragment>
                                            }
                                        </div>
                                        <div className="signup-form">
                                            <div className="title">Signup</div>
                                            <form action="#">
                                                <div className="input-boxes">
                                                    <div className="input-box">
                                                        <i className="fas fa-user"></i>
                                                        <input type="text" placeholder="Enter your name" />
                                                    </div>
                                                    <div className="input-box">
                                                        <i className="fas fa-envelope"></i>
                                                        <input type="text" placeholder="Enter your email" />
                                                    </div>
                                                    <div className="input-box">
                                                        <i className="fas fa-lock"></i>
                                                        <input type="password" placeholder="Enter your password" />
                                                    </div>
                                                    <div className="button input-box">

                                                        <input type="submit" value="Sumbit" />
                                                    </div>
                                                    <div className="text sign-up-text"></div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
            }

        </Fragment>
    );

}

