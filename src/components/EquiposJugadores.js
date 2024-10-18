import React, { Component } from 'react'
import axios from 'axios'
import Global from './Global'

export default class EquiposJugadores extends Component {

    state = {
        equipos: [],
        tabla: null
    }

    cajaEquipo = React.createRef();
    cajaJugador = React.createRef();

    BuscarPorNombre = (e) => {
        e.preventDefault();

        let jugadorNombre = this.cajaJugador.current.value;
        let request = "api/Jugadores/FindJugadores/" + jugadorNombre;

        let url = Global.urlApiEjemplos + request;
        if (jugadorNombre !== "") {
            axios.get(url).then(response => {
                this.setState({
                    tabla: response.data
                })
            })
        }

    }

    BuscarPorJugadores = (e) => {
        e.preventDefault();

        let idEquipo = this.cajaEquipo.current.value;
        let request = "api/Jugadores/JugadoresEquipos/" + idEquipo;

        let url = Global.urlApiEjemplos + request;
        axios.get(url).then(response => {
            this.setState({
                tabla: response.data
            })
        })

    }

    loadEquipos = () => {
        let request = "api/Equipos";

        let url = Global.urlApiEjemplos + request;
        axios.get(url).then(response => {
            this.setState({
                equipos: response.data
            })
        })
    }

    componentDidMount = () => {
        console.log("Creando componente, generando equipos...");
        
        this.loadEquipos();
    }
    
  render() {
    return (
      <div>
        <h1>Equipos Jugadores</h1>
        <form>
            <label>Nombre jugador: </label>
            <input type='text' ref={this.cajaJugador}/>
            <button onClick={this.BuscarPorNombre}>
                Buscar por NOMBRE
            </button> 
        </form>     
        <hr/>
        <form>
            <label>Seleccione un equipo: </label>
            <select ref={this.cajaEquipo}>
                {
                    this.state.equipos.map((equipo, index) => {
                        return (
                            <option key={index} value={equipo.idEquipo}>
                                {equipo.nombre}
                            </option>
                        )
                    })
                }
            </select>
            <button onClick={this.BuscarPorJugadores}>
                Buscar Jugadores
            </button>    
        </form>
        {
            this.state.tabla &&
            (
                <table border='1'>
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Posicion</th>
                            <th>Pais</th>
                            <th>Fecha nacimiento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.tabla.map((jugador, index) => {
                                return (
                                    <tr key={index} style={{textAlign: "center"}}>
                                        <td><img src={jugador.imagen} style={{width: "150px", height: "150px"}}/></td>
                                        <td>{jugador.nombre}</td>
                                        <td>{jugador.posicion}</td>
                                        <td>{jugador.pais}</td>
                                        <td>{jugador.fechaNacimiento}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            )
        }
      </div>
    )
  }
}
