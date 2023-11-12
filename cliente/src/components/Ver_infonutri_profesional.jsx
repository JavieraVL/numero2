import { Fragment, useEffect, useState } from "react";

export const Ver_infonutri_profesional = () => {
    const [profesionalInfoNutri, SetprofesionalInfoNutri] = useState([]);
    const [cargar, SetCargar] = useState([false]);

    useEffect(() => {
        let token = 'Bearer' + JSON.parse(sessionStorage.getItem('info'));
        let url = "http://localhost:4000/app/ver/infonutri";
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
            SetprofesionalInfoNutri(data.Nutri);
            SetCargar(false);
        }).catch((e) => { console.log(e); });
    }, [cargar, profesionalInfoNutri]);

    //editar informacion nutricional



    //eliminar informacion nutricional
    const eliminarInfoNutri = (id) => {
        let token = "Bearer " + JSON.parse(sessionStorage.getItem('info'));
        let url = `http://localhost:4000/app/infonutri/eliminar/${id}`;
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
            SetprofesionalInfoNutri(data.IngredienteDietum);
        }).catch((e) => { console.log(e); });
        swal({
            title: "Estas seguro que deseas eliminar esta informacion nutricional?",
            text: "una vez eliminada, no se podra recuperar la informacion nutricional",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("se ha elimino correctamente la informacion nutricional", {
                        icon: "success",
                        timer: 1000,
                    });
                } else {
                    swal("Accion cancelada");
                }
            });
        console.log(id);
    };

    //formulario
    return (
        <Fragment>
            <div className="bg-img5">
                <div className="container-fluid">
                    <br />
                    <div className="row px-4">
                        {profesionalInfoNutri?.map((p) => (
                            <div className="col-sm-4 mb-5">
                                <div className="card border-primary">
                                    <div className="card text-title" align="start">
                                        <div className="list-group list-group-flush">
                                            <br />
                                            <h5 align="center">Informacion Nutricional</h5>
                                            <p className="list-group-item"><b>Id:</b> {p.id}</p>
                                            <p className="list-group-item"><b>Porciones:</b> {p.porciones}</p>
                                            <p className="list-group-item">IdDieta:</p>
                                            <p className="list-group-item">IdIngrediente:</p>
                                            <th >
                                                <div align="center">
                                                    <input type="button" className="btn btn-danger" value="Eliminar" onClick={() => eliminarInfoNutri(p?.id)} />
                                                </div>
                                            </th>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    );

};