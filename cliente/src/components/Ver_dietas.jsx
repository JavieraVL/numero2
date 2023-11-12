import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, ModalFooter } from "react-bootstrap";

export const Ver_dietas = () => {
    const [dietas, SetDietas] = useState([]);
    const [cargar, SetCargar] = useState([false]);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [show, setShow] = useState(false);

    useEffect(() => {
        let token = 'Bearer ' + JSON.parse(sessionStorage.getItem('info'));
        let url = "http://localhost:4000/app/ver/dietas";
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
            SetDietas(data.Dieta);
            SetCargar(false);
        }).catch((e) => { console.log(e); });
    }, [cargar]);

    const handleClose = () => setShow(false);

    const handleShow = (p) => {
        setShow(true);
        setValue("id", p.id);
        setValue("nombre", p.nombre);
        setValue("descripcion", p.descripcion);
        setValue("categoria", p.categoria);
    };

    //editar dieta
    const editarDieta = (p) => {
        fetch(`http://localhost:4000/app/dieta/edit/${p.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    "nombre": p.nombre,
                    "descripcion": p.descripcion,
                    "categoria": p.categoria
                }
            )
        }).then((response) => {
            return response.json();
        }).then((data) => {
            SetDietas(data.Dieta);
            handleClose();
        }).catch((error) => { console.error(error); });
    };

    //clonar
    const clonar_Dieta = (p) => {
        fetch(`http://localhost:4000/app/add/dieta_copia`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    "id": p.id,
                    "nombre": p.nombre,
                    "descripcion": p.descripcion,
                    "categoria": p.categoria
                }
            )
        }).then((response) => {
            return response.json();
        }).then((data) => {
            //SetDietas(data.Dieta_copia);
            //handleClose();
            console.log(data);
        }).catch((error) => { console.error(error); });
    };


    //eliminar dieta
    const eliminarDieta = (id) => {
        let token = "Bearer " + JSON.parse(sessionStorage.getItem('info'));
        let url = `http://localhost:4000/app/dietas/eliminar/${id}`;
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
            SetDietas(data.DietaOriginal);
            swal({
                title: "Estas seguro que deseas eliminar esta dieta?",
                text: "una vez eliminada, no se podra recuperar la dieta",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        swal("se ha elimino correctamente la dieta", {
                            icon: "success",
                            timer: 1000,
                        });
                    } else {
                        swal("Accion cancelada");
                    }
                });
        }).catch((e) => { console.log(e); });
        console.log(id);
    };


    return (
        <Fragment>
            <div className="bg-img5">
                <div className="container-fluid">
                    <br />
                    <h3 align="center">Dietas</h3>
                    <div className="row px-4">
                        {dietas?.map((p) => (
                            <div className="col-sm-4 mb-5">
                                <br />
                                <div className="card border-primary" align="start">
                                    <div align="center">
                                        <img className="diet321" src="https://d100mj7v0l85u5.cloudfront.net/s3fs-public/AMP-Atencion-medica-de-rutina-debe-incluir-evaluacion-de-la-calidad-de-la-dieta.jpg" height="300px" width="446" />
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item"><b>Id:</b> {p.id}</li>
                                        <li className="list-group-item"><b>Nombre:</b> {p.nombre}</li>
                                        <li className="list-group-item"><b>Descripcion:</b> {p.descripcion}</li>
                                        <li className="list-group-item"><b>Horario:</b> {p.categoria}</li>
                                    </ul>
                                    <div className="card-footer">
                                        <button className="btn btn-primary" onClick={() => handleShow(p)}>Editar</button>
                                        <button className="btn btn-secondary" onClick={() => clonar_Dieta(p)}>Clonar</button>
                                        <input type="button" className="btn btn-danger" value="Eliminar" onClick={() => eliminarDieta(p?.id)} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Dieta</Modal.Title>
                </Modal.Header>
                <form align="center" onSubmit={handleSubmit(editarDieta)}>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="input-field col s12">
                                    <input className="form-control" disabled type="number" placeholder="..."{...register("id", {
                                        required: true,
                                        maxLength: 10
                                    })} required />
                                    <td>
                                        <hr />
                                    </td>
                                    {errors.id?.type === "required" && <p className="fst-italic text-danger" >Requerido!</p>}
                                    {errors.id?.type === "maxLength" && <p className="fst-italic text-danger">Menos de 20</p>}
                                </div>
                                <div className="input-field col s12">
                                    <input className="form-control" type="text" placeholder="Ingrese su nombre"{...register("nombre", {
                                        required: true,
                                        maxLength: 100
                                    })} required />
                                    <td>
                                        <hr />
                                    </td>
                                    {errors.nombre?.type === "required" && <p className="fst-italic text-danger" >Requerido!</p>}
                                    {errors.nombre?.type === "maxLength" && <p className="fst-italic text-danger">Menos de 20</p>}
                                </div>
                                <div className="input-field col s12">
                                    <textarea className="form-control" type="form-control" placeholder="Ingrese su descripcion"{...register("descripcion", {
                                        required: true,
                                        maxLength: 500
                                    })} required />
                                    <td>
                                        <hr />
                                    </td>
                                    {errors.descripcion?.type === "required" && <p className="fst-italic text-danger" >Requerido!</p>}
                                    {errors.descripcion?.type === "maxLength" && <p className="fst-italic text-danger">Menos de 20</p>}
                                </div>
                                <div className="input-field col s12">
                                    <select {...register("categoria", { required: true })} className="form-control">
                                        <option value="Selecciona Horario">Selecciona Horario</option>
                                        <option value="Mañana: 06:00 AM a 11:30 AM">Mañana: 06:00 AM a 11:30 AM</option>
                                        <option value="Tarde: 12:00 PM a 18:30 PM">Tarde: 12:00 PM a 18:30 PM</option>
                                        <option value="Noche: 19:00 PM a 23:30 PM">Noche: 19:00 PM a 23:30 PM</option>
                                    </select>
                                    <td>
                                        <hr />
                                    </td>
                                    {errors.categoria?.type === "required" && <p className="fst-italic text-danger" >Requerido!</p>}
                                    {errors.categoria?.type === "maxLength" && <p className="fst-italic text-danger">Menos de 20</p>}
                                </div>
                            </div>
                        </div>
                        <ModalFooter>
                            <button className="btn btn-secondary" onClick={handleClose}>
                                Salir
                            </button>
                            <div>
                                <button type="submit" className="btn btn-primary">
                                    Guardar Edicion
                                </button>
                            </div>

                        </ModalFooter>
                    </Modal.Body>
                </form>
            </Modal>
        </Fragment>


    );
};