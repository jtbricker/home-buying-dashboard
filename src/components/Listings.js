import React, { useEffect, useState } from "react";
import ListingService from "../services/ListingService";
import ListingPreview from "./ListingPreview";

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


    const setActiveListing = (listing, index) => {
        setCurrentListing(listing);

        setCurrentIndex(index);
    };

    return (
        <div className="list row">
            <div className="col-md-6">
                <h4>Listings</h4>

                <ul className="list-group">
                    {listings.map((listing, index) => (
                        <li
                            className={
                                "list-group-item " + (index === currentIndex ? "active" : "")
                            }
                            onClick={() => setActiveListing(listing, index)}
                            key={index}
                        >
                            {listing.address}
                        </li>
                    ))}
                </ul>
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
