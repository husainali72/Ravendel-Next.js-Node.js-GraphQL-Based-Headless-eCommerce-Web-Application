import Container from 'react-bootstrap/Container';
import { getImage } from "../../utills/helpers";
import {MdChevronLeft,MdChevronRight} from 'react-icons/md'
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import useResizeObserver from '@react-hook/resize-observer';
const Category = ({ category }) => {
const [showSlider,setShowSlider] = useState(false)
const [inlineSize,setInlineSize] = useState(0)
const slider = useRef();

const slideLeft =()=>{
                 slider.current.scrollLeft = slider.current.scrollLeft - 500;
              }
const slideRight =()=>{
                 slider.current.scrollLeft = slider.current.scrollLeft + 500;
             }
const bool =  slider?.current?.offsetWidth < slider?.current?.scrollWidth;
 
    useEffect(() => {
      setShowSlider(bool)
    }, [inlineSize])
    
    useResizeObserver(slider, entry => {
        const { inlineSize, blockSize } = entry.contentBoxSize[0];
        setInlineSize(inlineSize)
      });
    return (
        <section className="product-cart-section">
            <Container className="container">
              {showSlider ? <MdChevronLeft  onClick={slideLeft} className='cat-left-icon' size={40}  /> : null }
                <div>
                    <h4 className='theme-color'>Product <span className='black-color'>Category</span></h4>
                    <div
                         className={showSlider ? "category pro-cat": " pro-cat category categoryShow " }
                          ref={slider}>
                             {category.map((item, i) => (
                                 item.parentId === null && (<div className=" category-cards" key={i}>
                                     <div className="category-card-image">
                                         <Link href={`/categorys/[categorys]?url=${item.url}`} as={`/categorys/${item.url}`}>
                                         <img
                                            src={getImage(item?.image, 'original')}
                                            className="  cimg"
                                            onError={(e) => e.type === 'error' ? e.target.src = "https://dummyimage.com/300" : null}
                                            alt={item?.name}
                                            />
                                        </Link>
                                    </div>
                                    <div className="card-body">
                                        <p
                                            className="card-title category-card-title">
                                            {item?.name}
                                        </p>
                                    </div>
                                </div>)
                            ))}
                        </div>
                    </div>
                        {showSlider ? <MdChevronRight onClick={slideRight} className='cat-right-icon' size={40} /> : null}
            </Container>
        </section>
    )
}
export default Category;