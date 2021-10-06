import React from 'react';
import '../css/Menu.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Cookies from 'universal-cookie';
import ExportExcel from 'react-export-excel'

const cookies = new Cookies();
const ExcelFile = ExportExcel.ExcelFile;
const ExcelSheet = ExportExcel.ExcelSheet;
const ExcelColumn = ExportExcel.ExcelColumn;


class Menu extends React.Component {


  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    idteletrabajadores: '',
    HoraTrabajo: '',
    HoraPersonal: '',
    HoraTerminar: '',
    SatisTeletrabajo: '',
    SatisHabitos: '',
    SatisPausas: '',
    SatisActivClave: '',
    ModoAvion: '',
    SatisExceder: '',
    Ejercicio: '',
    Familiar: '',
    SatisFiscaMental: '',
    Dolores: '',
    Transtornos: '',
    Ansiedad: '',
    Estres: '',
    count: '1'
  }

  //peticiones 

  peticionGet = () => {
    this.setState({ count: '1' })
    Axios.get("http://localhost:8000/select")
      .then((response) => {
        this.setState({ data: response.data });
      }).catch(error => {
        console.log(error.message)
      })
  }

  peticionPost = async () => {
    this.setState({ count: '1' })
    if (this.state.HoraTrabajo === "" || this.state.HoraPersonal === "" || this.state.HoraTerminar === "" || this.state.SatisTeletrabajo === "" || this.state.SatisHabitos === "" || this.state.SatisPausas === "" || this.state.SatisActivClave === "" || this.state.ModoAvion === ""|| this.state.SatisExceder === ""|| this.state.Ejercicio === ""|| this.state.Familiar === ""|| this.state.SatisFiscaMental === ""|| this.state.Dolores === ""|| this.state.Transtornos === ""|| this.state.Ansiedad === ""|| this.state.Estres === "") {
      
      alert('FALTAN DATOS');

    } else {
      await Axios.post("http://localhost:8000/insert", {
        HoraTrabajo: this.state.HoraTrabajo,
        HoraPersonal: this.state.HoraPersonal,
        HoraTerminar: this.state.HoraTerminar,
        SatisTeletrabajo: this.state.SatisTeletrabajo,
        SatisHabitos: this.state.SatisHabitos,
        SatisPausas: this.state.SatisPausas,
        SatisActivClave: this.state.SatisActivClave,
        ModoAvion: this.state.ModoAvion,
        SatisExceder: this.state.SatisExceder,
        Ejercicio: this.state.Ejercicio,
        Familiar: this.state.Familiar,
        SatisFiscaMental: this.state.SatisFiscaMental,
        Dolores: this.state.Dolores,
        Transtornos: this.state.Transtornos,
        Ansiedad: this.state.Ansiedad,
        Estres: this.state.Estres
      })
        .then(res => {
          this.modalInsertar();
          this.peticionGet();
        }).catch(error => {
          console.log(error.message)
        })
    }
  }
  

  peticionDelete = () => {
    
    this.setState({ count: '1' })
    Axios.get("http://localhost:8000/delete",
      {
        params: {
          idteletrabajadores: this.state.idteletrabajadores
        }
      })
      .then((response) => {
        this.setState({ modalEliminar: false });
        this.peticionGet();
      }).catch(error => {
        console.log(error.message)
      })
  }

  modalInsertar = () => {
    this.setState({ count: '1' })
    this.setState({ modalInsertar: !this.state.modalInsertar })
  }

  handleChange = async event => {
    this.setState({ count: '1' })
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }


  prevent = event => {
    this.setState({ count: '1' })
    event.preventDefault();
  }

  remove = () => {
    cookies.remove('jwt');
    window.location.href = "./";
  }

  componentDidMount() {
    if (cookies.get('jwt') === undefined) {
      window.location.href = "./";
      alert(`Inicia sesión`);
    } else {
      this.setState({ count: '1' })
      this.peticionGet();
    }
  }

  ventanaConsejos (){
    window.location.href="./consejos";
  }
  


  render() {
    return (
      <div className="App">
        <div className="insert">
          <button className="btn btn-success" onClick={() => { this.setState({ count: 1, HoraTrabajo: '', HoraPersonal: '', HoraTerminar: '', SatisTeletrabajo: '', SatisHabitos: '', SatisPausas: '', SatisActivClave: '', ModoAvion: '', SatisExceder: '', Ejercicio: '', Familiar: '', SatisFiscaMental: '', Dolores: '', Transtornos: '', Ansiedad: '', Estres: '', tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar</button>
          <button className="btn btn-success" style={{ marginTop: '20px' }} onClick={() => this.ventanaConsejos()}>Consejos</button>
          <ExcelFile element={<button className="btn btn-success" style={{ marginLeft: '5px', marginTop:'20px' }} >Exportar a Excel</button>} filename="teletrabajadores">
          <ExcelSheet data={this.state.data} name="teletrabajador">
            <ExcelColumn label="idpersona" value="idpersona" />
            <ExcelColumn label="HoraTrabajo" value="HoraTrabajo" />
            <ExcelColumn label="HoraPersonal" value="HoraPersonal" />
            <ExcelColumn label="HoraTerminar" value="HoraTerminar" />
            <ExcelColumn label="SatisTeletrabajo" value="SatisTeletrabajo" />
            <ExcelColumn label="SatisHabitos" value="SatisHabitos" />
            <ExcelColumn label="SatisPausas" value="SatisPausas" />
            <ExcelColumn label="SatisActivClave" value="SatisActivClave" />
            <ExcelColumn label="ModoAvion" value="ModoAvion" />
            <ExcelColumn label="SatisExceder" value="SatisExceder" />
            <ExcelColumn label="Ejercicio" value="Ejercicio" />
            <ExcelColumn label="Familiar" value="Familiar" />
            <ExcelColumn label="SatisFisicaMental" value="SatisFisicaMental" />
            <ExcelColumn label="Dolores" value="Dolores" />
            <ExcelColumn label="Transtornos" value="Transtornos" />
            <ExcelColumn label="Ansiedad" value="Ansiedad" />
            <ExcelColumn label="Estres" value="Estres" />
          </ExcelSheet>
        </ExcelFile>
        <button className="btn btn-danger" style={{ marginTop: '20px' }} onClick={() => this.remove()}>Cerrar sesión</button>
        </div>
        <div className="tabless">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">HoraTrabajo</th>
                <th scope="col">HoraPersonal</th>
                <th scope="col">HoraTerminar</th>
                <th scope="col">SatisTeletrabajo</th>
                <th scope="col">SatisHabitos</th>
                <th scope="col">SatisPausas</th>
                <th scope="col">SatisActivClave</th>
                <th scope="col">ModoAvion</th>
                <th scope="col">SatisExceder</th>
                <th scope="col">Ejercicio</th>
                <th scope="col">Familiar</th>
                <th scope="col">SatisFisicaMental</th>
                <th scope="col">Dolores</th>
                <th scope="col">Transtornos</th>
                <th scope="col">Ansiedad</th>
                <th scope="col">Estres</th>
                <th scope="col">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(teletrabajadores =>
                <tr>
                  <th scope="row">{teletrabajadores.idteletrabajadores}</th>
                  <td>{teletrabajadores.HoraTrabajo}</td>
                  <td>{teletrabajadores.HoraPersonal}</td>
                  <td>{teletrabajadores.HoraTerminar}</td>
                  <td>{teletrabajadores.SatisTeletrabajo}</td>
                  <td>{teletrabajadores.SatisHabitos}</td>
                  <td>{teletrabajadores.SatisPausas}</td>
                  <td>{teletrabajadores.SatisActivClave}</td>
                  <td>{teletrabajadores.ModoAvion}</td>
                  <td>{teletrabajadores.SatisExceder}</td>
                  <td>{teletrabajadores.Ejercicio}</td>
                  <td>{teletrabajadores.Familiar}</td>
                  <td>{teletrabajadores.SatisFiscaMental}</td>
                  <td>{teletrabajadores.Dolores}</td>
                  <td>{teletrabajadores.Transtornos}</td>
                  <td>{teletrabajadores.Ansiedad}</td>
                  <td>{teletrabajadores.Estres}</td>
                  <td><button class="btn btn-danger" onClick={() => {  this.setState({ modalEliminar: true }) }}>Eliminar</button></td>
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
                <input className="form-control" type="text" name="idteletrabajadores" placeholder={this.state.idteletrabajadores} readOnly onChange={this.handleChange} value={this.state ? this.state.idteletrabajadores : this.state.count} />
                <input type="number" class="form-control" placeholder="HoraTrabajo" name="HoraTrabajo" value={this.state ? this.state.HoraTrabajo : ''} onChange={this.handleChange} />
                <input type="number"  class="form-control" placeholder="HoraPersonal" name="HoraPersonal" value={this.state ? this.state.HoraPersonal : ''} onChange={this.handleChange} />
                <input type="number"  class="form-control" placeholder="HoraTerminar" name="HoraTerminar" value={this.state ? this.state.HoraTerminar : ''} onChange={this.handleChange} />
                <input type="number"  class="form-control" placeholder="SatisTeletrabajo" name="SatisTeletrabajo" value={this.state ? this.state.SatisTeletrabajo : ''} onChange={this.handleChange} />
                <input type="number"  class="form-control" placeholder="SatisHabitos" name="SatisHabitos" value={this.state ? this.state.SatisHabitos : ''} onChange={this.handleChange} />
                <input type="number"  class="form-control" placeholder="SatisPausas" name="SatisPausas" value={this.state ? this.state.SatisPausas : ''} onChange={this.handleChange}/>
                <input type="number" class="form-control" placeholder="SatisActivClave" name="SatisActivClave" value={this.state ? this.state.SatisActivClave : ''} onChange={this.handleChange} />
                <input type="number" class="form-control" placeholder="ModoAvion" name="ModoAvion" value={this.state ? this.state.ModoAvion : ''} onChange={this.handleChange} />
                <input type="number"  class="form-control" placeholder="SatisExceder" name="SatisExceder" value={this.state ? this.state.SatisExceder : ''} onChange={this.handleChange} />
                <input type="number"  class="form-control" placeholder="Ejercicio" name="Ejercicio" value={this.state ? this.state.Ejercicio : ''} onChange={this.handleChange} />
                <input type="number"  class="form-control" placeholder="Familiar" name="Familiar" value={this.state ? this.state.Familiar : ''} onChange={this.handleChange} />
                <input type="number"  class="form-control" placeholder="SatisFiscaMental" name="SatisFiscaMental" value={this.state ? this.state.SatisFiscaMental : ''} onChange={this.handleChange} />
                <input type="number"  class="form-control" placeholder="Dolores" name="Dolores" value={this.state ? this.state.Dolores : ''} onChange={this.handleChange} />
                <input type="number"  class="form-control" placeholder="Transtornos" name="Transtornos" value={this.state ? this.state.Transtornos : ''} onChange={this.handleChange} />
                <input type="number"  class="form-control" placeholder="Ansiedad" name="Ansiedad" value={this.state ? this.state.Ansiedad : ''} onChange={this.handleChange} />
                <input type="number"  class="form-control" placeholder="Estres" name="Estres" value={this.state ? this.state.Estres : ''} onChange={this.handleChange} />
              </form>
            </div>
          </ModalBody>
          <ModalFooter style={{ backgroundColor: '#a1a1a1' }}>
            {this.state.tipoModal === 'insertar' ?
              <button className="btn btn-success" onClick={() => this.peticionPost()}>
                Insertar
              </button> : '1'
            }
            <button className="btn btn-danger" onClick={() => this.modalInsertar()}>Cancelar</button>
          </ModalFooter>
          
        </Modal>


        <Modal isOpen={this.state.modalEliminar}>
          <ModalBody>
            Estás seguro que deseas eliminar el dato
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
