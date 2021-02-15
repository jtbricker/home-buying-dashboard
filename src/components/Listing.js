import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ListingService from '../services/ListingService'
import GoogleMap from './GoogleMap'

export default function Listing() {
    const { listingId } = useParams()
    const [listing, setListing] = useState({})

    useEffect(() => {
        ListingService.getSingle(listingId).once('value', (snapshot) => {
            if (snapshot.exists()) {
                setListing(snapshot.val())
            }
            else {
                setListing({ 'this_object': "doesn't exist" })
            }
        })
    }, [listingId])

    console.log(listing)

    return (
        <>
            <h3> This is the listing page for MLS#{listingId} </h3>
            <div style={{ "height": "90vh" }}>
                <iframe title={listing.listing_url} src={listing.listing_url} height="100%" width='100%'></iframe>
            </div>
            <div>
                <GoogleMap address={listing.address}></GoogleMap>
            </div>
        </>
    )
}
