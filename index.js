
const BACKEND_HOST = "http://localhost:5000"

const dimensions = { height: 300, width: 320 }
const total = 10 // max: 20


window.onload = async () => {
  const carouselContainer = document.querySelector('.carousel-container')
  const carousel = document.querySelector('.carousel');
  const dotsContainer = document.querySelector('.dots');
  let currIdx = parseInt((carouselContainer.clientWidth / dimensions.width) / 2);

  try {
    const response = await fetch(`${ BACKEND_HOST }/api/fetch-data?total=${ total }`)
    if (response.status !== 200) alert("Something went wrong!")
    const data = await response.json()

    let slideItems = "";
    let dotItems = "";
    data?.slides.forEach((item, idx) => {
      slideItems += `
        <div class="slide" >

          <img src="${ item.image_url }" alt="" />
        </div>
      `
      dotItems += `<span class="dot ${ idx === currIdx && "active" }"></span>`
    })
    // <div class="overlay">${ item.title }</div>
    // for attaching images and buttons to html containers
    carousel.insertAdjacentHTML("afterbegin", slideItems)
    dotsContainer.insertAdjacentHTML("afterbegin", dotItems)
  } catch (err) {
    console.log(err)
    alert("Server error!")
  }
  // setting 
  carouselContainer.style.height = `${ dimensions.height + 100 }px`;

  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll('.dot');

  slides.forEach((slide, idx) => {
    slide.style.width = `${ dimensions.width }px`;
    slide.style.height = `${ dimensions.height }px`;
  });


  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => translate(idx - currIdx))
  });

  const nextSlide = document.querySelector(".btn-next");
  nextSlide.addEventListener("click", () => translate(1));

  const prevSlide = document.querySelector(".btn-prev");
  prevSlide.addEventListener("click", () => translate(-1));


  function translate(offset) {
    const tempOffset = currIdx + offset;

    if (tempOffset < 0 || tempOffset >= total) return

    dots[currIdx]?.classList.remove('active')
    currIdx = tempOffset
    dots[currIdx]?.classList.add('active');


    carousel.style.transform = `translateX(-${dimensions.width * (currIdx - 1)}px)`
  }
}