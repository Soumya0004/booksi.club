import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router";
const UpdateBook = () => {
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const submit = async () => {
    try {
      if (
        Data.url === "" ||
        Data.title === "" ||
        Data.author === "" ||
        Data.price === "" ||
        Data.desc === "" ||
        Data.language === ""
      ) {
        toast("All fields are required");
      } else {
        const res = await axios.put(
          "http://localhost:1000/api/v1/update-book",
          Data,
          { headers }
        );
        setData({
          url: "",
          title: "",
          author: "",
          price: "",
          desc: "",
          language: "",
        });
        toast.success(res.data.message);
        navigate(`/view-book-details/${id}`);
      }
    } catch (error) {
      toast.error(error.res.data.message);
    }
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:1000/api/v1/get-book-by-id/${id}`
      );

      setData(response.data.data);
    };
    fetch();
  }, []);
  return (
    <div className="h-[100%] p-0 md:p-4 bg-zinc-900">
      <h1 className="text-3xl md:text-4xl font-semibold text-zinc-500 mb-8">
        update book
      </h1>

      <div className="p-4 bg-zinc-800 rounded">
        <div>
          <label htmlFor="" className="text-zinc-400">
            Image
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none "
            placeholder="url of image"
            name="url"
            required
            value={Data.url}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Title of book
          </label>
          <input
            type="text"
            className="w-full mt-2 text-zinc-100 p-2 outline-none bg-zinc-900"
            placeholder="title of  book"
            name="title"
            required
            value={Data.title}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Author of book
          </label>
          <input
            type="text"
            className="w-full mt-2 text-zinc-100 p-2 outline-none bg-zinc-900"
            placeholder="author of  book"
            name="author"
            required
            value={Data.author}
            onChange={change}
          />
        </div>

        <div className="mt-4 flex gap-3">
          <div className="w-3/6">
            <label htmlFor="" className="text-zinc-400">
              Language
            </label>
            <input
              type="text"
              className="w-full mt-2 text-zinc-100 p-2 outline-none bg-zinc-900"
              placeholder="Language of  book"
              name="language"
              required
              value={Data.language}
              onChange={change}
            />
          </div>

          <div className="w-3/6">
            <label htmlFor="" className="text-zinc-400">
              Price
            </label>
            <input
              type="text"
              className="w-full mt-2 text-zinc-100 p-2 outline-none bg-zinc-900"
              placeholder="Price of  book"
              name="price"
              required
              value={Data.price}
              onChange={change}
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Description of book
          </label>
          <textarea
            name="desc"
            rows="5"
            className="w-full mt-2 text-zinc-100 p-2 outline-none bg-zinc-900"
            placeholder="description of  book"
            required
            value={Data.desc}
            onChange={change}
          ></textarea>
        </div>

        <button
          className="mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded-xl hover:bg-blue-600 transition-all duration-200"
          onClick={submit}
        >
          Update Book
        </button>
      </div>
    </div>
  );
};

export default UpdateBook;
