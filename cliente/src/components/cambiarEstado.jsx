import React from "react";

function EstadoCambiar({habilitado}){
    return (
        <div>
            <h1>{habilitado ? 'Habilitado': 'Bloqueado'}</h1>
        </div>
    );
}

export default EstadoCambiar;