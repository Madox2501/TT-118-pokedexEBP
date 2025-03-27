//esta constante no deja asignar nuevamente este elelmento
const pokemonList = document.getElementById("pokemonList")
const pokemonDetail = document.getElementById("pokemonDetail")
const pokemonInfo = document.getElementById("pokemonInfo")
const btnBack = document.getElementById("btnBack")
const searchInput = document.getElementById("searchInput")
const btnSearch = document.getElementById("btnSearch")
let pokemonToSearch = ""


//esta funcion llama el endpoint de la api
async function getPokemonData(pokemonID) {
    try {
        let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
        let pokemon = await res.json()
        return pokemon
        
    } catch (error) {
        console.error(error.message)
        return false 
    }

}


//funcion para mostrar el pokemon en tarjeta
function displayPokemon(pokemon){
    const pokemonCard = document.createElement("div")
    pokemonCard.classList.add("pokemon-card")
    pokemonCard.innerHTML = `
    <img src="${pokemon.sprites.front_default}">
    <h3>${pokemon.name}</h3>
    <p>ID: ${pokemon.id}</p>
    `
    pokemonCard.addEventListener("click",()=>showPokemonDetail(pokemon))
    pokemonList.appendChild(pokemonCard)
    return true
}

//funcion para mostrar la info del pokemon ocultando el listado principal
function showPokemonDetail(pokemon){
    console.log(pokemon)
    showPokemonStats(pokemon)
    let typesName =[]
    let typesImg =""
    for(i=0;i<pokemon.types.length;i++){
        console.log(pokemon.types[i].type.name)
        typesImg = typesImg + `<img src="./assets/${pokemon.types[i].type.name}.svg" height="100px" alt="">`
        typesName.push(pokemon.types[i].type.name)
    }
 
    pokemonList.style.display = "none"
    pokemonDetail.style.display = "block"
    pokemonInfo.innerHTML =`
    <img src="${pokemon.sprites.front_default}" alt="image view front ${pokemon.name}">
    <img src="${pokemon.sprites.back_default}" alt="image view back ${pokemon.name}">
    <h3>${pokemon.name}</h3>
    <h3>${pokemon.id}</h3>
    <div>${typesImg}</div>
    ${showPokemonStats(pokemon)}
    `
}

//funcion para hacer la busqueda del listado de pokemones
async function loadPokedex() {
    for (let i=1;i<=5;i++){
    let pokemon = await getPokemonData(i)
    displayPokemon(pokemon)
    }
}
btnBack.addEventListener("click",()=>{
    pokemonList.style.display = "grid"
    pokemonDetail.style.display = "none"
})

searchInput.addEventListener("input",(e)=>{
    pokemonToSearch = e.target.value
    console.log(pokemonToSearch)
})

btnSearch.addEventListener("click",async ()=>{
    let pokemon = await getPokemonData(pokemonToSearch)
    if(pokemon==false){
        console.error("pokemon not found")
        return alert("pokemon not found")
    }
    showPokemonDetail(pokemon)
})

function showPokemonStats(pokemon){
    console.log(pokemon)
    let stats =[]
    let base_stat =""
    for(let i=0;i<pokemon.stats.length;i++){
        console.log(pokemon.stats[i].base_stat)
    }
}



loadPokedex()