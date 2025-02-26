export async function getAllPokemons(){
    const url = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
    const res = await fetch(url);
    if (!res.ok) {
        throw {
            message: 'Failed to get all Pokemons',
            statusText: res.statusText,
            status: res.status
        }
    }

    const data = await res.json()
    let results = data.results;
    let promisesArr = results.map(async result => {
        const response = await fetch(result.url);
        return await response.json();
    })

    const newData = await Promise.all(promisesArr)
    return newData
}

export async function getAllPokemonSpecies(){
    const url = 'https://pokeapi.co/api/v2/pokemon-species?offset=20&limit=1025';
    const res = await fetch(url);
    if (!res.ok) {
        throw {
            message: 'Failed to get all Pokemons',
            statusText: res.statusText,
            status: res.status
        }
    }

    const data = await res.json()
    let results = data.results;
    let promisesArr = results.map(async result => {
        const response = await fetch(result.url);
        return await response.json();
    })

    const newData = await Promise.all(promisesArr)
    let newPromisesArr = newData.map(async (entry) => {
        const varieties = entry.varieties;
        const response = await fetch(varieties[0].pokemon.url)
        for (let variety in varieties){
            if (variety.is_default === true) {
                response = await fetch(variety.pokemon.url)
            }
        }
        return await response.json()
    })

    const newData2 = await Promise.all(newPromisesArr)

    return newData2
}


export async function getAllLegendaryPokemons(){
    const url = 'https://pokeapi.co/api/v2/pokemon-species?offset=20&limit=1025';
    const res = await fetch(url);
    if (!res.ok) {
        throw {
            message: 'Failed to get all Pokemons',
            statusText: res.statusText,
            status: res.status
        }
    }

    const data = await res.json()
    let results = data.results;
    let promisesArr = results.map(async result => {
        const response = await fetch(result.url);
        return await response.json();
    })

    const newData = await Promise.all(promisesArr)
    let legendary_species = newData.filter((pokemon) => pokemon.is_legendary)
    let newPromisesArr = legendary_species.map(async (entry) => {
        const varieties = entry.varieties;
        const response = await fetch(varieties[0].pokemon.url)
        for (let variety in varieties){
            if (variety.is_default === true) {
                response = await fetch(variety.pokemon.url)
            }
        }
        return await response.json()
    })

    const newData2 = await Promise.all(newPromisesArr)

    return newData2
}


export async function getAllMythicalPokemons(){
    const url = 'https://pokeapi.co/api/v2/pokemon-species?offset=20&limit=1025';
    const res = await fetch(url);
    if (!res.ok) {
        throw {
            message: 'Failed to get all Pokemons',
            statusText: res.statusText,
            status: res.status
        }
    }

    const data = await res.json()
    let results = data.results;
    let promisesArr = results.map(async result => {
        const response = await fetch(result.url);
        return await response.json();
    })

    const newData = await Promise.all(promisesArr)
    let mythical_species = newData.filter((pokemon) => pokemon.is_mythical)
    let newPromisesArr = mythical_species.map(async (entry) => {
        const varieties = entry.varieties;
        const response = await fetch(varieties[0].pokemon.url)
        for (let variety in varieties){
            if (variety.is_default === true) {
                response = await fetch(variety.pokemon.url)
            }
        }
        return await response.json()
    })

    const newData2 = await Promise.all(newPromisesArr)

    return newData2
}

export async function getPokemon(name){
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const res = await fetch(url);
    if (!res.ok) {
        throw {
            message: 'Failed to get all Pokemons',
            statusText: res.statusText,
            status: res.status
        }
    }

    const data = await res.json()
    const abilities = data.abilities
    let promisesArr = abilities.map(async (result) => {
        const response = await fetch(result.ability.url);
        return await response.json();
    })
    const abilitiesData = await Promise.all(promisesArr)
    return {data, abilitiesData}
}


export async function getPokemonSpecies(name){
    const url = `https://pokeapi.co/api/v2/pokemon-species/${name}`;
    const res = await fetch(url);
    if (!res.ok) {
        throw {
            message: 'Failed to get all Pokemons',
            statusText: res.statusText,
            status: res.status
        }
    }

    const data = await res.json()
    return data
}

