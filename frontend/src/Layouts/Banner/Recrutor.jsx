import React from "react";

const testimonials = [
  {
    name: "Michael Thompson",
    role: "Avid Reader",
    stars: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "Booksi has transformed my reading experience. Their selection is unmatched, and the service is exceptional. I've discovered so many amazing books I wouldn't have found elsewhere.",
  },
  {
    name: "Sarah Johnson",
    role: "Book Enthusiast",
    stars: 4,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "The personalized recommendations are spot on! Every book suggestion I've received has been perfect for my reading preferences. Plus, delivery is always fast and reliable.",
  },
  {
    name: "David Martinez",
    role: "Parent & Reader",
    stars: 5,
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    review:
      "As a parent, I appreciate the thoughtful curation of children's books. Booksi makes it easy to find age-appropriate and engaging reads for my kids. We're loyal customers for life!",
  },
];

const Recrutor = () => {
  return (
    <div className="bg-zinc-900 py-16 px-4 sm:px-8 lg:px-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white">What Our Readers Say</h2>
        <p className="mt-2 text-white font-semibold">
          Discover why book lovers choose Booksi
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="bg-zinc-800 rounded-xl shadow-md p-6 flex flex-col justify-between"
          >
            <div>
              <div className="text-[#ff4452] text-lg mb-2">
                {"★".repeat(t.stars) + "☆".repeat(5 - t.stars)}
              </div>
              <p className="text-white text-sm mb-4">"{t.review}"</p>
            </div>
            <div className="flex items-center mt-4">
              <img
                src={t.image}
                alt={t.name}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <p className="font-semibold text-gray-500">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recrutor;
