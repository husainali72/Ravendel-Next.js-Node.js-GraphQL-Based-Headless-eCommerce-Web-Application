/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import Link from "next/link";
import { Container } from "react-bootstrap";
const BreadCrumb = ({ title }) => {

    function capitalize(word) {
        return word[0].toUpperCase() + word.slice(1);
    }
    const array = title.split(`/`);
    const elements = array.map((element, index) => {
        return <li className={`breadcrumb-item ${index === array.length - 1 ? "active" : "page-active"}`}>{capitalize(element)}</li>
    })
    return (
        <nav className="breadcrumb-nav" aria-label="breadcrumb" style={{}}>
            <Container>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item page-active"><Link href="/" className="breadcrumb-link">Home</Link></li>
                    {elements}
                </ol>
            </Container>
        </nav>
    )
}
export default BreadCrumb;