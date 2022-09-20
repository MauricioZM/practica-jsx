import React from "react";
class Clock extends React.Component {
  constructor() {
    super();
    this.state = { date: new Date() };
  }

  // Cuando la salida de Clock se inserta en el DOM, React invoca al método de ciclo de vida componentDidMount().
  // Dentro de él, el componente Clock le pide al navegador que configure un temporizador para invocar al método tick()
  // del componente una vez por segundo.
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
export default Clock;

/*Ahora el reloj cambia cada segundo.

Repasemos rápidamente lo que está sucediendo y el orden en que se invocan los métodos:

Cuando se pasa <Clock /> a root.render(), React invoca al constructor del componente Clock. 
Ya que Clock necesita mostrar la hora actual, inicializa this.state con un objeto que incluye la hora actual. 
Luego actualizaremos este estado.
React invoca entonces al método render() del componente Clock. 
Así es como React sabe lo que se debe mostrar en pantalla. React entonces actualiza el DOM
para que coincida con la salida del renderizado de Clock.
Cuando la salida de Clock se inserta en el DOM, React invoca al método de ciclo de vida componentDidMount(). 
Dentro de él, el componente Clock le pide al navegador que configure un temporizador para invocar al método tick() 
del componente una vez por segundo.
Cada segundo el navegador invoca al método tick().
Dentro de él, el componente Clock planifica una actualización de la interfaz de usuario al invocar a setState() 
con un objeto que contiene la hora actual. Gracias a la invocación a setState(), 
React sabe que el estado cambió e invoca de nuevo al método render() para saber qué debe estar en la pantalla. 
Esta vez, this.state.date en el método render() será diferente, por lo que el resultado del renderizado incluirá 
la hora actualizada. Conforme a eso React actualiza el DOM.
Si el componente Clock se elimina en algún momento del DOM, React invoca al método de ciclo de vida 
componentWillUnmount(), por lo que el temporizador se detiene. */
