import { useEffect, useRef,  useState } from 'react';
import './normalize.css';
import './styles.css';

function App() {

  const carouselRef = useRef()
  const[imageWidth, setImageWidth] = useState(480)
  const[xScrollWidth, setXScrollWidth] = useState(2000)
  const[xScrollPosition, setXScrollPosition] = useState(0)
  const[numberOfSlidesArray, setNumberOfSlidesArray] = useState([])
  const[activeSlide, setActiveSlide] = useState(0)

  useEffect(()=> {
    setImageWidth(carouselRef.current.offsetWidth)
    setXScrollWidth(carouselRef.current.scrollWidth)
    const childElementArray = []
    for (let i = 0; i < carouselRef.current.childElementCount; i++) {
      childElementArray.push(i)
    }
    setNumberOfSlidesArray(childElementArray)
  }, [])

  function nextSlide() {
    carouselRef.current.scrollLeft += imageWidth
  }

  function prevSlide() {
    carouselRef.current.scrollLeft -= imageWidth
  }

  function handleScroll() {
    setXScrollPosition(carouselRef.current.scrollLeft)
    setActiveSlide(Math.round(carouselRef.current.scrollLeft / imageWidth))
  }

  function goToSlide(index) {
    carouselRef.current.scrollLeft = imageWidth * index
  }

  return (
    <div className="carouselContainer">

        <div className="carousel" ref={carouselRef} onScroll={handleScroll}>
          <div className="image one"></div>
          <div className="image two"></div>
          <div className="image three"></div>
          <div className="image four"></div>
          <div className="image five"></div>
        </div>

        <div className="buttonContainer">
          <button className="slideButton" onClick={prevSlide} style={{visibility: activeSlide === 0 ? "hidden" : "visible"}}>◄</button>
          <button className="slideButton" onClick={nextSlide} style={{visibility: xScrollPosition === xScrollWidth - imageWidth ? "hidden" : "visible"}}>►</button>
        </div>

        <div className='dotContainer'>
          {
            numberOfSlidesArray.map((index)=>{
              return <button className={index === activeSlide ? "dot active" : "dot"} onClick={()=> goToSlide(index)}>•</button>
            })
          }
        </div>

    </div>
  );
}

export default App;
