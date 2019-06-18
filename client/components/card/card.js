import React from 'react';
import { connect } from 'react-redux';
import http from 'axios';
import './card.css';
class Card extends React.Component {
    constructor(props) {
        super(props);
        this.deleteBooks = this.deleteBooks.bind(this);
        this.updateBook = this.updateBook.bind(this);
    }
    deleteBooks(){
        http.post('/delete', {
            bookId: this.props.isbn
        }).then((response) => {
            this.props.dispatch({ type: 'DELETE_BOOKS', id: this.props.isbn })
        }).catch((err) => {
            console.log("Error Occurred");
        })
    }
    updateBook(){
        this.props.dispatch({ type: 'FIND_BOOK_TO_UPDATE', data: this.props })
        this.props.dispatch({
            type: 'OPEN_MODAL',
            data: ""
        });
    }
    render() {
        return (
            <div className="card">
                <picture className="thumbnail">
                    <img className="category__01" src="http://eloquentjavascript.net/2nd_edition/img/cover.png" alt="" />
                </picture>
                <div className="card-content">
                    <p>ISBN: {this.props.isbn}</p>
                    <h2>{this.props.title}</h2>
                    <p><i>By: {this.props.author}</i></p>
                    <p>{this.props.description}</p>
                </div>
                <div className="card-button">
                    <button className="action-button" name="action" onClick={() => this.updateBook(this.props)} value="Edit" >Edit</button>
                    <button className="action-button" value="Delete" onClick={() => this.deleteBooks(this.props.isbn)}>Delete</button>
                </div>
                <div className="card-footer">
                    <p> <i>Publisher: {this.props.publisher} </i></p>
                </div>
            </div>


        )
    }
}

const mapStateToProps = (state) => {
    return {
        books: state
    }
}
export default connect(mapStateToProps)(Card);