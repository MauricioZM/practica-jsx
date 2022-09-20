import React, { Component } from "react";

class Reloj extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  //Este método se ejecuta cuando el componente ya no exista
  componentWillUnmount() {
    console.log(3, "El componente ha sido eliminado del DOM");
  }

  render() {
    return <h3>{this.props.hora}</h3>;
  }
}

export default class CicloVida extends Component {
  constructor(props) {
    super(props);
    console.log(0, "El componente se inicializa, Aún No está en el DOM");

    this.state = {
      hora: new Date().toLocaleTimeString(),
      visible: false,
    };
    this.temporizador = null;
  }
  //React nos pide que cualquier suscripción a una BD a servicio o a solicitar datos de una API lo hagamos en el componentDidMount();
  componentDidMount() {
    console.log(1, "El componente ya se encuentra en el DOM");
  }
  // El componentDidUpdate nos manda el estado previo se ejecuta 1 segundo antes de redibujar el DOM, se utiliza en caso que se necesite
  // Guardar o comparar el estado anterior, antes de actualizarlo.
  componentDidUpdate(prevProps, prevState) {
    console.log(2, "El estado o las props del componente han cambiado");
    console.log(prevProps);
    console.log(prevState);
  }

  tictac = () => {
    this.temporizador = setInterval(() => {
      this.setState({
        hora: new Date().toLocaleTimeString(),
      });
    }, 1000);
  };

  iniciar = () => {
    this.tictac();
    this.setState({
      visible: true,
    });
  };

  Detener = () => {
    clearInterval(this.temporizador);
    this.setState({
      visible: false,
    });
  };

  render() {
    console.log(
      4,
      "El componente se dibuja o redibuja por algún cambio en el DOM"
    );
    return (
      <>
        <h2>Ciclo de vida de los componentes</h2>
        {/*Técnica del renderizado condicional*/}
        {this.state.visible && <Reloj hora={this.state.hora} />}
        <button onClick={this.iniciar}>Iniciar</button>
        <button onClick={this.Detener}>Detener</button>
      </>
    );
  }
}
