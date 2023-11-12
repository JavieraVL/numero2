import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

export const Admin_agregar_profesional = () => {
    const [profesionales, SetProfesionales] = useState([]);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [SetCargar, setmensajeError] = useState([false]);

    const agregarProf = e => {
        let rut = e.rut;
        let nombre = e.nombre;
        let especialidad = e.especialidad;
        let estado = e.estado;

        let token = "Bearer " + JSON.parse(sessionStorage.getItem('info'));
        let url = "http://localhost:4000/app/profesional/add";
        const data = {
            "rut": rut,
            "nombre": nombre,
            "especialidad": especialidad,
            "estado": estado
        }

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
            SetProfesionales(data.profesionales);
        }).catch((e) => { console.log(e); });



        // crear prof en mongodb
        let url3 = "http://localhost:4000/app/add/prof";
        const data3 = {
            "user": rut,
            "estado": estado,
            "rol": "doctor",
        }
        const params3 = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth": token,
            },
            body: JSON.stringify(data3),
        };

        fetch(url3, params3).then((response) => {
            if (response.status === 201) {
                SetCargar(false);
                setmensajeError(false);
                return response.json();
            }
        }).then((data) => {
            SetProfesionales(data.profesionales);
        }).catch((e) => { console.log(e); });

    };


    const MostrarAlertaAA = () => {
        swal({
            title: "Profesional Agregado con exito!",
            icon: "success",
            timer: 2000
        }).then(() => {
            limpiarCampos();
        });
    }

    //const limpiarCampos
    const limpiarCampos = () => {
        reset();
    };

    return (
        <Fragment>
            <div class="bg-img">
                <div class="content1">
                    <form align="center" onSubmit={handleSubmit(agregarProf)}>
                        <div className="col s12 " align="center">
                            <h3>Agregar Profesionales</h3>
                        </div>
                        <br />
                        <div className="input-field col s12">
                            <input className="form-control" type="text" placeholder="Ingrese su rut" {...register("rut", {
                                required: true,
                                maxLength: 20
                            })} required />
                            <td>
                                <hr />
                            </td>
                        
                            {errors.rut?.type === "required" && <p className="fst-italic text-danger">Requerido!</p>}
                            {errors.rut?.type === "maxLength" && <p className="fst-italic text-danger">Menos de 20</p>}
                        </div>
                        <div className="input-field col s12">
                            <input className="form-control" type="text" placeholder="Ingrese su nombre" {...register("nombre", {
                                required: true,
                                maxLength: 20
                            })} required />
                            <td>
                                <hr />
                            </td>
                            {errors.nombre?.type === "required" && <p className="fst-italic text-danger">Requerido!</p>}
                            {errors.nombre?.type === "maxLength" && <p className="fst-italic text-danger">Menos de 20</p>}
                        </div>
                        <div className="input-field col s12">
                            <select {...register("especialidad", { required: true })} className="form-control">
                                <option value="">Selecciona Especialidad</option>
                                <option value="Kinesiolog@">Kinesiolog@</option>
                                <option value="Medicina del deporte">Medicina del deporte</option>
                                <option value="traumatologo">traumatologo</option>
                                <option value="UTI Pediatrica">UTI Pediatrica</option>
                                <option value="Oncologia">Oncologia</option>
                                <option value="Centro de nutricion y obesidad">Centro de nutricion y obesidad</option>
                                <option value="Nutrologia">Nutriologia</option>
                                <option value="Gimnasio">Gimnasio</option>
                                <option value="Pediatria y adolecencia">Pediatria y adolecencia</option>
                                <option value="Neurologia Infantil">Neurologia Infantil</option>
                                <option value="Neurologia Adulto">Neurologia Adulto</option>
                                <option value="Gastroenterologia">Gastroenterologia</option>
                                <option value="Medicina Interna Urologia">Medicina Interna Urologia</option>
                                <option value="Cardiocirugia y cardiovascular">Cardiocirugia y cardiovascular</option>
                                <option value="Cardiologia">Cardiologia</option>
                            </select>
                        </div>
                        <br />
                        <div className="input-field col s12">
                            <label className="form-label">Estado&nbsp;&nbsp;</label>
                            <input className="form-check-input" checked type="checkbox" placeholder="Ingrese su estado" {...register("estado", {
                                required: false,
                            })} />
                            <td>
                                <hr />
                            </td>
                            {errors.estado?.type === "required" && <span className="invalid-feedback" role="alert">Estado es requerido</span>}
                        </div>
                        <div>
                            <button type="submit" onClick={MostrarAlertaAA} className="btn btn-primary">Agregar Profesional</button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
};
