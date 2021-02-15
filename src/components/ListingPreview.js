import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart,  } from "react-icons/ai";
import { FiArchive } from "react-icons/fi";


import ListingService from '../services/ListingService';

export default function ListingPreview(props) {
    const { listing } = props;

    const [favorited, setFavorited] = useState(!!listing.favorited)
    const [archived, setArchived] = useState(!!listing.archived)

    useEffect(() => {
        setFavorited(!!listing.favorited)
        setArchived(!!listing.archived)
    }, [listing])

    // Set this to true to see all available listing data
    const debug = true;

    function markAsUnviewed(key) {
        ListingService.update(key, { 'viewed': false })
    }

    function toggleFavorited(key) {
        const toggledFavorited = !favorited
        // console.log("Before",key, favorited)
        setFavorited(toggledFavorited)
        // console.log("After",key, favorited)
        ListingService.update(key, { 'favorited': toggledFavorited })
    }

    function toggleArchived(key){
        const toggleArchived = !archived
        setArchived(toggleArchived)
        ListingService.update(key, { 'archived': toggleArchived})
    }

    function FavoriteHeart(props) {
        const { checked, onClick } = props;
        
        return (
            <>
                { checked ? (
                    <AiFillHeart onClick={onClick} color='red'/>
                ) : (
                        <AiOutlineHeart onClick={onClick} />
                    )}
            </>
        )
    }


    return (
        <div>
            <div><h4>{listing.address} <FavoriteHeart checked={favorited} onClick={() => toggleFavorited(listing.mls_number)} /></h4></div>
            <div>
                <Link to={"/listing/" + listing.mls_number}>Go to Listing Page </Link>
                <button onClick={() => toggleArchived(listing.mls_number)} style={{'float': 'right'}}><FiArchive /> {archived ? "Unarchive" : "Archive"}</button>
            </div>
            <br/>
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
