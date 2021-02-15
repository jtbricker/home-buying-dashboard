import React, { useEffect, useState } from "react";
import ListingService from "../services/ListingService";
import ListingPreview from "./ListingPreview";
import { FiEye } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import { useHistory } from "react-router-dom";

export default function Listings() {
    const [listings, setListings] = useState([]);
    const [currentListing, setCurrentListing] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [filteredListings, setFilteredListings] = useState([])
    const [showArchived, setShowArchived] = useState(false)
    const [onlyFavorited, setOnlyFavorited] = useState(false)

    const onDataChange = (items) => {
        const newListings = [];

        items.forEach((item) => {
            const data = item.val();
            newListings.push({ ...data });
        });

        setListings(newListings);
    };

    useEffect(() => {
        ListingService.getAll().on("value", onDataChange);

        // return () => {
        //     ListingService.getAll().off("value", onDataChange);
        // };
    }, []);

    useEffect(() => {
        let tempFilteredListings = listings;

        if(!showArchived){
            tempFilteredListings = tempFilteredListings.filter(listing => !!!listing.archived)
        }

        if(onlyFavorited){
            tempFilteredListings = tempFilteredListings.filter(listing => !!listing.favorited)
        }

        setFilteredListings(tempFilteredListings)
        
        var newCurrentIndex = tempFilteredListings.findIndex(listing => listing.mls_number === currentListing?.mls_number)
        if(newCurrentIndex >= 0){
            setCurrentIndex(newCurrentIndex)
            setCurrentListing(tempFilteredListings[newCurrentIndex])    
        }
        else{
            setCurrentIndex(-1)
            setCurrentListing(null)
        }
        
    }, [listings, showArchived, onlyFavorited, currentListing])

    function markListingAsViewed(key) {
        ListingService.update(key, { 'viewed': true });
    }

    function markAllUnviewed() {
        listings.forEach(listing => {
            ListingService.update(listing.mls_number, { 'viewed': false })
        })
    }

    function markAllUnarchived() {
        listings.forEach(listing => {
            ListingService.update(listing.mls_number, { 'archived': false })
        })
    }

    function markAllUnfavorited() {
        listings.forEach(listing => {
            ListingService.update(listing.mls_number, { 'favorited': false })
        })
    }

    const setActiveListing = (listing, index) => {
        setCurrentListing(listing);

        markListingAsViewed(listing.mls_number);

        setCurrentIndex(index);
    };

    const history = useHistory();

    function handleShowAllClick(){
        setShowArchived(!showArchived)
    }

    function handleOnlyFavoritedClick(){
        setOnlyFavorited(!onlyFavorited)
    }

    return (
        <div className="list row">
            <div className="col-md-6">
                <h4>Listings</h4>
                <br />
                <div>Filter: 
                    <input name="showArchived" type="checkbox" checked={showArchived} onChange={handleShowAllClick}/><label htmlFor="showArchived">Show Archived</label>
                    <input name="showFavorited" type="checkbox" checked={onlyFavorited} onChange={handleOnlyFavoritedClick}/><label htmlFor="showFavorited">Only Favorited</label>
                </div>
                <ul className="list-group">
                    {filteredListings.map((listing, index) => (
                        <li
                            className={
                                "list-group-item " + (index === currentIndex ? "active " : "") + (listing.viewed ? "" : "unviewed-listing ")
                            }
                            onClick={() => setActiveListing(listing, index)}
                            onDoubleClick={() => history.push('/listing/' + listing.mls_number)}
                            key={index}
                        >
                            {listing.favorited && <AiFillHeart style={{ 'marginRight': "10px" }} color="red" />}<span style={{ 'textDecorationLine': (listing.archived ? "line-through" : "none") }}>{listing.address}</span>{listing.viewed && <FiEye style={{ 'float': "right" }} />}
                        </li>
                    ))}
                </ul>
                <button onClick={markAllUnviewed}>Mark all as unviewed</button>
                <button onClick={markAllUnfavorited}>Mark all as unfavorited</button>
                <button onClick={markAllUnarchived}>Mark all as unarchived</button>
            </div>
            <div className="col-md-6">
                {currentListing ? (
                    <ListingPreview listing={currentListing} />
                ) : (
                        <div>
                            <br />
                            <p>Please click on a Listing...</p>
                        </div>
                    )}
            </div>
        </div>
    );
}
