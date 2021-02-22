import React, { Component } from 'react';

// Components
import Directory from './DirectoryComponent.js';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import CampsiteInfo from './CampsiteInfoComponent'
import About from './AboutComponent'

//React Router
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

// React-Redux
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';

// Actions
import { 
    postComment,
    addComment, 
    fetchCampsites, 
    fetchComments, 
    fetchPromotions, 
    fetchPartners,
    postFeedback
} from '../redux/ActionCreators';

// React Animations/Transitions
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        partners: state.partners,
        promotions: state.promotions,
    };
};

const mapDispatchToProps = {
    addComment: (campsiteId, rating, author, text) =>
    addComment(campsiteId, rating, author, text),
    postComment: (campsiteId, rating, author, text) => postComment(campsiteId, rating, author, text),
    fetchCampsites: () => (fetchCampsites()),
    resetFeedbackForm: () => (actions.reset('feedbackForm')),
    fetchComments: () => (fetchComments()),
    fetchPromotions: () => (fetchPromotions()),
    fetchPartners: () => (fetchPartners()),
    postFeedback: (feedback) => postFeedback(feedback)
};

class Main extends Component {

    componentDidMount() {
        this.props.fetchCampsites();
        this.props.fetchComments();
        this.props.fetchPromotions();
        this.props.fetchPartners();
    }
    

    render() {

        const HomePage = () => {
            return (
                <Home
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
                    campsitesLoading={this.props.campsites.isLoading}
                    campsitesErrMess={this.props.campsites.errMess}
                    promotion={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
                    promotionLoading={this.props.promotions.isLoading}
                    promotionErrMess={this.props.promotions.errMess}
                    partner={this.props.partners.partners.filter(partner => partner.featured)[0]}
                    partnerLoading={this.props.partners.isLoading}
                    partnerErrMess={this.props.partners.errMess}
                />
            );
        }

        const CampsiteWithId = ({match}) => {
            return(
                <CampsiteInfo
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
                    isLoading={this.props.campsites.isLoading}
                    errMess={this.props.campsites.errMess}
                    comments={this.props.comments.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
                    commentsErrMess={this.props.comments.errMess}
                    addComment={this.props.addComment}
                    postComment={this.props.postComment}
                />         
            );
        };

        return (
            <div>
                <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                            <Route path='/home' component={HomePage} />
                            <Route exact path='/aboutus' render={() => <About partners={this.props.partners} partnerLoading={this.props.partners.isLoading} partnerErrMess={this.props.partners.errMess} />} />
                            <Route exact path='/directory' render={() => <Directory campsites={this.props.campsites} />} />
                            <Route path='/directory/:campsiteId' component={CampsiteWithId} />
                            <Route exact path='/contactus' render={() => <Contact postFeedback={this.props.postFeedback}resetFeedbackForm={this.props.resetFeedbackForm} />} />
                            <Redirect to='/home' />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));