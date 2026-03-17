import { useEffect, useState } from "react";

const MOCK_CAROUSELS = [
  {
    title: "Premium Football Turf",
    description: "Experience the thrill of playing on our world-class FIFA-standard artificial turf. Perfect lighting and drainage for year-round play.",
    img: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800",
  },
  {
    title: "Cricket Practice Nets",
    description: "Sharpen your batting and bowling skills in our professional practice nets with automated bowling machines and coaching support.",
    img: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
  },
  {
    title: "Book Your Slot Today",
    description: "Easy online booking, flexible timings, and affordable rates. Gather your squad and experience the best turf in town!",
    img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
  },
];

export default function Carousel() {
  const [slides, setSlides] = useState(MOCK_CAROUSELS);
  const [active, setActive] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8080/carousels")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setSlides(data);
          setActive(0);
        }
      })
      .catch((err) => {
        console.error("Fetch failed, using mock carousel data:", err);
      });
  }, []);

  useEffect(() => {
    if (slides.length === 0) return; 

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [slides.length, active]); 

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 relative"
          >
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-[60vh] object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                {slide.title}
              </h2>
              <p className="text-lg md:text-2xl text-white/90">
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() =>
          setActive((prev) => (prev - 1 + slides.length) % slides.length)
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-3 rounded-full shadow-lg opacity-80 hover:opacity-100 transition z-10"
        aria-label="Previous slide"
      >
        ❮
      </button>

      <button
        onClick={() => setActive((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-3 rounded-full shadow-lg opacity-80 hover:opacity-100 transition z-10"
        aria-label="Next slide"
      >
        ❯
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`transition-all duration-300 ${
              active === i
                ? "w-10 h-3 bg-white rounded-full"
                : "w-3 h-3 bg-white/60 rounded-full hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}