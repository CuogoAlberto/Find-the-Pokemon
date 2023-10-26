import React from "react"
import Search from "./components/Search"
import TimerButton from "./components/Timer"
import Card from "./components/Card"
import { useState, useEffect } from "react"


export default function App() {

  const [originalPokedex, setOriginalPokedex] = useState(null)
  
  const [pokedex, setPokemon] = useState(null)

  const [catchCount, setCatchCount] = useState(0)

  const [resetTimer, setResetTimer] = useState(false)

  const [alternative, setAlternative] = useState(true)

  const [pokeballAnimation, setPokeballAnimation] = useState("pokeball-roll")


  useEffect( () => {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=1300')
    .then( (response) => response.json() )
    .then( (data) => {

      // Add property: 'isCatch: false' and 'imgSrc: null' on array '.results'
      const updatedResults = data.results.map((pokemon) => ({
        ...pokemon, // copy all data
        isCatch: false, // add and set property
        imgSrc: null, // add and set property
      }))

      // Update 'data.results'
      data.results = updatedResults
      
      setOriginalPokedex(data)
      setPokemon(data)
    } )
  }, [])

  // Set new Prop on Pokemon (es: 'isCatch: false' => 'isCatch: true', 'imgSrc: null' => 'imgSrc: url')
  const handlePropChange = (newProp) => {
    setPokemon(newProp)

    // Count Pokemon catched
    setCatchCount(newProp.results.filter(pokemon => pokemon.isCatch === true).length)
  }

  // RESET ALL
  const resetAll = () => {
    // Restore Pokedex
    handlePropChange(originalPokedex)

    // Reset Timer
    setResetTimer(true)

    setAlternative(true)

  }

  // Pokeball Animation
  const handlePokeballAnimation = (animationClass) => {
    setPokeballAnimation(animationClass)
    setTimeout(() => {
      setPokeballAnimation(null)
    }, 1000)
  }

  // View/Hidden Alternative Pokemon
  const toggleAlternative = () => {
    if (alternative) {
      // Hidden Alternative Pokemon
      const limitedResults = pokedex.results.slice(0, 1017)
      const updatedPokedex = { ...pokedex, results: limitedResults }
      handlePropChange(updatedPokedex)

      // Pokeball Animation Unroll
      handlePokeballAnimation("pokeball-unroll")
    } else {
      // Restore Pokedex
      handlePropChange(originalPokedex)

      // Pokeball Animation Roll
      handlePokeballAnimation("pokeball-roll")
    }

    setResetTimer(true)

    setAlternative(!alternative)
  }

  return (
    <>
      {
        pokedex ? (
          <>
            <img src="../pokemon-logo-and-catchphrase.png" width="300" className="d-block mx-auto mt-3" alt="" />

            {/* COUNT - RESET */}
            <div className="d-flex justify-content-center align-items-center my-3">
              <h2 className="text-center fw-bold m-0">{catchCount}/{pokedex.results.length}</h2>
              <button onClick={resetAll} className="btn btn-dark ms-3"><i className="bi bi-trash3"></i></button>
            </div>
            
            {catchCount === pokedex.results.length ? (
              <div className="bg-warning border border-5 border-primary rounded-3 w-50 mx-auto  p-4">
                <div className="d-flex justify-content-center align-items-center">
                  <img className="me-3 d-none d-md-block" src="../../pokemon-logo.png" alt="" height="40" />
                  <img className="me-4" src="../../pokemon-trophy.png" alt="" height="80" />
                  <h1 className="text-center text-white fs-2 fw-bold mb-0">POKEDEX COMPLETED!</h1>
                  <img className="ms-4" src="../../pokemon-trophy.png" alt="" height="80" />
                  <img className="ms-3 d-none d-md-block" src="../../pokemon-logo.png" alt="" height="40" />
                </div>
              </div>
            ) : (
              <Search pokedex={pokedex} onPropChange={handlePropChange}/>
            )}

            
            <TimerButton catchCount={catchCount} pokedex={pokedex} resetTimer={resetTimer} setResetTimer={setResetTimer} />
            
            {/* GENERATION */}
            <div className="d-flex justify-content-center mt-2">
              <a href="#prima-generazione" className="btn btn-generation px-1 fs-5"><i className="bi bi-1-square-fill"></i></a>
              <a href="#seconda-generazione" className="btn btn-generation px-1 fs-5"><i className="bi bi-2-square-fill"></i></a>
              <a href="#terza-generazione" className="btn btn-generation px-1 fs-5"><i className="bi bi-3-square-fill"></i></a>
              <a href="#quarta-generazione" className="btn btn-generation px-1 fs-5"><i className="bi bi-4-square-fill"></i></a>
              <a href="#quinta-generazione" className="btn btn-generation px-1 fs-5"><i className="bi bi-5-square-fill"></i></a>
              <a href="#sesta-generazione" className="btn btn-generation px-1 fs-5"><i className="bi bi-6-square-fill"></i></a>
              <a href="#settima-generazione" className="btn btn-generation px-1 fs-5"><i className="bi bi-7-square-fill"></i></a>
              <a href="#ottava-generazione" className="btn btn-generation px-1 fs-5"><i className="bi bi-8-square-fill"></i></a>
              <a href="#nona-generazione" className="btn btn-generation px-1 fs-5"><i className="bi bi-9-square-fill"></i></a>
              <a href="#alternative" className={`btn btn-generation px-1 fs-5 ms-2 ${alternative ? '' : 'text-white no-click'}`}><i className="bi bi-stars"></i></a>
              <div className="d-flex align-items-center">
                <label className={`slider ${alternative ? 'checked border-primary' : 'filter-gray'}`}  onClick={toggleAlternative}>
                  <img className={`slider-circle ${pokeballAnimation || ''}`} src="../../pokemon-logo.png" alt="" />
                </label>
              </div>
            </div>

            {/* POKEMON */}
            <div className="container p-0">
              <div id="prima-generazione" className="row gx-0 gx-md-4 mt-3">
                <Card pokedex={pokedex} min='0' max='151' />
              </div>
              <div id="seconda-generazione" className="row gx-0 gx-md-4 mt-4">
                <Card pokedex={pokedex} min='151' max='251' />
              </div>
              <div id="terza-generazione" className="row gx-0 gx-md-4 mt-4">
                <Card pokedex={pokedex} min='251' max='386' />
              </div>
              <div id="quarta-generazione" className="row gx-0 gx-md-4 mt-4">
                <Card pokedex={pokedex} min='386' max='493' />
              </div>
              <div id="quinta-generazione" className="row gx-0 gx-md-4 mt-4">
                <Card pokedex={pokedex} min='493' max='649' />
              </div>
              <div id="sesta-generazione" className="row gx-0 gx-md-4 mt-4">
                <Card pokedex={pokedex} min='649' max='721' />
              </div>
              <div id="settima-generazione" className="row gx-0 gx-md-4 mt-4">
                <Card pokedex={pokedex} min='721' max='809' />
              </div>
              <div id="ottava-generazione" className="row gx-0 gx-md-4 mt-4">
                <Card pokedex={pokedex} min='809' max='905' />
              </div>
              <div id="nona-generazione" className="row gx-0 gx-md-4 my-4">
                <Card pokedex={pokedex} min='905' max='1017' />
              </div>
              {alternative ? (
                <div id="alternative" className="row gx-0 gx-md-4">
                  <h3 className="text-center fw-bold">Alternative</h3>
                  <Card pokedex={pokedex} min='1017' max='1292' />
                </div>
              ) : ''}
            </div>
          </>
        ) : (
          // LOADING
          <div className="loading d-flex justify-content-center align-items-center min-vh-100">
            <img src="../pokemon-logo.png" alt="" />
          </div>
        )
      }
    </>
  )
}
