import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Redirect to search page with the search query in the URL
      const trimmedQuery = searchQuery?.trim();
      if(trimmedQuery){
      router.push(`/search?query=${encodeURIComponent(trimmedQuery)}`);
    }
    }
  };
  useEffect(() => {
    // Check if the current path is not the search page or if there is no query parameter
    if (router.pathname !== '/search' || !router.query.query) {
      setSearchQuery("");
    }
  }, [router.pathname, router.query]);
  return (
    <>
      <div className="global-search-container">
        <IoSearchOutline />
        <input
          type="text"
          placeholder="Search for products"
          className="global-search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
    </>
  );
};

export default Search;
