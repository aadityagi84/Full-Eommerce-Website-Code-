import Slider from "react-slick";

const TestimonialData = [
  {
    id: 1,
    name: "Victor",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita consectetur hic quidem natus exercitationem ex, vel enim iusto explicabo beatae officia cupiditate eveniet aperiam neque voluptatibus sint accusamus. Iste dolor dicta esse iure consectetur doloremque at similique natus voluptatem ab.",
    img: "https://picsum.photos/101/101",
  },
  {
    id: 2,
    name: "Victor",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita consectetur hic quidem natus exercitationem ex, vel enim iusto explicabo beatae officia cupiditate eveniet aperiam neque voluptatibus sint accusamus. Iste dolor dicta esse iure consectetur doloremque at similique natus voluptatem ab.",
    img: "https://picsum.photos/102/102",
  },
  {
    id: 3,
    name: "Victor",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita consectetur hic quidem natus exercitationem ex, vel enim iusto explicabo beatae officia cupiditate eveniet aperiam neque voluptatibus sint accusamus. Iste dolor dicta esse iure consectetur doloremque at similique natus voluptatem ab.",
    img: "https://picsum.photos/103/103",
  },
  {
    id: 4,
    name: "Victor",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita consectetur hic quidem natus exercitationem ex, vel enim iusto explicabo beatae officia cupiditate eveniet aperiam neque voluptatibus sint accusamus. Iste dolor dicta esse iure consectetur doloremque at similique natus voluptatem ab.",
    img: "https://picsum.photos/104/104",
  },
  {
    id: 5,
    name: "Victor",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita consectetur hic quidem natus exercitationem ex, vel enim iusto explicabo beatae officia cupiditate eveniet aperiam neque voluptatibus sint accusamus. Iste dolor dicta esse iure consectetur doloremque at similique natus voluptatem ab.",
    img: "https://picsum.photos/105/105",
  },
  {
    id: 6,
    name: "Victor",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita consectetur hic quidem natus exercitationem ex, vel enim iusto explicabo beatae officia cupiditate eveniet aperiam neque voluptatibus sint accusamus. Iste dolor dicta esse iure consectetur doloremque at similique natus voluptatem ab.",
    img: "https://picsum.photos/106/106",
  },
];

var settings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 400,
  cssEase: "linear",
  pauseOnHover: true,
  pauseOnFocus: true,
  responsive: [
    {
      breakpoint: 10000,
      settings: { slidesToShow: 3, slidesToScroll: 1, infinite: true },
    },
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2, slidesToScroll: 1, initialSlide: 2 },
    },
    {
      breakpoint: 640,
      settings: { slidesToShow: 1, slidesToScroll: 1 },
    },
  ],
};

function Testimonials() {
  return (
    <div className="py-10 mb-10">
      <div className="container">
        {/* Header section */}
        <div className="text-center mb-10 mx-w-[600px] mx-auto">
          <p className="text-sm text-primary">What our customers are saying</p>
          <h1 className="text-3xl font-bold">Testimonials</h1>
          <p className="text-xs text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
            quibusdam provident vel. Repellendus quibusdam provident vel.
          </p>
        </div>
        {/* Testimonial cards */}
        <div>
          <Slider {...settings}>
            {TestimonialData.map((data) => (
              <div key={data.id} className="my-6">
                <div className="flex flex-col  gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl dark:bg-gray-800 bg-primary/10 relative">
                  <div className="mb-4">
                    <img
                      src={data.img}
                      alt="Testimonial"
                      className="rounded-full w-20 h-20"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="space-y-3">
                      <p className="text-xs text-gray-500">{data.text}</p>
                      <h1 className="text-xl font-bold text-black/80 dark:text-light">
                        {data.name}
                      </h1>
                    </div>
                  </div>
                  <p className="text-black/20 text-9xl font-serif absolute top-0 right-0"></p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
