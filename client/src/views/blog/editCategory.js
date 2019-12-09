import React, {useState, Fragment} from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const EditCategory = () => {
    const [category, setCategory] = useState({
        name: '',
        description: '',
        slug: '',
        parentCategory: '',
        categories: ['cat 1', 'cat 2', 'cat 3', 'cat 4']
    })
    const handleChange = prop => event => {
        setCategory({ ...category, [prop]: event.target.value });
    };
    const saveCategory = (e) =>{
        e.preventDefault();
        console.log(category)
    }
    return(
        <Fragment>
            <Row>
                <Col md={12}>
                    <Form>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" placeholder="Name" value={category.name} onChange={handleChange('name')}/>
                        </FormGroup>
                    </Form>
                </Col>
                <Col md={12}>   
                    <Form>
                        <FormGroup>
                            <Label for="name">Slug</Label>
                            <Input type="text" placeholder="Slug" value={category.slug} onChange={handleChange('slug')}/>
                        </FormGroup>
                    </Form>
                </Col>
                <Col md={12}>
                    <FormGroup>
                        <Label for="tags">Parent Category</Label>
                        <Input type="select" value={category.parentCategory} onChange={handleChange('parentCategory')} multiple={false}>
                            <option>Choose...</option>
                            {
                                category.categories.map((cat,index) =>
                                    <option key={index} value={cat}>{cat}</option>
                                )
                            }
                        </Input>
                    </FormGroup>
                </Col>
                <Col md={12}>   
                    <Form>
                        <FormGroup>
                            <Label for="name">Description</Label>
                            <Input type="textarea" value={category.description} onChange={handleChange('description')}/>
                        </FormGroup>
                    </Form>
                </Col>
                <Col md={12}>
                    <Button color="primary" className="mr-2" onClick={saveCategory}>Save</Button>
                    <Button>Cancel</Button>
                </Col>
            </Row>
        </Fragment>
    )
}

export default EditCategory; 