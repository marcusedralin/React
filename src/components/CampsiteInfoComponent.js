/* eslint-disable react/jsx-pascal-case */
import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody} from 'reactstrap';
import { Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label} from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


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

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);
    }

    render() {
        return (
            <div>
                <Button onClick={this.toggleModal} outline fa-lg>
                    <i className="fa fa-pencil"></i> Submit Comment
                </Button>
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
                                    <div className ="form-group">                              
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
                                    <div className="form-group">
                                        <Label htmlFor="comment">Comment</Label>
                                        <Control.textarea className="form-control" name="comment" model=".comment" id="comment" rows={6}  /> 
                                    </div>
                                        <Button type="submit" className="bg-primary">Submit</Button>
                            </div>
                                    
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

function RenderComments({comments, postComment, campsiteId}) {
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
                    <CommentForm campsiteId={campsiteId} postComment={postComment} />
                </div>
            )
        }
    }

function RenderCampsite({campsite}) {
        return(
            <div className = "col-md-5 m-1">
                <Card>
                    <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }

function CampsiteInfo(props) {
        if(props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        if(props.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4>{props.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
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
                        <RenderComments 
                        comments={props.comments}
                        postComment={props.postComment} 
                        campsiteId={props.campsite.id}
                        />
                    </div>
                </div>
            )
        } return <div />
    }




export default CampsiteInfo;