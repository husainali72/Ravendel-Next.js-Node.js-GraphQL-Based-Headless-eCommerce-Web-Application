import React, { Fragment, useState, useEffect } from 'react';
import { Button, Row, Col, CardHeader, CardBody, Card, Form, FormGroup, Label, Input } from 'reactstrap';
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

 
const EditBlog = (props) => {
    useEffect(() => {
        if(props.location.state){
            if(props.location.state.blog && props.location.state.editMode){
                var blog = props.location.state.blog
                var editMode = props.location.state.editMode
                setBlog({...blog, blog}) 
                setEditMode(editMode)
            }
        }                 
    }, [])

    const [blog, setBlog] = useState({
        title: '',
        description: '',
        categories: [],
        tags: [],
        authors: [],
        featuredimage:''
    })

    const [editMode, setEditMode] = useState(false)

    const handleChange = prop => event => {
        setBlog({ ...blog, [prop]: event.target.value });
    };
    
    const saveBlog = e =>{
        e.preventDefault();
        console.log('blog', blog);
        console.log('blog', blog.description);
    }
      
    return (
        <Fragment>   
            {
                editMode === true ?
                <Card>
                    <CardHeader>
                        <strong><i className="icon-plus pr-1"></i>&nbsp; Edit Blog</strong>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <Row>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="title">Title</Label>
                                        <Input type="text" placeholder="Title" value={blog.title} onChange={handleChange('title')}/>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="categories">Categories</Label> 
                                        <Input type="select" value={blog.categories} onChange={handleChange('category')} multiple={false}>
                                            <option>Choose...</option>
                                            {
                                                blog.categories.map((category,index) =>
                                                    <option key={index} value={category}>{category}</option>
                                                )
                                            }
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="tags">Tags</Label>
                                        <Input type="select" value={blog.tags} onChange={handleChange('tag')} multiple={false}>
                                            <option>Choose...</option>
                                            {
                                                blog.tags.map((tag,index) =>
                                                    <option key={index} value={tag}>{tag}</option>
                                                )
                                            }
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <Label for="description">Description</Label>
                                    <SunEditor 
                                        setOptions={{
                                            height:'400px',
                                            buttonList: [["undo","redo"],["font","fontSize","formatBlock"],["bold","underline","italic"],["fontColor","hiliteColor"],["link","image","video"],["align","horizontalRule","list","table"],["outdent","indent","strike","subscript","superscript"],["fullScreen","codeView"]]
                                        }}
                                        onChange={(content) => setBlog({...blog, ["description"]: content})}  
                                        setContents={blog.description}                                 
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="author">Author</Label>
                                        <Input type="select" value={blog.authors} onChange={handleChange('author')} multiple={false}>
                                            <option>Choose...</option>
                                            {
                                                blog.authors.map((author,index) =>
                                                    <option key={index} value={author}>{author}</option>
                                                )
                                            }
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="featured-image">Featured image</Label>
                                        <Input type="file" onChange={handleChange('featuredimage')}/>
                                    </FormGroup>
                                </Col>                            
                            </Row>
                            <Row className="mt-2">
                                <Col md={12}>
                                    <Button color="primary" className="mr-2" onClick={saveBlog}>Save</Button>
                                    <Button onClick={()=> props.history.push('/all-blogs')}>Cancel</Button>
                                </Col>
                            </Row>
                        </Form>        
                    </CardBody>
                </Card>
                :
                null                                    
            }                        
        </Fragment>
    )
}

export default EditBlog;