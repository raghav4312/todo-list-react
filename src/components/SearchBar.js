import React from 'react'

export const SearchBar = ({searchFunction}) => {
  return (
    <div>
      <input type='text' onChange={searchFunction} placeholder="Type to search..."></input>
    </div>
  )
}
