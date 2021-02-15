import React from 'react'

export default function GoogleMap(props) {
    const { address } = props
    return (
        <iframe
            src={`https://maps.google.com/maps?q=${address}&t=&z=12&ie=UTF8&iwloc=&output=embed`}
            width="600"
            height="450"
            title="Google Map"
            frameBorder="0"
            style={{ 'border': 0 }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0">
        </iframe>
    )
}


