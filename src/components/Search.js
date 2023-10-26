import React from "react"
import { useState } from "react"

export default function Search(props) {

    const [searchValue, setSearchValue] = useState('')

    const [error, setError] = useState(null)
    
    const [success, setSuccess] = useState(null)


    const handleSubmit = (event) => {
        event.preventDefault()

        // Format Search Value
        const searchValueModified = searchValue.toLocaleLowerCase().replace(" ", "-").replace("gigamax", "gmax")

        // console.log('Search Value in input:', searchValueModified)


        fetch(`https://pokeapi.co/api/v2/pokemon/${searchValueModified}`)
        .then( (response) => {
            // Error
            if (!response.ok || searchValue === '') {
                throw new Error('Pokemon not found!')
            }
            return response.json()
        })
        .then( (data) => {
            setSuccess('Pokemon found!') // Set Success
            setSearchValue('') // Reset Search Value in input

            // Find and Update Property of Pokemon in Pokedex
            const updatedResults = props.pokedex.results.map(item => {
                if (item.name === data.name) {
                return {
                    ...item, // Copy Data Pokemon
                    isCatch: true, // Set Catched
                    imgSrc: data.sprites.front_default, // Add url to imgSrc from API
                }
                }
                return item
            })
            
            // Create a new copy of Pokemon with update
            const updatedPokedex = { ...props.pokedex }
            updatedPokedex.results = updatedResults

            props.onPropChange(updatedPokedex)

            // Reset SetSuccess to hidden colorbar
            setTimeout(() => {
                setSuccess(null)
            }, 1000)
        } )
        .catch((error) => {
            setError(error.message) // Set Error
            setSearchValue('Pokemon not found!')

            // Reset SetError and SearchValue to hidden colorbar
            setTimeout(() => {
                setError(null)
                setSearchValue('')
            }, 1000)
            })
    }

    // Set Error
    const handleInputChange = (e) => {        
      setSearchValue(e.target.value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-group w-50 mx-auto">
                <input type="text" className={`form-control ${error ? 'bg-danger bg-opacity-25' : 'bg-white'}`} value={searchValue} onChange={handleInputChange} placeholder="Enter Pokemon Name..." aria-describedby="btnGroupSearch" />
                <button type="submit" className={`input-group-text btn ${error ? 'btn-danger' : 'btn-primary'} ${success ? 'btn-success' : 'btn-primary'}`} id="btnGroupSearch"><i className="bi bi-search"></i></button>
            </div>
        </form>
    )
}