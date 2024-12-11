let search = document.getElementById("search-button");
let input = document.getElementById("search-input");
let nextBtn = document.getElementById("next");
let prevBtn = document.getElementById("prev");

search.addEventListener("click", e => {
  document.getElementById("types").innerHTML = ""
  e.preventDefault()
  getPokemon()
})

nextBtn.addEventListener("click", e => {
  document.getElementById("types").innerHTML = ""
  e.preventDefault()
  getNextPokemon()
})

prevBtn.addEventListener("click", e => {
  document.getElementById("types").innerHTML = ""
  e.preventDefault()
  getPrevPokemon()
})

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 13:
            document.getElementById("search-button").click();
            break;
        case 39:
            document.getElementById("next").click();
            break;
        case 37:
            document.getElementById("prev").click();
            break;
    }
};

const getPokemon = async () => {
  try{
    let pokemonNameOrId = input.value
    const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId.toLowerCase()}`);
    const data = await res.json()
    console.log(data)
    setPokemonData(data)
  }
  catch (err){ 
    alert("Pokémon not found")
    console.log(err)
  }
}

const getNextPokemon = async () => {
  try{
    let pokemonNameOrId = 0
    if(Number(input.value) === 1025){
      pokemonNameOrId = 10001
    }
    else{
      pokemonNameOrId = Number(input.value)+1
    }
    const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`);
    const data = await res.json()
    setPokemonData(data)
  }
  catch (err){ 
    alert("Pokémon not found")
    console.log(err)
  }
}

const getPrevPokemon = async () => {
  try{
    let pokemonNameOrId = 0
    if(Number(input.value) === 10001){
      pokemonNameOrId = 1025
    }
    else{
      pokemonNameOrId = Number(input.value)-1
    }
    const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`);
    const data = await res.json()
    setPokemonData(data)
  }
  catch (err){ 
    alert("Pokémon not found")
    console.log(err)
  }
}

function setPokemonData(data){
  input.value = data.id
  document.getElementById("pokemon-name").innerHTML = data.name[0].toUpperCase() + data.name.slice(1)
  document.getElementById("pokemon-id").innerHTML = "#" + data.id
  document.getElementById("weight").innerHTML = "Weight: " + data.weight
  document.getElementById("height").innerHTML = "Height: " + data.height
  document.getElementById("sprite").src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`
  document.getElementById("spriteS").src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${data.id}.png`

    //document.getElementById("types").appendChild(span) 
  let types = document.getElementById("types");
  if (typeof(data.types[1]) == 'undefined'){
      let type = document.createElement("span")
      type.innerText = data.types[0].type.name.toUpperCase();
      types.appendChild(type) 
  }
  else{
      let type = document.createElement("span")
      let type2 = document.createElement("span")
      type.innerText = data.types[0].type.name.toUpperCase() + " " ;
      type2.innerText = data.types[1].type.name.toUpperCase();
      types.appendChild(type)
      types.appendChild(type2)
  }
  document.getElementById("stats").removeAttribute("hidden")
  document.getElementById("hp").innerHTML = data.stats[0].base_stat
  document.getElementById("attack").innerHTML = data.stats[1].base_stat
  document.getElementById("defense").innerHTML = data.stats[2].base_stat
  document.getElementById("special-attack").innerHTML = data.stats[3].base_stat
  document.getElementById("special-defense").innerHTML = data.stats[4].base_stat
  document.getElementById("speed").innerHTML = data.stats[5].base_stat
  document.getElementById("total").innerHTML = data.stats[0].base_stat + data.stats[1].base_stat + data.stats[2].base_stat + data.stats[3].base_stat + data.stats[4].base_stat + data.stats[5].base_stat
}
