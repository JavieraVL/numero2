import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, Button, Card, Spinner } from 'react-bootstrap';
import swal from "sweetalert";

export const Formulario_admin_paciente_add = () => {

    const [pacientes, SetPacientes] = useState([]);
    const [cargar, SetCargar] = useState([false]);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);

    const handleShow = (p) => {
        setShow(true);
        setValue("rut", p.rut);
        setValue("nombre", p.nombre);
        setValue("apellidos", p.apellidos);
        setValue("fechaNac", p.fechaNac);
        setValue("sexo", p.sexo);
        setValue("edad", p.edad);
        setValue("peso", p.peso);
        setValue("correo", p.correo);
        setValue("estado", p.estado);
        setValue("telefono", p.telefono);
        setValue("descripcion", p.descripcion);
        //setValue("nombreEdit23", item.nombre);
    };

    const agregar = (p) => {
        fetch(`http://localhost:4000/app/pacientes/edit/${p.rut}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    "nombre": p.nombre,
                    "fechaNac": p.fechaNac,
                    "sexo": p.sexo,
                    "edad": p.edad,
                    "peso": p.peso,
                    "descripcion": p.descripcion,
                    "estado": p.estado,
                    "apellidos": p.apellidos,
                    "correo": p.correo,
                    "telefono": p.telefono
                }
            )
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                SetPacientes(data.Pacientes);
                //console.table(data);
                handleClose();
            })
            .catch((error) => { console.error(error); });

        //alert(""+p.nombre);

    };


    useEffect(() => {
        let token = 'Bearer ' + JSON.parse(sessionStorage.getItem('info'));
        let url = "http://localhost:4000/app/ver/pacientes";
        const params = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-auth": token
            },
        };
        fetch(url, params).then((response) => {
            return response.json();
        }).then((data) => {
            SetPacientes(data.Pacientes);
            SetCargar(false);
        }).catch((e) => { console.log(e); });
    }, [cargar, pacientes]);

    function cambiarEstado(rut, state) {
        fetch(`http://localhost:4000/app/pacientes/editEstado/${rut}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ estado: !state })
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                SetPacientes(data.Pacientes);
                //console.table(data);
            })
            .catch((error) => { console.error(error); });
    };

    const eliminarP = (rut) => {
        let token = "Bearer " + JSON.parse(sessionStorage.getItem('info'));
        let url = `http://localhost:4000/app/pacientes/eliminar/${rut}`;
        const params = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "x-auth": token,
            },
        };
        fetch(url, params).then((response) => {
            SetCargar(true);
            return response.json();
        }).then((data) => {
            SetPacientes(data.pacientes);
            swal("Se ha eliminado el paciente", {
                icon: "error",
                timer: 1000,
            });
        }).catch((e) => { console.log(e); });
        console.log(rut);
    };

    return (
        <div className="bg-img5">
            <div className="container-fluid">
                <br />
                <h3 align="center">Pacientes</h3>
                <div className="row px-4">
                    {pacientes?.map((p) => (
                        <div className="col-sm-4 mb-5">
                            <br />
                            <div className="card border-primary" align="start">
                                <div className="imgusers" align="center">
                                    <img src="../img/user.png" />
                                </div>
                                <p><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    {p.nombre} {p.apellidos}</b></p>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item"><b>Rut: </b>{p.rut}</li>
                                    <li className="list-group-item"><b>Fecha Nac: </b> {p.fechaNac}</li>
                                    <li className="list-group-item"><b>Sexo: </b> {p.sexo}</li>
                                    <li className="list-group-item"><b>Edad: </b> {p.edad}</li>
                                    <li className="list-group-item"><b>Peso: </b> {p.peso}</li>
                                    <li className="list-group-item"><b>Correo: </b> {p.correo}</li>
                                    <li className="list-group-item"><b>Telefono: </b> {p.telefono}</li>
                                    <li className="list-group-item"><b>Enfermedad: </b> {p.descripcion}</li>
                                </ul>
                                <div className="card-footer">
                                    <button className="btn btn-warning" onClick={() => cambiarEstado(p.rut, p.estado)}>
                                        {p.estado ? <span className="text-success">Active</span> : <span className="text-danger">Blocked</span>}
                                    </button>
                                    <Button variant="primary" onClick={() => handleShow(p)}>
                                        Editar
                                    </Button>
                                    <input type="button" className="btn btn-danger" value="Eliminar" onClick={() => eliminarP(p?.rut)} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Pacientes</Modal.Title>
                    </Modal.Header>
                    <form align="center" onSubmit={handleSubmit(agregar)}>
                        <Modal.Body>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="input-field col s12">
                                        <input className="form-control" disabled type="text" placeholder="Ingrese su rut"{...register("rut", {
                                            required: true,
                                            maxLength: 20
                                        })} required />
                                        <td>
                                            <hr />
                                        </td>
                                        {errors.rut?.type === "required" && <p className="fst-italic text-danger" >Requerido!</p>}
                                        {errors.rut?.type === "maxLength" && <p className="fst-italic text-danger">Menos de 20</p>}
                                    </div>
                                    <div className="input-field col s12">
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
                                    <div className="input-field col s6">
                                        <br />
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
                                    <div className="input-field col s12">
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
                                </div>
                                <div className="col-md-6">
                                    <div className="input-field col s12">
                                        <input className="form-control" type="number" placeholder="Ingrese su telefono"{...register("telefono", {
                                            required: true,
                                            maxLength: 20
                                        })} required />
                                        <td>
                                            <hr />
                                        </td>
                                        {errors.telefono?.type === "required" && <p className="fst-italic text-danger" >Requerido!</p>}
                                        {errors.telefono?.type === "maxLength" && <p className="fst-italic text-danger">Menos de 20</p>}
                                    </div>
                                    <div className="input-field col s12">
                                        <input className="form-control" type="email" placeholder="Ingrese su correo electronico"{...register("correo", {
                                            required: true,
                                            maxLength: 50
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
                                    <div className="input-field col s12">
                                        <label className="form-label">Estado&nbsp;&nbsp;</label>
                                        <input className="form-check-input" type="checkbox" placeholder="Ingrese su estado"{...register("estado", {
                                            required: false,
                                        })} />
                                        <td>
                                            <hr />
                                        </td>
                                        {errors.estado?.type === "required" && <span className="invalid-feedback" role="alert">Estado es requerido</span>}                        </div>

                                </div>
                            </div>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Salir
                                </Button>
                                <div>
                                    <button type="submit" className="btn btn-primary">Guardar Edicion</button>
                                </div>
                            </Modal.Footer>

                        </Modal.Body>
                    </form>
                </Modal>
            </div>
        </div>
    );
};
