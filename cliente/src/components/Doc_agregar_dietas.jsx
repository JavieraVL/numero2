import { Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

export const Doc_agregar_dietas = () => {
    const [dietas, SetDietas] = useState([]);
    const { register, formState: { errors, }, handleSubmit, reset } = useForm();
    const [SetCargar, setmensajeError, cargar] = useState([false]);
    const [ingredientes, SetIngredientes] = useState([]);
    const [data, setData] = useState([]);


    const addData = (v) => {
        let nuevo = { id: v.id, tipo: v.tipo, nombre: v.nombre, cantidad: v.cantidad = 1 };
        let encontrado = false;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === v.id) {
                data[i].cantidad++;
                encontrado = true;

                break;
            }
        }
        // Si no se encontró el ID, se agrega un nuevo objeto al array
        if (!encontrado) {
            setData([...data, nuevo]);
        } else {
            setData([...data]);
        }
        console.table(data);
    };

    const deleteData = (v) => {
        const arr = data.filter(function (item) {
            return item.id !== v.id;
        });
        setData(arr);
    };

    const MostrarAlertaAA = () => {
        swal({
            title: "Dieta Agregada con exito!",
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

    //const de agregar dietas
    const agregarDietas = e => {
        let nombre = e.nombre;
        let tipo_dieta = e.tipo_dieta;
        let hora = e.hora;
        let tipo_comida = e.tipo_comida;

        let token = "Bearer " + JSON.parse(sessionStorage.getItem('info'));
        let url = "http://localhost:4000/app/dietas/add";
        const data = {
            "nombre": nombre,
            "tipo_dieta": tipo_dieta,
            "hora": hora,
            "tipo_comida": e.tipo_comida
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
            SetDietas(data.dieta_original);
        }).catch((e) => { console.log(e); });
    };
    
    //tabla ingredientes mostrar
    useEffect(() => {
        let token = 'Bearer ' + JSON.parse(sessionStorage.getItem('info'));
        let url = "http://localhost:4000/app/mostrarIngredientes";
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
            SetIngredientes(data.Ingredientes);
            SetCargar(false);
        }).catch((e) => { console.log(e); });
    }, [cargar]);


    return (
        <Fragment>
            <div className="bg-img5">
                <div className="row">
                    <div className="col-6 px-5">
                        <br />
                        <div className="card px-4">
                            <br />
                            <form onSubmit={handleSubmit(agregarDietas)}>
                                <div className="col s12 ">
                                    <h3 align="center">Dietas</h3>
                                    <label>Nombre:</label>
                                    <input type="text" name="nombre" className="form-control" />
                                    <br />
                                </div>
                                <div className="input-field col s12">
                                    <select className="form-control">
                                        <option value="">Seleccione Tipo Dieta</option>
                                        <option value="Vegana">Vegana</option>
                                        <option value="Pescetariano">Pescetariano</option>
                                        <option value="Pollotariano">Pollotariano</option>
                                        <option value="Flexitarianos">Flexitarianos</option>
                                        <option value="Crudiveganos">Crudiveganos</option>
                                    </select>
                                    <hr />
                                </div>
                                <h3 align="center">Colacion</h3>
                                <label>Hora:</label>
                                <input type="time" name="hora" />
                                <hr />
                                <select className="form-control" name="tipoComida">
                                    <option value="">Seleccione su hora de comida </option>
                                    <option value="Desayuno">Desayuno</option>
                                    <option value="Almuerzo">Almuerzo</option>
                                    <option value="Cena">Cena</option>
                                </select>
                                <hr />
                                <div className="col s12" align="center">
                                    <button type="submit">Enviar</button>
                                </div>
                            </form>
                        </div>
                        <br />
                    </div>
                    <div className="col-5">
                        <br />
                        <table className="table table-light table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">nombre</th>
                                    <th scope="col">cantidad</th>
                                    <th scope="col">opcciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((p) => (
                                    <tr>
                                        <th scope="row">{p.id}</th>
                                        <th>{p.nombre}</th>
                                        <th>{p.cantidad}</th>
                                        <th> <button className="btn btn-danger" onClick={() => deleteData(p)} type="button">
                                            X
                                        </button></th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="container-fluid">
                        <div className="row px-4">
                            {ingredientes?.map((p) => (
                                <div className="col-sm-4 mb-5">
                                    <div className="card border-primary" align="start">
                                        <div align="center">
                                            <img src="https://cdnx.jumpseller.com/www-agroloar-cl/image/33477705/resize/1200/1200?1680018658" height="300px" width="300" />
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item"><b>Id:</b> {p.id}</li>
                                            <li className="list-group-item"><b>Tipo:</b> {p.tipo}</li>
                                            <li className="list-group-item"><b>Nombre:</b> {p.nombre}</li>
                                        </ul>
                                        <div className="card-footer" align="center">
                                            <button className="btn btn-primary" type="button" onClick={() => addData(p)}>
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    )
};  