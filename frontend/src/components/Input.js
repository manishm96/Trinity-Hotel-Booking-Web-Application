import React from 'react'
import '../App.css'

const Input = ({ icon_d1, icon_d2, label, type }) => {
    return (
        <div className="input-wrapper">
            <input className="input-style" type={type}
                placeholder={label}>

            </input>
        </div>
    )
}

export default Input