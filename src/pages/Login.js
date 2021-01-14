import React, { Component } from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();
 
class Login extends Component {
    state = {
        form: {
            username: '',
            pass: ''
        }
    }

    handleChange = async e => {

        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }

        });
    }

    insertLogin = () => {
        Axios.post("http://localhost:8000/insertLogin", {
            username: this.state.form.username, 
            pass: this.state.form.pass
        }).then(res => {
            if(res.data === 'True'){
                alert(`Bienvenido ${this.state.form.username}`);
                window.location.href="./menu";
            }else{
                alert(`error`);
            }
        })
    }

    login = () => {
        Axios.post("http://localhost:8000/login", {
            username: this.state.form.username, 
            pass: this.state.form.pass
        }).then(res => {
            if(res.status === 200){
                cookies.set('jwt',res.data.result, { path: '/' });
                alert(`Bienvenido ${this.state.form.username}`);
                window.location.href="./menu";
            }
        }).catch(err =>{
            alert(`${err.response.data}`);
        })
    }

    componentDidMount(){
        cookies.remove('jwt');
    }
    
    render() {
        return (
            <div className="containerPrincipal">
                <div className="containerSecundario">
                    <div className="form-group">
                        <label>Usuario: </label>
                        <br />
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            onChange={this.handleChange}
                        />
                        <br />
                        <label>Contraseña: </label>
                        <br />
                        <input
                            type="password"
                            className="form-control"
                            name="pass"
                            onChange={this.handleChange}
                        />
                        <br />
                        <button className="btn btn-success" onClick={() => this.login()}>Iniciar Sesión</button>
                        <button className="btn btn-primary" style={{marginLeft:'20px'}} onClick={() => this.insertLogin()}>Registrar</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;