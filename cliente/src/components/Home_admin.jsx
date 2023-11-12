import { Fragment } from "react";

export const Home_admin = () => {

    return (
        <Fragment>
                
                    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src=".//img/2.gif" class="d-block w-100" width="200px" height="694px"/>
                            </div>
                            <div class="carousel-item">
                                <img src=".//img/4.gif" class="d-block w-100" width="200px" height="694px" />
                            </div>
                            <div class="carousel-item">
                                <img src=".//img/3.gif" class="d-block w-100" width="200px" height="694px" />
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Anterior</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Siguiente</span>
                        </button>
                    </div>
                
        </Fragment>
    )
};