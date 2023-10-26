import React from "react"

export default function Card(props) {
    return (
        <>
            {
                props.pokedex.results.slice(props.min, props.max).map((pokemon, index) => {

                    return (
                        <div key={index + 1} className="col-2 col-md-1 p-0 position-relative d-flex justify-content-center align-items-center">
                        <div className={`card border-0 w-100 bg-pokeball bg-transparent d-flex justify-content-center ${pokemon.isCatch ? '' : 'is-block'}`}>
                            {pokemon.isCatch ? (<img className="mx-auto" src={pokemon.imgSrc} alt="" />) : ''}
                        </div>
                        {!pokemon.isCatch ? (<img className="position-absolute lock" src="../lock.png" alt="" />) : ''}
                        </div>
                    )
                })
            }
        </>
    )
}