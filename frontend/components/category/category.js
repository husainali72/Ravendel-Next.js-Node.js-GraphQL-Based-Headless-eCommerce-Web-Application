import Container from 'react-bootstrap/Container';
import { getImage } from "../../utills/helpers";
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import useResizeObserver from '@react-hook/resize-observer';
import { capitalize } from 'lodash';
import NoImagePlaceHolder from '../../components/images/NoImagePlaceHolder.png';
import { useSelector } from 'react-redux';
const Category = ({ category }) => {
    const [showSlider, setShowSlider] = useState(false)
    const [inlineSize, setInlineSize] = useState(0)
    const getSetting = useSelector(state => state.setting)
    const slider = useRef();
    const slideLeft = () => {
        slider.current.scrollLeft = slider.current.scrollLeft - 500;
    }
    const slideRight = () => {
        slider.current.scrollLeft = slider.current.scrollLeft + 500;
    }
    const bool = slider?.current?.offsetWidth < slider?.current?.scrollWidth;
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
                {showSlider ? <MdChevronLeft onClick={slideLeft} className='cat-left-icon' size={24} /> : null}
                <div>
                    <h4 className='theme-color my-3'>Products <span className='black-color'>Category</span></h4>
                    <div
                        className={showSlider ? "category pro-cat px-3" : " pro-cat category categoryShow "}
                        ref={slider}>
                        {category.map((item, i) => (
                            item.parentId === null && (
                                <Link href={`/subcategory/[category]?url=${item.url}`} as={`/subcategory/${item.url}`}><div className="category-cards" key={i}>
                                    <div className="category-card-image">
                                        <img
                                            src={getImage(item?.image, 'original', false, getSetting?.setting)}
                                            className="  cimg"
                                            onError={(e) => e.type === 'error' ? e.target.src = NoImagePlaceHolder.src : null}
                                            alt={item?.name}
                                        />
                                    </div>
                                    <div className="card-body">
                                        <p
                                            className="card-title category-card-title">
                                            {capitalize(item?.name)}
                                        </p>
                                    </div>
                                </div>
                                </Link>)
                        ))}
                    </div>
                </div>
                {showSlider ? <MdChevronRight onClick={slideRight} className='cat-right-icon' size={24} /> : null}
            </Container>
        </section>
    )
}
export default Category;