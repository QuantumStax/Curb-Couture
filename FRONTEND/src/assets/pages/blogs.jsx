import Footer from "../components/footer";
import Hero from "../components/hero";

const Blogs = () => {
  const blogItems = [
    {
      img: "/images/collection/specials/starry-night-385896.webp",
      title: "10 Timeless Wardrobe Staples: Build Your Perfect Closet",
      date: "04 January 2025",
      intro:
        "Discover the essential wardrobe staples every closet needs for effortless, timeless style.",
    },
    {
      img: "/images/collection/doodle/doodles-shirt-559986.webp",
      title: "Runway to Reality: Transforming Trends into Everyday Style",
      date: "13 September 2024",
      intro:
        "Learn how to adapt bold runway trends into wearable, everyday fashion",
    },
    {
      img: "/images/collection/oversized/medusa-oversized-t-shirt-753500.webp",
      title: "The Power of Accessories: Elevate Your Outfit in Seconds",
      date: "25 January 2024",
      intro:
        "Explore the transformative power of accessories to take any outfit from simple to stunning.",
    },
    {
      img: "/images/collection/retro/retro-shirt-225762.webp",
      title: "Sustainable Style: How to Stay Chic While Saving the Planet",
      date: "21 June 2024",
      intro:
        "Find out how to stay fashionable while making eco-friendly choices for a sustainable wardrobe.",
    },
  ];

  return (
    <section>
      <section>
        <Hero />
      </section>
      <section className="bg-primary px-6 sm:px-10 lg:px-24 py-10">
        <h1 className="text-4xl sm:text-5xl font-semibold">Couture Corner</h1>
        <p className="opacity-70 leading-loose text-sm sm:text-base">
          Your Daily Dose of Fashion Inspiration
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {blogItems.map((blog, i) => (
            <div
              className="py-3 w-full sm:w-[18rem] lg:w-[20rem] mb-5 cursor-pointer"
              key={i}
            >
              <div className="h-[15rem] sm:h-[18rem] lg:h-[20rem] rounded-lg overflow-hidden">
                <img
                  src={blog.img}
                  alt={blog.date}
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="mt-5">
                <h1 className="text-md sm:text-lg font-bold opacity-70">
                  {blog.title}
                </h1>
                <p className="opacity-50 my-2 text-sm">{blog.date}</p>
                <p className="text-sm sm:text-base">{blog.intro}</p>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <hr className="w-[2rem] h-[0.2rem] bg-black" />
                <a
                  href="#"
                  className="opacity-70 hover:opacity-100 text-sm sm:text-base"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <Footer />
      </section>
    </section>
  );
};

export default Blogs;
