import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const allowedCategories = [
  "Manga",
  "Poetry",
  "Story",
  "Fiction",
  "Non-Fiction",
  "Fantasy",
  "Science",
  "History",
];

const AddBook = () => {
  const [Data, setData] = useState({
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
    category: "",
    image: null,
  });

  const [categories, setCategories] = useState([]); // ✅ Add this state

  useEffect(() => {
    setCategories(allowedCategories); // ✅ Now, setCategories is properly defined
  }, []);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setData({ ...Data, image: file });
    } else {
      toast.error("Please select a valid image file.");
    }
  };

  const submit = async () => {
    if (
      !Data.image ||
      !Data.title ||
      !Data.author ||
      !Data.price ||
      !Data.desc ||
      !Data.language ||
      !Data.category
    ) {
      return toast.error("All fields are required");
    }

    if (!categories.includes(Data.category)) {
      return toast.error("Invalid category selected.");
    }

    const formData = new FormData();
    formData.append("image", Data.image);
    formData.append("title", Data.title);
    formData.append("author", Data.author);
    formData.append("price", Data.price);
    formData.append("desc", Data.desc);
    formData.append("language", Data.language);
    formData.append("category", Data.category);

    try {
      const res = await axios.post(
        "http://localhost:1000/api/v1/add-book",
        formData,
        { headers }
      );
      setData({
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
        category: "",
        image: null,
      });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="h-auto p-4">
      <h1 className="text-3xl font-semibold text-zinc-500 mb-6">Add Book</h1>

      <div className="p-4 bg-zinc-800 rounded-xl shadow-md">
        {/* Image Upload */}
        <div>
          <label className="text-zinc-400">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded-lg outline-none"
            onChange={handleFileChange}
          />
        </div>

        {/* Book Title */}
        <div className="mt-4">
          <label className="text-zinc-400">Book Title</label>
          <input
            type="text"
            className="w-full mt-2 text-zinc-100 p-2 rounded-lg outline-none bg-zinc-900"
            name="title"
            value={Data.title}
            onChange={change}
          />
        </div>

        {/* Author Name */}
        <div className="mt-4">
          <label className="text-zinc-400">Author</label>
          <input
            type="text"
            className="w-full mt-2 text-zinc-100 p-2 rounded-lg outline-none bg-zinc-900"
            name="author"
            value={Data.author}
            onChange={change}
          />
        </div>

        {/* Language & Price */}
        <div className="mt-4 flex gap-3">
          <div className="w-3/6">
            <label className="text-zinc-400">Language</label>
            <input
              type="text"
              className="w-full mt-2 text-zinc-100 p-2 rounded-lg outline-none bg-zinc-900"
              name="language"
              value={Data.language}
              onChange={change}
            />
          </div>

          <div className="w-3/6">
            <label className="text-zinc-400">Price (₹)</label>
            <input
              type="number"
              className="w-full mt-2 text-zinc-100 p-2 rounded-lg outline-none bg-zinc-900"
              name="price"
              value={Data.price}
              onChange={change}
            />
          </div>
        </div>

        {/* Category Selection */}
        <div className="mt-4">
          <label className="text-zinc-400">Category</label>
          <select
            className="w-full mt-2 text-zinc-100 p-2 rounded-lg bg-zinc-900"
            name="category"
            value={Data.category}
            onChange={change}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Book Description */}
        <div className="mt-4">
          <label className="text-zinc-400">Description</label>
          <textarea
            name="desc"
            rows="5"
            className="w-full mt-2 text-zinc-100 p-2 rounded-lg outline-none bg-zinc-900"
            value={Data.desc}
            onChange={change}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          className="mt-4 px-4 bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-all duration-200"
          onClick={submit}
        >
          Add Book
        </button>
      </div>
    </div>
  );
};

export default AddBook;
