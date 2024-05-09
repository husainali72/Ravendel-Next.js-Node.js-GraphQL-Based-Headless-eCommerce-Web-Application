import { useRouter } from "next/router";
import { useState } from "react"; // Assuming you're using React Router

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Redirect to search page with the search query in the URL
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <div className="global-search-container">
        <input
          type="text"
          placeholder="Search..."
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
