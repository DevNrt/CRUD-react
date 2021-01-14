import React from 'react';
import '../css/Menu.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();

class Menu extends React.Component {


  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    name: '',
    idnessus: '',
    cve: '',
    description: '',
    advice: '',
    referencias: '',
    csv: '',
    idvulns: '',
    tipoModal: '',
    cliente:'',
    count: '1'
  }

  //peticiones 

  peticionGet = () => {
    this.setState({count:'1'})
    Axios.get("http://localhost:8000/select")
      .then((response) => {
        this.setState({ data: response.data });
      }).catch(error => {
        console.log(error.message)
      })
  }

  peticionPost = async () => {
    this.setState({count:'1'})
    await Axios.post("http://localhost:8000/insert", {
      idnessus: this.state.idnessus,
      cve: this.state.cve,
      name: this.state.name,
      description: this.state.description,
      advice: this.state.advice,
      referencias: this.state.referencias,
      csv: this.state.csv,
      cliente: this.state.cliente
    })
      .then(res => {
        console.log(res)
        this.modalInsertar();
        this.peticionGet();
      }).catch(error => {
        console.log(error.message)
      })
  }

  selectVuln = (vulns) => {
    this.setState({count:'1'})
    this.setState({
      tipoModal: 'actualizar',
      idvulns: vulns.idvulns,
      idnessus: vulns.idnessus,
      name: vulns.name,
      cve: vulns.cve,
      description: vulns.description,
      advice: vulns.advice,
      referencias: vulns.referencias,
      csv: vulns.csv,
      cliente: this.state.cliente
    })
  }

  peticionUpdate = async () => {
    this.setState({count:'1'})
    await Axios.post("http://localhost:8000/update", {
      idvulns: this.state.idvulns,
      idnessus: this.state.idnessus,
      cve: this.state.cve,
      name: this.state.name,
      description: this.state.description,
      advice: this.state.advice,
      referencias: this.state.referencias,
      csv: this.state.csv,
      cliente: this.state.cliente
    })
      .then(res => {
        this.modalInsertar();
        this.peticionGet();
      }).catch(error => {
        console.log(error.message)
      })
  }
  //delete

  peticionDelete = () => {
    this.setState({count:'1'})
    Axios.get("http://localhost:8000/delete",
      {
        params: {
          idvulns: this.state.idvulns
        }
      })
      .then((response) => {
        this.setState({modalEliminar: false});
        this.peticionGet();
      }).catch(error => {
        console.log(error.message)
      })
  }

  modalInsertar = () => {
    this.setState({count:'1'})
    this.setState({ modalInsertar: !this.state.modalInsertar })
  }

  handleChange = async event => {
    this.setState({count:'1'})
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  prevent = event => {
    this.setState({count:'1'})
    event.preventDefault();
  }

  remove = () => {
    cookies.remove('jwt');
    window.location.href="./";
  }

  componentDidMount() {
    if(cookies.get('jwt') === undefined){
      window.location.href="./";
      alert(`Inicia sesión`);
    } else{
      this.setState({count:'1'})
      this.peticionGet();
    }
  }



  render() {
    return (
      <div className="App">
        <div className="insert">
          <button className="btn btn-success" onClick={() => { this.setState({ count:1 ,idnessus: '', cve: '', name: '', description: '', advice: '', referencias: '', csv: '', cliente:'', tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar</button>
          <button className="btn btn-danger" style={{marginTop:'20px'}} onClick={() =>this.remove()}>Cerrar sesión</button>
        </div>
        <div className="tabless">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">IdNessus</th>
                <th scope="col">CVE</th>
                <th scope="col">Nombre</th>
                <th scope="col">Descripción</th>
                <th scope="col">Consejos</th>
                <th scope="col">Referencias</th>
                <th scope="col">CSV</th>
                <th scope="col">Cliente</th>
                <th scope="col">Actualizar</th>
                <th scope="col">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(vulns =>
                <tr>
                  <th scope="row">{vulns.idvulns}</th>
                  <td>{vulns.idnessus}</td>
                  <td>{vulns.cve}</td>
                  <td>{vulns.name}</td>
                  <td>{vulns.description}</td>
                  <td>{vulns.advice}</td>
                  <td>{vulns.referencias}</td>
                  <td>{vulns.csv}</td>
                  <td>{vulns.cliente}</td>
                  <td><button class="btn btn-info" onClick={() => { this.selectVuln(vulns); this.modalInsertar() }}>Actualizar</button></td>
                  <td><button class="btn btn-danger" onClick={() => { this.selectVuln(vulns); this.setState({modalEliminar:true})}}>Eliminar</button></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader className="header">
            <label>Insertar vulnerabilidad</label>
          </ModalHeader>
          <ModalBody>
            <div className="containerforms">
              <form className="form" onSubmit={this.prevent}>
                <input className="form-control" type="text" name="idvulns" placeholder={this.state.idvulns} readOnly onChange={this.handleChange} value={this.state ? this.state.idvulns : this.state.count}/>
                <input type="number" class="form-control" placeholder="Id nessus" name="idnessus" value={this.state ? this.state.idnessus : ''} onChange={this.handleChange} />
                <input type="text" class="form-control" placeholder="CVE" name="cve" value={this.state ? this.state.cve : ''} onChange={this.handleChange} />
                <input type="text" class="form-control" placeholder="Nombre de la vulnerabilidad" name="name" value={this.state ? this.state.name : ''} onChange={this.handleChange} />
                <textarea type="text" class="form-control" placeholder="Descripción" name="description" value={this.state ? this.state.description : ''} onChange={this.handleChange} ></textarea>
                <textarea type="text" class="form-control" placeholder="Consejos" name="advice" value={this.state ? this.state.advice : ''} onChange={this.handleChange} ></textarea>
                <textarea type="text" class="form-control" placeholder="Referencias" name="referencias" value={this.state ? this.state.referencias : ''} onChange={this.handleChange} ></textarea>
                <input type="number" class="form-control" placeholder="CSV" name="csv" value={this.state ? this.state.csv : ''} onChange={this.handleChange} />
                <textarea type="text" class="form-control" placeholder="Cliente" name="cliente" value={this.state ? this.state.cliente : ''} onChange={this.handleChange} ></textarea>
              </form>
            </div>
          </ModalBody>

          <ModalFooter style={{ backgroundColor: '#a1a1a1' }}>
            {this.state.tipoModal === 'insertar' ?
              <button className="btn btn-success" onClick={() => this.peticionPost()}>
                Insertar
                  </button> : <button className="btn btn-primary" onClick={() => this.peticionUpdate()}>
                Actualizar
                  </button>
            }
            <button className="btn btn-danger" onClick={() => this.modalInsertar()}>Cancelar</button>
          </ModalFooter>
        </Modal>


        <Modal isOpen={this.state.modalEliminar}>
          <ModalBody>
            Estás seguro que deseas eliminar a la vulnerabilidad
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Sí</button>
            <button className="btn btn-secundary" onClick={() => this.setState({ modalEliminar: false })}>No</button>
          </ModalFooter>
        </Modal>

      </div>
    );

  }
}



export default Menu;
