import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Spinner, Card, Button, Modal } from 'react-bootstrap';

export default function Forms() {
  const [producto, setProducto] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [idGlobal, setIdGlobal] = useState(-1);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (item) => {

    setShow(true);
    setValue("id23", item.id);
    setValue("rutEdit23", item.rut);
    setValue("nombreEdit23", item.nombre);

  };
  const editarDesdeModal = (data) => {
    console.log(data);
    fetch(`http://localhost:4000/api/demo/edit/${data.id23}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rut: data.rutEdit23, nombre: data.nombreEdit23 })
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProducto(data);
        //console.table(data);
        handleClose();
      })
      .catch((error) => { console.error(error); });

  }
  useEffect(() => {

    fetch("http://localhost:4000/api/demo")
      .then((response) => {
        return response.json();
      })
      .then((data) => {

        setProducto(data);
        setIsLoading(false);
        //console.table(data);
      })
      .catch((error) => { console.error(error); setIsLoading(false); });
  }, [producto]);

  function formatoFecha(fecha) {
    let fechaMod = new Date(fecha).toLocaleDateString('en-ES', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
    let partes = fechaMod.split("/");
    return `${partes[1]}/${partes[0]}/${partes[2]}`;
  }

  function formatoFechaCalendario(fecha) {
    let fechaMod = new Date(fecha).toLocaleDateString('en-ES', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
    let partes = fechaMod.split("/");
    let mes = 0;
    if (Number(partes[0]) > 9) {
      mes = '' + partes[0];
    }
    else {
      mes = '0' + partes[0];
    }
    let dia = 0;
    if (Number(partes[1]) > 9) {
      dia = '' + partes[1];
    }
    else {
      dia = '0' + partes[1];
    }
    return `${partes[2]}-${mes}-${dia}`;
  }
  function eliminar(id) {
    fetch(`http://localhost:4000/api/demo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      //body: JSON.stringify({ estado: !state })
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProducto(data);
        //console.table(data);
      })
      .catch((error) => { console.error(error); });
  }
  function cambiarEstado(id, state) {
    fetch(`http://localhost:4000/api/demo/${id}`, {
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
        setProducto(data);
        //console.table(data);
      })
      .catch((error) => { console.error(error); });
  }

  function agregar(data) {
    console.log(idGlobal);
    if (idGlobal !== -1) {
      fetch(`http://localhost:4000/api/demo/edit/${idGlobal}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setProducto(data);
          //console.table(data);
        })
        .catch((error) => { console.error(error); });
    }
    else {
      fetch(`http://localhost:4000/api/demo/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setProducto(data);
          //console.table(data);
        })
        .catch((error) => { console.error(error); });
    }
  }

  function seleccionar(item) {
    if (Number(item.id) > 0) {
      setValue("nombre", item.nombre);
      setValue("rut", item.rut);
      setValue("estado", item.estado);
      setValue("fecha", formatoFechaCalendario(item.fecha));
      setIdGlobal(item.id);
    }
  }
  return (
    <Fragment>
      <div className="col-md-6">
        <h1 className="text-primary m-3">Add students</h1>

        <i>https://react-bootstrap.netlify.app/docs/components/spinners/</i>
      </div>
      <div className="col-md-6">
        <h1 className="text-primary m-3">List students</h1>
        {isLoading ? (
          <Spinner animation="border" variant="warning" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        ) : (
          <div className="container">


            <div className="row">

              {
                producto.map((item) => (
                  <div className="col-md-6">
                    <div className="mb-2">
                      <Card>
                        <Card.Body>
                          <Card.Title>{item.nombre}</Card.Title>
                          <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                          </Card.Text>
                          <Button variant="primary">Go somewhere</Button>{' '}
                          <Button variant="primary" onClick={() => handleShow(item)}>
                            modal
                          </Button>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

        )}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(editarDesdeModal)}>
            <div className="mb-3 visually-hidden">
              <input id="id23"
                {...register("id23", { required: true })}
                className={`form-control ${errors.id23 ? 'is-invalid' : ''}`}
              />
            </div>
            <div className="mb-3">
              <input id="rutEdit23"
                {...register("rutEdit23", { required: true })}
                className={`form-control ${errors.rutEdit23 ? 'is-invalid' : ''}`}
              />
              {errors.rutEdit23?.type === 'required' && <span className="invalid-feedback" role="alert">rut es requerido</span>}
            </div>
            <div className="mb-3">
              <input id="nombreEdit23"
                {...register("nombreEdit23", { required: true })}
                className={`form-control ${errors.nombreEdit23 ? 'is-invalid' : ''}`}
              />
              {errors.nombreEdit23?.type === 'required' && <span className="invalid-feedback" role="alert">rut es requerido</span>}
            </div>
            <div className="mb-3">
              <input type="submit" className="btn btn-primary" value="Aregar" />
            </div>
          </form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>

  )
}  