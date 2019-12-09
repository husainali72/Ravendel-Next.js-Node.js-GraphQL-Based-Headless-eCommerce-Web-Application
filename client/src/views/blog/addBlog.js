import React, { Fragment, useState } from 'react';
import { Button, Row, Col, CardHeader, CardBody, Card, Form, FormGroup, Label, Input } from 'reactstrap';
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
 
const AddBlog = () => {
    const [blog, setBlog] = useState({
        title: '',
        description: '',
        category: '',
        tag: '',
        featuredimage:'', 
        categories: ['cat 1', 'cat 2', 'cat 3', 'cat 4'],
        tags: ['tag 1', 'tag 2', 'tag 3', 'tag 4'],
        authors: ['author1', 'author2', 'author3']
    })

    const handleChange = prop => event => {
        setBlog({ ...blog, [prop]: event.target.value });
    };
    
    const addBlog = e =>{
        e.preventDefault();
        console.log('blog', blog);
        console.log('blog', blog.description);
    }
      
    return (
        <Fragment>    
            <Card>
                <CardHeader>
                    <strong><i className="icon-plus pr-1"></i>&nbsp; Add Blog</strong>
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
                                    <Input type="select" value={blog.category} onChange={handleChange('category')} multiple={false}>
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
                                    <Input type="select" value={blog.tag} onChange={handleChange('tag')} multiple={false}>
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
                                <SunEditor setOptions={{
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
                                <Button color="primary" className="mr-2" onClick={addBlog}>Publish</Button>
                                <Button>Draft</Button>
                            </Col>
                        </Row>
                    </Form>        
                </CardBody>
            </Card>
            
        </Fragment>
    )
}

export default AddBlog;