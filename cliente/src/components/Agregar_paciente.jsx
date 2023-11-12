import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

export const Agregar_paciente = () => {
    const [pacientes, SetPacientes] = useState([]);
    const { register, formState: { errors, }, handleSubmit, reset } = useForm();
    const [SetCargar, setmensajeError] = useState([false]);
    const [registeredRuts, setRegisteredRuts] = useState([]);

    const agregar = e => {
        let rut = e.rut;
        let nombre = e.nombre;
        let fechaNac = e.fechaNac;
        let sexo = e.sexo;
        let edad = e.edad;
        let peso = e.peso;
        let descripcion = e.descripcion;
        let estado = e.estado;
        let apellidos = e.apellidos;
        let correo = e.correo;
        let telefono = e.telefono;

        let token = "Bearer " + JSON.parse(sessionStorage.getItem('info'));
        let url = "http://localhost:4000/app/pacientes/add";
        const data = {
            "rut": rut,
            "nombre": nombre,
            "fechaNac": fechaNac,
            "sexo": sexo,
            "edad": edad,
            "peso": peso,
            "descripcion": descripcion,
            "estado": estado,
            "apellidos": apellidos,
            "correo": correo,
            "telefono": telefono
        }
        //ejemplo array dieta-colacion
        let informacion = [
            {
                "dieta":{
                    "id":1,
                    "name":"vegana"
                },
                "colacion":{
                    "id":1,
                    "name":"desayuno"
                },
                "ingredientes":
                [
                    {"id":1, "name": "pera"},
                    {"id":1, "name": "manzana"}
                ]
            }
        ]
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth": token,
            },
            body: JSON.stringify(data),
        };
        fetch(url, params).then((response) => {
            if (response.status === 201) {
                SetCargar(false);
                setmensajeError(false);
                return response.json();
            }
        }).then((data) => {
            SetPacientes(data.Pacientes);
        }).catch((e) => { console.log(e); });



        // crear user en mongodb
        let url2 = "http://localhost:4000/app/add/user";
        const data2 = {
            "user": rut,
            "estado": estado,
            "rol": "paciente",
        }
        const params2 = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth": token,
            },
            body: JSON.stringify(data2),
        };

        fetch(url2, params2).then((response) => {
            if (response.status === 201) {
                SetCargar(false);
                setmensajeError(false);
                return response.json();
            }
        }).then((data) => {
            SetPacientes(data.Pacientes);
        }).catch((e) => { console.log(e); });

    };

    const MostrarAlertaAA = () => {
        swal({
            title: "Paciente Agregado con exito!",
            icon: "success",
            timer: 2000
        }).then(() => {
            limpiarCampos();
            reset();
        });
    };

    //const limpiarCampos
    const limpiarCampos = () => {
        reset();
    };

    const handleRutChange = (event) => {
        const enteredRut = event.target.value;
        if (registeredRuts.includes(enteredRut)) {
            console.alert("Rut ya registrado");
        }
    };

    //formulario
    return (
        <Fragment>
            <div class="bg-img">
                <div class="content">
                    <form onSubmit={handleSubmit(agregar)}>
                        <br />
                        <div className="col s12 " align="center">
                            <h3 className="titulo">Agregar Paciente</h3>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-6">
                                <input className="form-control" type="text" placeholder="Ingrese su rut"{...register("rut", {
                                    required: true,
                                    maxLength: 20
                                })} required />
                                <td>
                                    <hr />
                                </td>
                                {errors.rut?.type === "required" && <p className="fst-italic text-danger" >Requerido!</p>}
                                {errors.rut?.type === "maxLength" && <p className="fst-italic text-danger">Menos de 20</p>}
                            </div>
                            <div className="col-6">
                                <input className="form-control" type="text" placeholder="Ingrese su nombre"{...register("nombre", {
                                    required: true,
                                    maxLength: 20
                                })} required />
                                <td>
                                    <hr />
                                </td>
                                {errors.nombre?.type === "required" && <p className="fst-italic text-danger" >Requerido!</p>}
                                {errors.nombre?.type === "maxLength" && <p className="fst-italic text-danger">Menos de 20</p>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input className="form-control" type="text" placeholder="Ingrese sus apellidos"{...register("apellidos", {
                                    required: true,
                                    maxLength: 20
                                })} required />
                                <td>
                                    <hr />
                                </td>
                                {errors.apellidos?.type === "required" && <p className="fst-italic text-danger" >Requerido!</p>}
                                {errors.apellidos?.type === "maxLength" && <p className="fst-italic text-danger">Menos de 20</p>}
                            </div>
                            <div className="input-field col s4">
                                <input className="form-control" type="date"{...register("fechaNac", {
                                    required: true,
                                    maxLength: 20
                                })} required />
                                <td>
                                    <hr />
                                </td>
                                {errors.fechaNac?.type === "required" && <p className="fst-italic text-danger" >Requerido!</p>}
                                {errors.fechaNac?.type === "maxLength" && <p className="fst-italic text-danger">Menos de 20</p>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <select {...register("sexo", { required: true })} className="form-control">
                                    <option value="">Selecciona sexo</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                </select>
                            </div>
                            <br />
                            <div className="input-field col s12">
                                <input className="form-control" type="number" placeholder="Ingrese su edad"{...register("edad", {
                                    required: true,
                                    maxLength: 20
                                })} required />
                                <td>
                                    <hr />
                                </td>
                                {errors.edad?.type === "required" && <p className="fst-italic text-danger" >Requerido!</p>}
                                {errors.edad?.type === "maxLength" && <p className="fst-italic text-danger">Menos de 20</p>}
                            </div>
                            <div className="input-field col s12">
                                <input className="form-control" type="number" placeholder="Ingrese su telefono"{...register("telefono", {
                                    required: true,
                                    maxLength: 9
                                })} required />
                                <td>
                                    <hr />
                                </td>
                                {errors.telefono?.type === "required" && <p className="fst-italic text-danger" >Requerido!</p>}
                                {errors.telefono?.type === "maxLength" && <p className="fst-italic text-danger">Menos de 20</p>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input className="form-control" type="email" placeholder="Ingrese su correo electronico"{...register("correo", {
                                    required: true,
                                    maxLength: 20
                                })} required />
                                <td>
                                    <hr />
                                </td>
                                {errors.correo?.type === "required" && <p className="fst-italic text-danger" >Requerido!</p>}
                                {errors.correo?.type === "maxLength" && <p className="fst-italic text-danger">Menos de 20</p>}
                            </div>
                            <div className="input-field col s12">
                                <input className="form-control" type="number" placeholder="Ingrese su peso"{...register("peso", {
                                    required: true,
                                    maxLength: 20
                                })} required />
                                <td>
                                    <hr />
                                </td>
                                {errors.peso?.type === "required" && <p className="fst-italic text-danger" >Requerido!</p>}
                                {errors.peso?.type === "maxLength" && <p className="fst-italic text-danger">Menos de 20</p>}
                            </div>
                        </div>
                        <div className="input-field col s12">
                            <textarea className="form-control" type="form-control" placeholder="Ingrese su descripcion"{...register("descripcion", {
                                required: true,
                                maxLength: 20
                            })} required />
                            <td>
                                <hr />
                            </td>
                            {errors.descripcion?.type === "required" && <p className="fst-italic text-danger" >Requerido!</p>}
                            {errors.descripcion?.type === "maxLength" && <p className="fst-italic text-danger">Menos de 20</p>}
                        </div>
                        <div className="col s12" align="center">
                            <label className="form-label">Estado&nbsp;&nbsp;</label>
                            <input className="form-check-input" type="checkbox" checked placeholder="Ingrese su estado"{...register("estado", {
                                required: false,
                            })} />
                            <td>
                                <hr />
                            </td>
                            {errors.estado?.type === "required" && <span className="invalid-feedback" role="alert">Estado es requerido</span>}
                            <div className="col-4" align="center">
                                <button type="submit" onClick={MostrarAlertaAA} className="form-control ">Agregar Paciente</button>
                            </div>
                        </div>
                        <br />
                    </form>
                </div>
            </div>
        </Fragment >
    )
};