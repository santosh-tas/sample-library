import React from 'react';
import './modal.css';
export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isbn: "",
            title: "",
            subtitle: "",
            author: "",
            published: "",
            publisher: "",
            description: ""
        }
        this.handleEvent = this.handleEvent.bind(this);
        this.saveBook = this.saveBook.bind(this);

    }

    handleEvent = e => {
        const obj = {};
        obj[e.target.name] = e.target.value;
        this.setState(obj);
    };
    saveBook = e => {
        let type = Object.keys(this.props.data).length > 0 ? "updatebook" : "addbook"
        if (type == "updatebook") {
            let data = {
                isbn: this.state.isbn ? this.state.isbn : this.props.data.isbn,
                title: this.state.title ? this.state.title : this.props.data.title,
                subtitle: this.state.subtitle ? this.state.subtitle : this.props.data.subtitle,
                author: this.state.author ? this.state.author : this.props.data.author,
                published: this.state.published ? this.state.published : this.props.data.published,
                publisher: this.state.publisher ? this.state.publisher : this.props.data.publisher,
                description: this.state.description ? this.state.description : this.props.data.description

            }
            this.props.saveBook(data, type);
        }
        else
            this.props.saveBook(this.state, type);

    }
    render() {
        return (
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>Add/Update Book</h2>
                    </div>
                    <div className="modal-body">
                        <div className="form-field">
                            <label htmlFor="isbn">ISBN</label>
                            <input
                                name="isbn"
                                onChange={this.handleEvent}
                                value={this.state.isbn || this.props.data.isbn || ""}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="title">TITLE</label>
                            <input
                                name="title"
                                onChange={this.handleEvent}
                                value={this.state.title || this.props.data.title || ""}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="title">SUB TITLE</label>
                            <input
                                name="subtitle"
                                onChange={this.handleEvent}
                                value={this.state.subtitle || this.props.data.subtitle || ""}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="author">Author</label>
                            <input
                                name="author"
                                onChange={this.handleEvent}
                                value={this.state.author || this.props.data.author || ""}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="publisher">PUBLISHER</label>
                            <input
                                name="publisher"
                                onChange={this.handleEvent}
                                value={this.state.publisher || this.props.data.publisher || ""}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="description">DESCRIPTION</label>
                            <textarea
                                rows={3}
                                name="description"
                                onChange={this.handleEvent}
                                value={this.state.description || this.props.data.description || ""}
                            />
                        </div>
                        <div className="form-field">
                            <div className="card-button">
                                <button className="action-button" name="action" onClick={this.saveBook} value="Edit">Save</button>
                                <button className="action-button" onClick={this.props.removeModal} name="action" value="Delete">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}