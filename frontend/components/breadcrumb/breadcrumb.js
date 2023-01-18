import Link from "next/link";
import { Container } from "react-bootstrap";
const BreadCrumb = ({ title }) => {
    return (
        <nav className="breadcrumb-nav" aria-label="breadcrumb" style={{}}>
            <Container>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item page-active"><Link href="/" className="breadcrumb-link">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page"><Link href="/" className="breadcrumb-link">{title}</Link></li>
                </ol>
            </Container>
        </nav>
    )
}
export default BreadCrumb;