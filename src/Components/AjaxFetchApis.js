import React from "react";

function Pokemon(props) {
  return (
    <figure>
      <img src={props.avatar} alt={props.name}></img>
      <figcaptin>{props.name}</figcaptin>
    </figure>
  );
}
export default class AjaxApis extends React.Component {
  state = {
    pokemons: [],
  };

  componentDidMount() {
    let url = "https://pokeapi.co/api/v2/pokemon/";

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        json.results.forEach((el) => {
          fetch(el.url)
            .then((res) => res.json())
            .then((json) => {
              console.log(json);
              let pokemon = {
                id: json.id,
                name: json.name,
                avatar: json.sprites.front_default,
              };
              //Con el spred operator le estoy diciendo, obten una copia del estado actual y luego lo vas a combinar con este nuevo objeto llamado pokemon
              //Por ultimo hay que actualizar el estado con setState.
              let pokemons = [...this.state.pokemons, pokemon];
              this.setState({ pokemons });
            });
        });
      });
  }
  render() {
    return (
      <>
        <h2>Peticiones Asincronas en Componentes de clase</h2>
        {this.state.pokemons.length === 0 ? (
          <h3>Cargando...</h3>
        ) : (
          /* Por cada elemento que traiga renderice el elemento Pokemon */
          this.state.pokemons.map((el) => (
            <Pokemon key={el.id} name={el.name} avatar={el.avatar} />
          ))
        )}
      </>
    );
  }
}
