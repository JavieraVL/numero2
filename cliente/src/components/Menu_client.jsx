import { Fragment } from "react";
import { Link, Router } from "react-router-dom";
import { Home } from "./Home";

export const Menu_client = ({ cambiarEstado, rol }) => {
    return (

        <Fragment>
            
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    {rol === "paciente" ? (
                        <Fragment>
                            <a className="navbar-brand fw-bolder" href="#">Menu Paciente</a>
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" align="center" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Ver
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li className="nav-item">
                                            <Link className="nav-link active fw-bolder" to="/ver_dietas">Ver Dietas</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active fw-bolder" to="/ver_ingredientes">Ver Ingredientes</Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </Fragment>
                    ) : rol === "doctor" ? (
                        <Fragment>
                            <a className="navbar-brand fw-bolder" href="#">Menu Doctor</a>
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" align="center" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Ver
                                    </a>
                                    <ul className="dropdown-menu">
                                    <li className="nav-item">
                                            <Link className="nav-link active fw-bolder" to="/ver_colaciones_dieta">Ver Colacion Dietas</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active fw-bolder" to="/ver_dietas">Ver Dietas</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active fw-bolder" to="/ver_ingredientes">Ver Ingredientes</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active fw-bolder" to="/form_pacientes">Ver Pacientes</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active fw-bolder" to="/ver_infoNutri">Ver Informacion Nutricional</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown" align="center">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Agregar
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link className="nav-link active fw-bolder" to="/agregar_paciente">Agregar Paciente</Link>
                                        </li>
                                        <li>
                                            <Link className="nav-link active fw-bolder" to="/agregar_dietas">Agregar Dietas</Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <a className="navbar-brand fw-bolder" href="#">Menu Administrador</a>
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown" align="center">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Ver
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li className="nav-item">
                                            <Link className="nav-link active fw-bolder" to="/form_pacientes">Ver Pacientes</Link>
                                        </li>
                                        <li>
                                            <Link className="nav-link active fw-bolder" to="/form_profesionales">Ver Profesionales</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown" align="center">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Agregar
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link className="nav-link active fw-bolder" to="/agregar_profesionales">Agregar Profesionales</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active fw-bolder" to="/agregar_paciente">Agregar Paciente</Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </Fragment>
                    )}
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link active fw-bolder end" id="limpiar" href="#" onClick={cambiarEstado}>
                                Cerrar Sesión
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            
        </Fragment >
    );
}; 