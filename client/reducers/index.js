import { combineReducers } from "redux";

const bookReducer = (books = [], action) => {
    switch (action.type) {
        case 'ADD_BOOK':
            if (action.data.type == "addbook") {
                return books.concat([action.data.data]);
            }
            else {
                let newBooks = [];
                books.map(function (book) {
                    if (book.isbn === action.data.data.isbn) {
                        book.title = action.data.data.title
                        book.subtitle = action.data.data.subtitle
                        book.description = action.data.data.description
                        book.published = action.data.data.published
                        book.publisher = action.data.data.publisher
                        book.author = action.data.data.author
                    }
                })
                return books;
            }
        case 'GET_BOOKS':
            books = action.data
            return books;
        case 'DELETE_BOOKS':
            return books.filter((book) => book.isbn !== action.id);
        case 'SEARCH_BOOKS':
            return books;
        default:
            return books;
    }
};

const modalReducer = (modal = false, action) => {
    switch (action.type) {
        case 'OPEN_MODAL':
            return modal = true;
        case 'CLOSE_MODAL':
            return modal = false;
        default:
            return modal;
    }
};


const UpdateReducer = (updateBooks = {}, action) => {
    switch (action.type) {
        case 'FIND_BOOK_TO_UPDATE':
            updateBooks = action.data;
            return updateBooks;
        default:
            return updateBooks;
    }
};

export default combineReducers({
    book: bookReducer,
    modal: modalReducer,
    update: UpdateReducer
});
// export default bookReducer;