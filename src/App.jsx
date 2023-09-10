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
    console.log(carouselRef);
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
      <div className="buttonContainer">
      <div className="leftButton" onClick={prevSlide} style={{display: activeSlide === 0 ? "none" : "block"}}>
          <svg className='buttonSVG' width="24" height="24" viewBox="0 0 24 24"> 
            <polygon points="15.293 3.293 6.586 12 15.293 20.707 16.707 19.293 9.414 12 16.707 4.707 15.293 3.293"/>
          </svg>
        </div>
        <div className="rightButton" onClick={nextSlide} style={{display: xScrollPosition === xScrollWidth - imageWidth ? "none" : "block"}}>
          <svg className='buttonSVG' width="24" height="24" viewBox="0 0 24 24">
            <polygon points="7.293 4.707 14.586 12 7.293 19.293 8.707 20.707 17.414 12 8.707 3.293 7.293 4.707"/>
          </svg>
        </div>
        <span className='dotContainer'>
          {
            numberOfSlidesArray.map((index)=>{
              return <button className={index === activeSlide ? "dot active" : "dot"} onClick={()=> goToSlide(index)}>○</button>
            })
    
          }
            
        </span>
        <div className="carousel" ref={carouselRef} onScroll={handleScroll}>
          <div className="image one"></div>
          <div className="image two"></div>
          <div className="image three"></div>
          <div className="image four"></div>
          <div className="image five"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
