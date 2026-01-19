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
function typeColor(typeName){
  switch (typeName) {
    case 'grass':
      return "#7AC74C";
    case 'fire':
      return "#EE8130";
    case 'water':
      return "#6390F0";
    case 'bug':
      return "#A6B91A";
    case 'normal':
      return "#A8A77A";
    case 'poison':
      return "#A33EA1";
    case 'electric':
      return "#F7D02C";
    case 'ground':
      return "#E2BF65";
    case 'fairy':
      return "#D685AD";
    case 'fighting':
      return "#C22E28";
    case 'psychic':
      return "#F95587";
    case 'rock':
      return "#B6A136";
    case 'ghost':
      return "#735797";
    case 'ice':
      return "#96D9D6";
    case 'dragon':  
      return "#6F35FC";
    case 'dark':
      return "#705746";
    case 'steel':
      return "#B7B7CE";
    case 'flying':
      return "#A98FF3";
  }
}

function statsColor(statValue){
    if (statValue <= 40) {
      return "red";
    }
    else if (statValue > 40 && statValue <= 75) {
      return "orange"
    }
    else if (statValue > 75 && statValue <= 99) { 
      return "yellow"
    }
    else if (statValue > 99 && statValue <= 125) { 
      return "limegreen"
    }
    else if (statValue > 125 && statValue < 150) {
      return "springgreen"
    }
    else if (statValue >= 150) {
      return "cyan"
    }
  }

  function sizeStats(statValue){
    if (statsColor(statValue) === "red"){ 
      return "3px 10px"
    }
    else if (statsColor(statValue) === "orange"){ 
      return "3px 20px"
    }
    else if (statsColor(statValue) === "yellow"){
      return "3px 30px"
    }
    else if (statsColor(statValue) === "limegreen"){
      return "3px 40px"
    }
    else if (statsColor(statValue) === "springgreen"){
      return "3px 50px"
    }
    else if (statsColor(statValue) === "cyan"){
      return "3px 60px"
    }
  }

function setPokemonData(data){
  input.value = data.id
  document.getElementById("pokemon-name").innerHTML = data.name[0].toUpperCase() + data.name.slice(1)
  document.getElementById("pokemon-id").innerHTML = "#" + data.id
  document.getElementById("weight").innerHTML = "Weight: " + data.weight / 10 + " kg"
  document.getElementById("height").innerHTML = "Height: " + data.height / 10 + " m"
  document.getElementById("sprite").src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`
  document.getElementById("spriteS").src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${data.id}.png`

  // single type of Pokemon
  let types = document.getElementById("types");
  if (typeof(data.types[1]) == 'undefined'){
      let type = document.createElement("span");
      type.setAttribute("style", "font-weight: bold; padding-right: 20px; padding-top: 2px; padding-left: 20px; padding-bottom: 2px; border: 1px solid black; border-radius: 8px;");
      type.style.backgroundColor = typeColor(data.types[0].type.name);
      
      type.innerText = data.types[0].type.name.toUpperCase();
      types.appendChild(type); 
  }
  // dualtypes of Pokemon
  else{
      let type = document.createElement("span")
      type.setAttribute("style", "font-weight: bold; padding-right: 20px; padding-top: 2px; padding-left: 20px; padding-bottom: 2px; border: 1px solid black; border-radius: 8px;");
      type.style.backgroundColor = typeColor(data.types[0].type.name);
      
      let type2 = document.createElement("span")
      type2.setAttribute("style", "font-weight: bold; padding-right: 20px; padding-top: 2px; padding-left: 20px; padding-bottom: 2px; border: 1px solid black; border-radius: 8px;");
      type2.style.backgroundColor = typeColor(data.types[1].type.name);

      type.innerText = data.types[0].type.name.toUpperCase() ;
      type2.innerText = data.types[1].type.name.toUpperCase();
      types.appendChild(type)
      types.appendChild(type2)
  }
  //stats of the Pokemon
  document.getElementById("stats").removeAttribute("hidden")

  let hp = document.getElementById("hp");
  hp.setAttribute("style", "padding: " + sizeStats(data.stats[0].base_stat) + "; border: 1px solid black; background-color:"+ statsColor(data.stats[0].base_stat) + ";");
  hp.innerText = data.stats[0].base_stat;
  
  let attack = document.getElementById("attack");
  attack.setAttribute("style", "padding: " + sizeStats(data.stats[1].base_stat) + "; border: 1px solid black; background-color:"+ statsColor(data.stats[1].base_stat) + ";");
  attack.innerText = data.stats[1].base_stat;
  
  let defense = document.getElementById("defense");
  defense.setAttribute("style", "padding: " + sizeStats(data.stats[2].base_stat) + "; border: 1px solid black; background-color:"+ statsColor(data.stats[2].base_stat) + ";");
  defense.innerText = data.stats[2].base_stat;
  
  let specialAttack = document.getElementById("special-attack");
  specialAttack.setAttribute("style", "padding: " + sizeStats(data.stats[3].base_stat) + "; border: 1px solid black; background-color:"+ statsColor(data.stats[3].base_stat) + ";");
  specialAttack.innerText = data.stats[3].base_stat;
  
  let specialDefense = document.getElementById("special-defense");
  specialDefense.setAttribute("style", "padding: " + sizeStats(data.stats[4].base_stat) + "; border: 1px solid black; background-color:"+ statsColor(data.stats[4].base_stat) + ";");
  specialDefense.innerText = data.stats[4].base_stat;
  
  let speed = document.getElementById("speed");
  speed.setAttribute("style", "padding: " + sizeStats(data.stats[5].base_stat) + "; border: 1px solid black; background-color:"+ statsColor(data.stats[5].base_stat) + ";");
  speed.innerText = data.stats[5].base_stat;
  
  document.getElementById("hp").innerHTML = data.stats[0].base_stat
  document.getElementById("attack").innerHTML = data.stats[1].base_stat
  document.getElementById("defense").innerHTML = data.stats[2].base_stat
  document.getElementById("special-attack").innerHTML = data.stats[3].base_stat
  document.getElementById("special-defense").innerHTML = data.stats[4].base_stat
  document.getElementById("speed").innerHTML = data.stats[5].base_stat
  document.getElementById("total").innerHTML = data.stats[0].base_stat + data.stats[1].base_stat + data.stats[2].base_stat + data.stats[3].base_stat + data.stats[4].base_stat + data.stats[5].base_stat
  
  
}