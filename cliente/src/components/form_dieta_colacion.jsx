
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";


export const Ver_colaciones_dieta = () => {
    return (
        <Fragment>
            <div>
                <h3>Dieta</h3>
                <label>Nombre:</label>
                <input type="text" name="nombre" />
                <br />
                <br />
                <label>Tipo:</label>
                <br />
                <select name="tipoDieta">
                    <option value="Vegana">Vegana</option>
                    <option value="Pescetariano">Pescetariano</option>
                    <option value="Pollotariano">Pollotariano</option>
                    <option value="Flexitarianos">Flexitarianos</option>
                    <option value="Crudiveganos">Crudiveganos</option>
                </select>
            </div>
            <br />
            <div>
                <h3>Colacion</h3>
                <label>Hora:</label>
                <input type="time" name="hora" />
                <br />
                <select name="tipoComida">
                    <option value="">Seleccione su hora de comida </option>
                    <option value="Desayuno">Desayuno</option>
                    <option value="Almuerzo">Almuerzo</option>
                    <option value="Cena">Cena</option>
                </select>
                <br />
                <br />
                <button type="submit">Enviar</button>
            </div>
        </Fragment>
    )
};

