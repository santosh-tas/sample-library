import React from 'react';
import http from 'axios'
import Card from './card/card'
import Modal from './modal/modal';
import { connect } from 'react-redux';
import './libraryLanding.css'
class libraryLanding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalDisplay: true,
            bookDetails: [],
            searchInput: ""
        }
        this.removeModal = this.removeModal.bind(this);
        this.saveBooks = this.saveBooks.bind(this);
        this.addBookModal = this.addBookModal
        .bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
    componentDidMount() {
        this.getAllBooks();
    }
    removeModal() {
        this.props.dispatch({
            type: 'CLOSE_MODAL',
            data: ""
        });
    }
    handleSearch = e => {
        const obj = {};
        obj[e.target.name] = e.target.value;
        this.setState(obj);
        this.props.dispatch({
            type: 'SEARCH_BOOKS',
            data:  obj[e.target.name]
        });
      };
    addBookModal() {
        this.props.dispatch({
            type: 'OPEN_MODAL',
            data: ""
        });
        this.props.dispatch({
            type: 'FIND_BOOK_TO_UPDATE',
            data: {}
        });
        
        
    }

    saveBooks(bookInfo, actionType) {
        let data = {
            isbn: bookInfo.isbn,
            title: bookInfo.title,
            subtitle: bookInfo.subtitle,
            description: bookInfo.description,
            published: bookInfo.published,
            publisher: bookInfo.publisher,
            author: bookInfo.author,
            actionType 
        }
        http.post('/add', data).then((response) => {
            this.props.dispatch({
                type: 'ADD_BOOK',
                data:{
                    type: actionType,
                    data: data
                }
            });
            // this.props.dispatch({
            //     type: 'FIND_BOOK_TO_UPDATE',
            //     data: {}
            // });
            this.props.dispatch({
                type: 'CLOSE_MODAL',
                data: ""
            });
            // this.props.dispatch({
            //     type: 'OPEN_MODAL',
            //     data: "Book Added Successfully"
            // });
        }).catch((err) => {
            this.props.dispatch({
                type: 'OPEN_MODAL',
                data: "Error Occurred"
            });
        });
    }
    getAllBooks() {
        let data = {};
        http.get('/getallbooks').then((response) => {
            this.setState({ bookDetails: response.data.books })
            let data = [];
            response.data.books.map((value) => {
                let book = {
                    isbn: value.isbn,
                    title: value.title,
                    subtitle: value.subtitle,
                    description: value.description,
                    published: value.published,
                    publisher: value.publisher,
                    author: value.author
                }
                data.push(book);

            })
            this.props.dispatch({
                type: 'GET_BOOKS',
                data
            });

        }).catch((err) => {

        });
    };
    render() {
        let bookList = this.props.books.book
        bookList = this.state.searchInput ? bookList.filter((book) => book.title.toUpperCase().includes(this.state.searchInput.toUpperCase())) : bookList
        return (
            <div className="lib-landing">
                <div className="top-nav">
                    <input placeholder="search ...." name="searchInput" className="searchBar" onChange={this.handleSearch} value={this.state.searchInput}></input>
                    <button className="action-button" name="action" value="Add" onClick={this.addBookModal}>ADD BOOK</button>
                </div>
                <div className="cards">
                    {this.props.books.modal &&
                        <Modal data={this.props.books.update} modaldata={this.props.books.modal.data} removeModal={this.removeModal} saveBook={(bookInfo, type) => this.saveBooks(bookInfo, type)} />
                    }
                    
                    {bookList.length > 0 &&
                        bookList.map((value) => {
                            return <Card key={value.isbn} subtitle={value.subtitle} isbn={value.isbn} title={value.title} description={value.description} author={value.author} publisher={value.publisher} />
                        })}

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
export default connect(mapStateToProps)(libraryLanding);