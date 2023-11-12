import { Fragment, useEffect, useState } from "react";

export const Admin_ver_profesionales = () => {
  const [profesionales, SetProfesionales] = useState([]);
  const [cargar, SetCargar] = useState([false]);

  useEffect(() => {
    let token = 'Bearer ' + JSON.parse(sessionStorage.getItem('info'));
    let url = "http://localhost:4000/app/profesionales";
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
      SetProfesionales(data.Profesionales);
      SetCargar(false);
    }).catch((e) => { console.log(e); });
  }, [cargar]);

  function cambiarEstado(rut, state) {
    fetch(`http://localhost:4000/app/profesional/editEstado/${rut}`, {
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
        SetProfesionales(data.Profesionales);
        //console.table(data);
      })
      .catch((error) => { console.error(error); });
  };


  //formulario
  return (

    <Fragment>
      <div className="bg-img5">
        <div className="container-fluid">
          <br />
          <h3 align="center">Profesionales</h3>
          <div className="row px-4">
            {profesionales?.map((p) => (
              <div className="col-sm-4 mb-5">
                <div className="card border-primary">
                  <div className="card" align="center">
                    <div className="prof11">
                      <img src="../img/medic.gif" alt="Profile" className="img-fluid" />
                    </div>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item"><strong>Rut:</strong> {p.rut}</li>
                      <li className="list-group-item"><strong>Nombre:</strong> {p.nombre}</li>
                      <li className="list-group-item"><strong>Especialidad:</strong> {p.especialidad}</li>
                      <li className="list-group-item">
                        <button className="btn btn-outline-warning" onClick={() => cambiarEstado(p.rut, p.estado)}>
                          {p.estado ? <span className="text-success">Active</span> : <span className="text-danger">Blocked</span>}
                        </button>
                      </li>
                    </ul>
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



