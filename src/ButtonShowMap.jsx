import React from 'react'

export const ButtonShowMap = ({ children,setShowMap,showMap,handleShowMap  }) => {
   
    return (
        <button onClick={handleShowMap}>{children}</button>
    )
}
