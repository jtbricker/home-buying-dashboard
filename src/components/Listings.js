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

        return () => {
            ListingService.getAll().off("value", onDataChange);
        };
    }, []);

    function markListingAsViewed(key) {
        ListingService.update(key, { 'viewed': true });
    }

    function markAllUnviewed() {
        listings.forEach(listing => {
            ListingService.update(listing.mls_number, { 'viewed': false })
        })
    }

    const setActiveListing = (listing, index) => {
        setCurrentListing(listing);

        markListingAsViewed(listing.mls_number);

        setCurrentIndex(index);
    };

    const history = useHistory();

    return (
        <div className="list row">
            <div className="col-md-6">
                <h4>Listings</h4>

                <ul className="list-group">
                    {listings.map((listing, index) => (
                        <li
                            className={
                                "list-group-item " + (index === currentIndex ? "active " : "") + (listing.viewed ? "" : "unviewed-listing ")
                            }
                            onClick={() => setActiveListing(listing, index)}
                            onDoubleClick={() => history.push('/listing/' + listing.mls_number)}
                            key={index}
                        >
                            {listing.favorited && <AiFillHeart style={{ 'margin-right': "10px" }} color="red" />}<span style={{'textDecorationLine': (listing.archived ? "line-through" : "none")}}>{listing.address}</span>{listing.viewed && <FiEye style={{ 'float': "right" }} />}
                        </li>
                    ))}
                </ul>
                <button onClick={markAllUnviewed}>Mark all as unviewed</button>
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
