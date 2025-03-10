import { useState } from "react";
import "./searchbar.css";

const SearchBar = ({ setSearchWord }) => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const keyword = e.target.value;
    setSearch(keyword);
    setSearchWord(keyword);
  };

  return (
    <div className="search-container">
      <input type="text" placeholder="Search..." value={search} onChange={handleChange} />
    </div>
  );
};

export default SearchBar;
