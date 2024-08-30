import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };
  return (
    <form className="relative w-full flex-center">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search prompts..."
        className="search_input peer"
      />
    </form>
  );
};
export default SearchBar;
