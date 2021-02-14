/* eslint-disable react/jsx-pascal-case */
import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody} from 'reactstrap';
import { Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {

    state = {
        isModalOpen: false,
        rating: "",
        comment: "",
        author: ""
    };



    toggleModal= () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit = (values) => {
        console.log(values);
        alert('Current state is: ' + JSON.stringify(values));
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <div className="form-group">
                                    <div className="form-group">
                                        <Label htmlFor="rating">Rating</Label>
                                        <Control.select className="form-control" name="rating" model=".rating" id="rating">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                        
                                    </div>
                                    <div>                              
                                        <Label htmlFor="author">Author</Label>
                                        <Control.text 
                                        className="form-control" 
                                        name="author" 
                                        model=".author" 
                                        id="author"
                                        validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }} />
                                        <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 charactres or less'
                                        }}
                                    />
                                    </div> 
                                    <div>
                                        <Label htmlFor="comment">Comment</Label>
                                        <Control.textarea className="form-control" name="comment" model=".comment" id="comment" rows={6}  /> 
                                    </div>
                                        <Button type="submit" className="bg-primary">Submit</Button>
                            </div>
                                    
                        </LocalForm>
                    </ModalBody>
                </Modal>
                <Button onClick={this.toggleModal}outline fa-lg>
                    <i className="fa-pencil"></i>Submit Comment
                </Button>
            </div>
        );
    }
}

function RenderComments({comments}) {
        if(comments) {
            return (
                <div className = "col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments.map(comment => {
                        return (
                            <div key={comment.id}>
                                <p>{comment.text}</p>
                                <p>{comment.author} - {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                            </div>
                        )
                    })}
                    <CommentForm />
                </div>
            )
        }
    }

function RenderCampsite({campsite}) {
        return(
            <div className = "col-md-5 m-1">
                <Card>
                    <CardImg top src ={campsite.image} alt ={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }

function CampsiteInfo(props) {
        if(props.campsite) {
            return(
                <div className = "container">
                    <div className="row">
                <div className="col">
                <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/directory">Directory</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link active>{props.campsite.name}</Link>
                        </BreadcrumbItem>
                        </Breadcrumb>   
                    <h2>{props.campsite.name}</h2>
                    <hr />
                </div>
            </div>
                    <div className = "row">
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            )
        } return <div />
    }




export default CampsiteInfo;