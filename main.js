//esta constante no deja asignar nuevamente este elelmento
const pokemonList = document.getElementById("pokemonList")
const pokemonDetail = document.getElementById("pokemonDetail")
const pokemonInfo = document.getElementById("pokemonInfo")
const btnBack = document.getElementById("btnBack")

//esta funcion llama el endpoint de la api
async function getPokemonData(pokemonID) {
    try {
        let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
        let pokemon = await res.json()
        return pokemon
        
    } catch (error) {
        console.error(error.message)
        return null 
    }

}
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
function showPokemonDetail(pokemon){
    console.log(pokemon.types.length)
    let types =" "
    for(i=0;i<pokemon.types.length;i++){
        console.log(pokemon.types[i].type.name)
        types = types + pokemon.types[i].type.name
    }
 
    pokemonList.style.display = "none"
    pokemonDetail.style.display = "block"
    pokemonInfo.innerHTML =`
    <img src="${pokemon.sprites.front_default}" alt="image view front ${pokemon.name}">
    <img src="${pokemon.sprites.back_default}" alt="image view back ${pokemon.name}">
    <h3>${pokemon.name}</h3>    
    `
}
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
loadPokedex()