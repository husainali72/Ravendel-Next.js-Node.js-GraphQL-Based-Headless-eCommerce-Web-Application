import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
const CategoryBreadCrumb = ({ breadCrumbTitle, categoryDetail }) => {
    const router = useRouter()
    return (
        <nav className="breadcrumb-nav" aria-label="breadcrumb" style={{}}>
            <Container>
                <ol className="breadcrumb" style={{ cursor: 'pointer' }}>
                    <li className="breadcrumb-item page-active" ><Link href="/" className="breadcrumb-link">Home</Link></li>

                    {breadCrumbTitle && <><p style={{ marginLeft: '10px', marginRight: '10px' }}>{`>`}</p>
                        <Link href={`/subcategory/[categorys]?url=${breadCrumbTitle?.url}`} as={`/subcategory/${breadCrumbTitle?.url}`} style={{ marginLeft: '10px' }} ><li onClick={() => router.back()} className="breadcrumb-item page-active breadcrumb-link" >
                            {breadCrumbTitle?.name}</li></Link></>}
                    {categoryDetail && <><p style={{ marginLeft: '10px' }}>{`>`}</p>
                        <li className="breadcrumb-item page-active breadcrumb-link" style={{ marginLeft: '10px' }}>
                            {categoryDetail?.name}</li></>}
                </ol>
            </Container>
        </nav>
    )
}
export default CategoryBreadCrumb;