import Link from "next/link";
import { Container } from "react-bootstrap";
const BreadCrumb = ({ title }) => {
    function capitalize(s)
        {
            return s[0].toUpperCase() + s.slice(1);
        }
    return (
        <nav className="breadcrumb-nav" aria-label="breadcrumb" style={{}}>
            <Container>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item page-active"><Link href="/" className="breadcrumb-link">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page"><Link href="/" className="breadcrumb-link">{capitalize(title)}</Link></li>
                </ol>
            </Container>
        </nav>
    )
}
export default BreadCrumb;