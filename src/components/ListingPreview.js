import React from 'react'
import { Link } from 'react-router-dom';

import ListingService from '../services/ListingService';

export default function ListingPreview(props) {
    const { listing } = props;

    // Set this to true to see all available listing data
    const debug = true;

    function markAsUnviewed(key) {
        ListingService.update(key, { 'viewed': false })
    }

    return (
        <div>
            <h4>{listing.address}</h4>
            <Link to={"/listing/" + listing.mls_number}>Go to Listing Page </Link>
            <img src={listing.thumbnail} alt={listing.address} width="100%" />
            <div>
                <span>MLS #:<a href={listing.listing_url} target='_blank' rel="noreferrer">{listing.mls_number}</a></span>
                <button
                    onClick={() => markAsUnviewed(listing.mls_number)}
                    style={{ 'float': 'right' }}
                >
                    Mark as unviewed
                </button>
            </div>


            {debug && <pre>{JSON.stringify(listing, null, 2)}</pre>}
        </div>
    )
}
