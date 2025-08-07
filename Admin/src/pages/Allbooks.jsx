import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import BookCart from "../components/BookCard/BookCart";
import Loder from "../Layouts/Loder/Loder";
const BACKEND_API = import.meta.env.VITE_BACKEND_API;

const Allbooks = () => {
  const [Data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortOrder, setSortOrder] = useState("low"); // Default sorting
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_API}/api/v1/get-all-books`
        );
        const books = response.data.data || [];
        setData(books);
        setFilteredData(books);

        // Extract unique categories dynamically and safely
        const uniqueCategories = [
          ...new Set(
            books.map((book) => book.category?.trim()).filter(Boolean)
          ),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const filterAndSortBooks = (selectedCats, order, query) => {
    let updatedBooks = [...Data];

    // Category Filter (supports multiple selections)
    if (selectedCats.size > 0) {
      updatedBooks = updatedBooks.filter((book) =>
        selectedCats.has(book.category?.trim())
      );
    }

    // Search Filter
    if (query) {
      updatedBooks = updatedBooks.filter(
        (book) =>
          book?.title?.toLowerCase().includes(query.toLowerCase()) ||
          book?.author?.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Sorting Logic
    switch (order) {
      case "low":
        updatedBooks.sort((a, b) => a.price - b.price);
        break;
      case "high":
        updatedBooks.sort((a, b) => b.price - a.price);
        break;
      case "az":
        updatedBooks.sort((a, b) =>
          (a.title?.toLowerCase() || "").localeCompare(
            b.title?.toLowerCase() || ""
          )
        );
        break;
      case "za":
        updatedBooks.sort((a, b) =>
          (b.title?.toLowerCase() || "").localeCompare(
            a.title?.toLowerCase() || ""
          )
        );
        break;
      default:
        break;
    }

    setFilteredData(updatedBooks);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    filterAndSortBooks(selectedCategories, sortOrder, e.target.value);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    filterAndSortBooks(selectedCategories, order, searchQuery);
  };

  const handleCategoryChange = (category) => {
    const newSelectedCategories = new Set(selectedCategories);
    if (newSelectedCategories.has(category)) {
      newSelectedCategories.delete(category);
    } else {
      newSelectedCategories.add(category);
    }
    setSelectedCategories(newSelectedCategories);
    filterAndSortBooks(newSelectedCategories, sortOrder, searchQuery);
  };

  return (
    <div className="bg-zinc-900 px-4 md:px-12 py-8 h-auto flex flex-col md:flex-row">
      {/* Sidebar Filters */}
      <div className="w-full md:w-1/4 bg-zinc-800 p-4 rounded-xl shadow-lg mb-6 md:mb-0">
        <h4 className="text-white text-lg font-semibold mb-4">Filters</h4>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full px-3 py-2 mb-4 bg-zinc-900 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2  focus:border-blue-500"
        />

        {/* Category Filter */}
        <h5 className="text-white font-medium mb-2">CATEGORIES</h5>
        <div className="flex flex-col gap-2">
          {categories.map((category, index) => (
            <label key={index} className="flex items-center text-white">
              <input
                type="checkbox"
                checked={selectedCategories.has(category)}
                onChange={() => handleCategoryChange(category)}
                className="mr-2"
              />
              {category}
            </label>
          ))}
        </div>

        {/* Sorting Dropdown */}
        <h5 className="text-white font-medium mt-4 mb-2">Sort By</h5>
        <select
          className="w-full px-3 py-2 bg-zinc-900 text-white rounded-lg border border-gray-700 
                     focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:border-zinc-950"
          onChange={(e) => handleSortChange(e.target.value)}
          value={sortOrder}
        >
          <option value="low"> Price: Low to High</option>
          <option value="high"> Price: High to Low</option>
          <option value="az">A to Z</option>
          <option value="za">Z to A</option>
        </select>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4 md:pl-6">
        <h4 className="text-white text-xl lg:text-2xl font-semibold">
          All Books
        </h4>

        {/* Show Loader when data is not available */}
        {!Data.length && (
          <div className="flex items-center justify-center w-full h-[100%]">
            <Loder />
          </div>
        )}

        {/* Display Books */}
        <div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6  px-8 md:px-0">
          {filteredData.map((item, i) => (
            <div key={i}>
              <BookCart data={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Allbooks;
