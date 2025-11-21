import React from 'react'

function Button({ onClick }: { onClick: () => void;  }) {
    return (
        <>
            <button  onClick={onClick} className=" px-8 py-4 bg-green-500 hover:bg-green-700 text-white font-bold  rounded">
                Play 
            </button>
        </>
    )
}

export default Button 