import { Fragment, useEffect, useState } from "react";

export const Mostrar_ingredientes = () => {

    const [ingredientes, SetIngredientes] = useState([]);
    const [cargar, SetCargar] = useState([false]);


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
                <div className="container-fluid">
                    <br />
                    <h3 align="center">Ingredientes</h3>
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
                                        <button className="btn btn-primary">Editar</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    )
};