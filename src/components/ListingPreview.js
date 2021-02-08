import React from 'react'

export default function ListingPreview(props) {
    const { listing } = props;
    
    // Set this to true to see all available listing data
    const debug = true;
    
    return (
        <div>
            <h4>{listing.address}</h4>
            <div>MLS #:<a href={listing.listing_url} target='_blank' rel="noreferrer">{listing.mls_number}</a></div>
            <img src={listing.thumbnail} alt={listing.address} height="200px"/>
            
            
            {debug && <pre>{JSON.stringify(listing, null, 2)}</pre>}
        </div>
    )
}
