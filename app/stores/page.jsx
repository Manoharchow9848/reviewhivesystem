"use client";

import { Star } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "../../context/userDetailContext";

const StorePage = () => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [ratings, setRatings] = useState({});
  const [filters, setFilters] = useState({ name: "", address: "" });
  const [showSubmit, setShowSubmit] = useState({});
  const {userDetail,setUserDetail} = useContext(UserDetailContext);
   // Replace this with actual user email from authentication

  useEffect(() => {
    fetchStores();
    if(localStorage.getItem("user")) setUserDetail(JSON.parse(localStorage.getItem("user")));
  }, []);

  const fetchStores = async () => {
    try {
      const response = await fetch("/api/getStores");
      if (!response.ok) throw new Error("Failed to fetch stores");

      const data = await response.json();
      console.log(data.stores);
      
      setStores(data.stores);
      setFilteredStores(data.stores);

      // Initialize ratings
      const initialRatings = {};
      const initialSubmitVisibility = {};
      data.stores.forEach((store) => {
        // Find the user's rating if it exists
        const userRatingEntry = store.ratings?.find((r) => r.userEmail === userEmail);
        initialRatings[store.id] = userRatingEntry ? userRatingEntry.rating : 0;
        initialSubmitVisibility[store.id] = false;
      });

      setRatings(initialRatings);
      setShowSubmit(initialSubmitVisibility);
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));

    const filtered = stores.filter((store) =>
      store[name]?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredStores(filtered);
  };

  const handleRatingClick = (storeId, rating) => {
    setRatings((prev) => ({ ...prev, [storeId]: rating }));
    setShowSubmit((prev) => ({ ...prev, [storeId]: true }));
  };

  const handleSubmitRating = async (storeId, rating) => {
      const email = userDetail.email;
    
      try {
        const response = await fetch("/api/addRating", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ storeId, rating, email }),
        });
    
        if (response.ok) {
          console.log("Rating submitted successfully");
          fetchStores();
          setShowSubmit((prev) => ({ ...prev, [storeId]: false }));
        } else {
          console.error("Error submitting rating");
        }
      } catch (error) {
        console.error("Error submitting rating:", error);
      }
      
  };

  return (
    <div className="h-screen w-full mt-14 bg-black text-white p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Store Listings</h2>

      {/* Filter Inputs */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
          placeholder="Search by Store Name"
          className="p-2 rounded bg-gray-800 text-white w-1/3"
        />
        <input
          type="text"
          name="address"
          value={filters.address}
          onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
          placeholder="Search by Address"
          className="p-2 rounded bg-gray-800 text-white w-1/3"
        />
      </div>

      {/* Store Listings in Grid Format */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStores.length > 0 ? (
          filteredStores.map((store) => (
            <div key={store.id} className="p-4 bg-gray-900 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">{store.name}</h3>
              <p className="text-gray-400">{store.address}</p>
              <p>Overall Rating: ⭐ {store.overallRating || "N/A"}</p>
              <p>Your Rating: ⭐ {ratings[store.id] || "Not Rated"}</p>
              <p>{store.description}</p>
 
              {/* Rating Submission */}
              <div className="flex items-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    className={`p-2 rounded ${
                      ratings[store.id] >= num ? "bg-yellow-500" : "bg-gray-700"
                    }`}
                    onClick={() => handleRatingClick(store.id, num)}
                  >
                    <Star className="w-5 h-5" />
                  </button>
                  
                ))}
              </div>
                

              {/* Submit Rating Button */}
              {showSubmit[store.id] && (
                <button
                  className="cursor-pointer mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded"
                  onClick={() => handleSubmitRating(store.storeId, ratings[store.id])}
                >
                  Submit Rating
                </button>
              )}
              {store?.rating.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-lg font-bold mb-2">Ratings:</h4>
                  <ul>
                    {store.rating.map((rating, index) => (
                      <li key={index}>
                        {rating.email}: {rating.rating} stars
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">No stores found.</p>
        )}
      </div>
    </div>
  );
};

export default StorePage;
