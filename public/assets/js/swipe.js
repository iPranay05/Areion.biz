
const testimonials = [
    {
      name: "Zon CollabHub",
      job: "",
      image: "assets/img/zchlogo.png",
      testimonial:
        "Areion's creativity skyrocketed our engagement! They turned followers into fans.",
    },
    {
      name: "360 The Garage",
      job: "",
      image: "assets/img/360logo.png",
      testimonial:
        "Their real-time support is a game-changer. Customers rave about the responsive service.",
    },
    {
      name: "Zon Secure Solutions",
      job: "",
      image: "assets/img/ZSSLOGO.png",
      testimonial:
        "We finally saw results. Areion's targeted content drove sales and brand awareness.",
    },
    {
      name: "The Cititor",
      job: "",
      image: "assets/img/CititorLogo.png",
      testimonial:
        "From concept to execution, they handled it all. A stress-free experience with impressive results!",
    },
  ];
  //Current Slide
  let i = 0;
  //Total Slides
  let j = testimonials.length;
  let testimonialContainer = document.getElementById("testimonial-container");
  let nextBtn = document.getElementById("next");
  let prevBtn = document.getElementById("prev");
  nextBtn.addEventListener("click", () => {
    i = (j + i + 1) % j;
    displayTestimonial();
  });
  prevBtn.addEventListener("click", () => {
    i = (j + i - 1) % j;
    displayTestimonial();
  });
  let displayTestimonial = () => {
    testimonialContainer.innerHTML = `
      <p>${testimonials[i].testimonial}</p>
      <img src=${testimonials[i].image}>
      <h3>${testimonials[i].name}</h3>
      <h6>${testimonials[i].job}</h6>
    `;
  };
  window.onload = displayTestimonial;