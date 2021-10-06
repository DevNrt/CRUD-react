import React from 'react';
import '../css/Consejos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import Cookies from 'universal-cookie';




const cookies = new Cookies();



class Consejos extends React.Component {




  state = {
    data: [],
    
  }

  //peticiones 



  peticionHoras = async () => {

      await Axios.post("http://localhost:8000/ConsejoHoras")
        .then(res => {

          if(res.data.mediaHoraTrabajo<6 && res.data.mediaHoraPersonal<6 && res.data.mediaHoraTerminar<1.5){
            alert(`Muy bien estas manejando tu dimensión personal y laboral correctamente`);
          }  
          
          if(res.data.mediaHoraTrabajo>6){
            alert(`Deberias tomar mas tiempo en tu vida personal, el trabajo no lo es todo`);
          } 
          
          if(res.data.mediaHoraPersonal>6){
            alert(`Es momento de dedicar mas horas al trabajo, Animo!`);
          }  
          
          if (res.data.mediaHoraTerminar>1.5){
            alert(`Intenta establecer horarios`); 
          }

        }).catch(error => {
          console.log(error.message)
        })
    
  }
  
  peticionSatis = async () => {
      
    await Axios.post("http://localhost:8000/ConsejoSatis")
      .then(res => {

        if(res.data.varianzaSatisModalidad<1.5 && res.data.varianzaSatisHabitos<1.5 && res.data.varianzaSatisPausas<1.5){
          alert(`Satisfacción correcta!`);
        }  
        
        if(res.data.varianzaSatisModalidad>1.5){
          alert(`Tal vez sea momento de cambiar de modalidad de trabajo`);
        } 
        
        if(res.data.varianzaSatisHabitos>1.5){
          alert(`Mejora tus habitos, establece rutinas saludables!`);
        }  
        
        if (res.data.varianzaSatisPausas>1.5){
          alert(`Es importante realizar pausas activas cada 2 horas de trabajo!`); 
        }

      }).catch(error => {
        console.log(error.message)
      })
  
}

peticionActi = async () => {
      
    await Axios.post("http://localhost:8000/ConsejoActi")
      .then(res => {

        if(res.data.varianzaSatisActiv<1.5 && res.data.varianzaModoAvion<1.5 && res.data.varianzaSatisExceder<1.5){
          alert(`Manejas muy bien tus actividades!`);
        }  
        
        if(res.data.varianzaSatisActiv>1.5){
          alert(`Intenta establecer los mejores horarios, para que no dejes de ultimo momento las tareas`);
        } 
        
        if(res.data.varianzaModoAvion>1.5){
          alert(`Aveces es bueno poner el telefono en modo avión, cuando puedas!`);
        }  
        
        if (res.data.varianzaSatisExceder>1.5){
          alert(`Establece horarios, el exceso de trabajo ocasiona problemas en tu salud`); 
        }

      }).catch(error => {
        console.log(error.message)
      })
  
}

peticionEjercicio = async () => {
      
    await Axios.post("http://localhost:8000/ConsejoEjercicio")
      .then(res => {

        if(res.data.mediaEjercicio>3){
          alert(`Muy bien continua con esa rutina`);
        }  
        
        if(res.data.mediaEjercicio<3){
          alert(`El ejercicio es indispensable para la salud de teletrabajadores, realiza al menos una hora de ejercicio al dia`);
        } 
        

      }).catch(error => {
        console.log(error.message)
      })
  
}

peticionSINO = async () => {

      
    await Axios.post("http://localhost:8000/ConsejoSiNO")
      .then(res => {

        if(res.data.mediaFamiliar<1.5 && res.data.mediaSatisFiscaMental<1.5 && res.data.mediaDolores<1.5 && res.data.mediaTranstorno<1.5 && res.data.mediaAnsiedad<1.5 && res.data.mediaEstres<1.5){
          alert(`Gozas de una buena salud`);
        }  
        
        if(res.data.mediaFamiliar>1.5 ){
          alert(`Tienes que separar tu dimensión familiar y laboral`);
        } 
        
        if(res.data.mediaSatisFiscaMental>1.5){
          alert(`Tomate tu tiempo para descansar, la meditación es algo que sugerimos`);
        }  
        
        if (res.data.mediaDolores>1.5){
          alert(`Es importante visitar a un ortopedista`); 
        }

        if (res.data.mediaTranstorno>1.5){
            alert(`Es importante visitar a un ortopedista`); 
          }

          if (res.data.mediaAnsiedad>1.5){
            alert(`Intenta hablar con un psicologo`); 
          }

          if (res.data.mediaEstres>1.5){
            alert(`Intenta meditar media hora diariamente`); 
          }

      }).catch(error => {
        console.log(error.message)
      })
  
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
    }
  }

  
  


  render() {
    return (
      <div className="App">
        <div className="insert">
          
        <button className="btn btn-success" style={{ marginTop: '20px', padding:"20px" }} onClick={() => this.peticionHoras()}>Horas</button> 
        <button className="btn btn-success" style={{ marginTop: '20px', padding:"20px" }} onClick={() => this.peticionSatis()}>Satisfacción</button> 
        <button className="btn btn-success" style={{ marginTop: '20px', padding:"20px" }} onClick={() => this.peticionActi()}>Actividad</button> 
        <button className="btn btn-success" style={{ marginTop: '20px', padding:"20px" }} onClick={() => this.peticionEjercicio()}>Ejercicio</button> 
        <button className="btn btn-success" style={{ marginTop: '20px', padding:"20px" }} onClick={() => this.peticionSINO()}>Salud Fisica y Mental</button> 
        <button className="btn btn-danger" style={{ marginTop: '20px', padding:"20px" }} onClick={() => this.remove()}>Cerrar sesión</button>
        </div>
        <div className="tabless">
         
        </div>

        
      </div>
    );

  }
}



export default Consejos;
