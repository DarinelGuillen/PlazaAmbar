import { useRef } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
/* import InputStyled from "../atoms/InputStyled"; */

import LabelStyled from "../atoms/LabelStyled";
import UserContext from "../../contexts/UserContext";
import AdminContext from "../../contexts/AdminContext";
import IdContex from "../../contexts/IdContex";
import imgLogin from "../../assets/img/img_login.jpg";
import "../../assets/img/imgLogin.png";
import "../../assets/style/FLogin.css";

function FLogin() {
  const formDataL = useRef();
  const navigate = useNavigate();
  const formL = useRef();
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const { isAdmin, setIsAdmin } = useContext(AdminContext);
  const { isIduser, setIsiduser } = useContext(IdContex);
  const [Label, setLabel] = useState("");
  const handlerClick = (e) => {
    e.preventDefault();

    const formData = new FormData(formDataL.current);
    const userName = formData.get("nombreDeUsuario");
    const contrasenia = formData.get("contrasenia");
    const url = `https://localhost/users/${userName}/${contrasenia}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        //console.log("DATA.....", data);
        if (data.datos && data.datos.length === 3) {
          const [id, admin, nombreDeUsuario] = data.datos;
          setIsAdmin(admin);
          setIsLoggedIn(true);
          setIsiduser(id);
          setLabel("");
          admin ? navigate("/Admin") : navigate("/CommonUser");
        } else {
          setLabel(data.message || "Error desconocido");
        }
      })
      .catch((err) => {
        setLabel(err, "Algo inesperado a pasado de nuestro lado");
      });
  };

  return (
    <>
      <center>
        <div className="contenedorLogincito ">
          <section className="contact-box">
            <div className="row no-gutters">
              <div className="col-xl-7 col-lg-12 d-flex">
                <div className="container align-self-center p-6">
                  <h1 className="font-weight-bold mb-3 ">Inicio de sesión</h1>
                  <p className="text-muted mb-5">Ingresa la siguiente información para inicio de sesión</p>        
                    <form ref={formDataL}>
                      <div className="form-group mb-3">
                          <label className="font-weight-bold labelLogin" htmlFor="username">Nombre de usuario</label>
                          <input type="text" className="form-control" name="nombreDeUsuario" placeholder="Ingresa tu nombre de usuario"/>
                      </div>
                      <div className="form-group mb-3">
                          <label className="font-weight-bold labelLogin" htmlFor="password">Contraseña </label>
                          <input type="password" className="form-control" name="contrasenia" placeholder="Ingresa tu contraseña"/>
                      </div>
                      <button className="btn btn-primary width-100" onClick={handlerClick}>Iniciar Sesion{" "}</button>
                      <div className="padreLinks">
                        <div>
                          <Link to="/SingIn">
                            <label className="linksForms">Registrarme</label>
                          </Link>
                        </div>
                        <div>
                          <Link to="/">
                            <label className="linksForms">Regresar</label>
                          </Link>
                        </div>
                      </div>
                    </form>
                    </div>
                  </div>
                <div className="col-xl-5 col-lg-12 login-bg">    
              </div>
            </div>
          </section>
        </div>
      </center>
    </>
  );
}
export default FLogin;



   /*   <div className="formLoginG">
        <div className="padreImgLogin">
          
        </div>
        <div className="contenedorFormulario">
          <form ref={formDataL}>
            <div className="ordenamiento">
              <label className="labelTitulo">Inicio de sesión</label>
              <label htmlFor="username">Username</label>
            
              <input type="text" name="nombreDeUsuario" />
              <label htmlFor="password">Password</label>
              <input type="password" name="contrasenia" />

              <LabelStyled danger={true} label={Label}></LabelStyled>
              <button className="botonFlogin" onClick={handlerClick}>
                Iniciar Sesion{" "}
              </button>
              
            </div>
              
          </form>
        </div>
      </div>  */