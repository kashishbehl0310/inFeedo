import React, { Component } from "react";
import axios from 'axios';
import HeaderNav from './Navbar'

class SinglePost extends Component{
    constructor(props){
        super(props);
        this.state = {
            post: {},
            comments: [],
            dataFetched: false,
            limit: 10,
            toggleEditMode: false,
            postEdited: false
        }
        this.loadMore = this.loadMore.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleBodyChange = this.handleBodyChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
    }
    fetchComments(id){
        let url = `https://jsonplaceholder.typicode.com/posts/${id}/comments`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    comments: data,
                    dataFetched: true,
                    redirect: false
                })
            })
            .catch(err => console.log(err))
    }
    fetchPostData(id){
        let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                post: data,
                title: data.title,
                body: data.body,
                dataFetched: true
            })
        })
        .catch(err => console.log(err))
    }
    loadMore(){
        this.setState((prevState) => {
            return{
                limit: prevState.limit + 5
            }
        })
    }
    handleEdit(){
        this.setState({
            toggleEditMode: true
        })
    }
    closeEdit(){
        this.setState({
            toggleEditMode: false
        })
    }
    handleTextChange(value){
        let title = value;
        let postCopy = JSON.parse(JSON.stringify(this.state.post));
        postCopy.title = title;
        this.setState({
            post: postCopy,
            postEdited: true
        })
    }
    handleBodyChange(value){
        let body = value;
        let postCopy = JSON.parse(JSON.stringify(this.state.post));
        postCopy.body = body;
        this.setState({
            post: postCopy,
            postEdited: true
        })
    }
    handleSave(){
        const { id } = this.props.match.params;
        axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(res => {
            if(this.state.postEdited){
                this.setState({
                    toggleEditMode: false
                })
            }
        })
        
    }
    componentDidMount(){
        const { id } = this.props.match.params;
        this.fetchPostData(id)
        this.fetchComments(id)
    }
    render(){
        const { post, comments, limit, toggleEditMode } = this.state;
        return( 
            <div className="Home">
                <HeaderNav />
                <div className="singlePostContainer">
                {
                    (!toggleEditMode) ? 
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-10 postDetailsContainer">
                                                <h4 className="card-title">{post.title}</h4>
                                                <p className="card-text">{post.body}</p>
                                            </div>
                                            <div className="col-lg-2">
                                                <div className="controlOptions">
                                                    <p onClick={this.handleEdit} >Edit</p>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        {
                                            (comments.slice(0, limit).map((comment, index) => {
                                                return(
                                                    <div key={index} className="commentSection">
                                                        <h6 className="card-text">{comment.name}</h6>
                                                        <p className="card-text">{comment.email}</p>
                                                        <p className="card-text">{comment.body}</p>
                                                    </div>
                                                )
                                            }))
                                        }
                                        <button className="btn btn-primary" onClick={this.loadMore} >Load more comments</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : 
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body">
                                        {/* <div className="row"> */}
                                            <div className="controlOptions">
                                                        <button onClick={this.closeEdit} type="button" className="close" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                            </div>
                                        {/* </div> */}
                                        <div className="row">
                                            <div className="col-lg-10 editPostContainer">
                                                {/* <h4 className="card-title">{post.title}</h4> */}
                                                <div className="form-group">
                                                    <label htmlFor="title" >Post Title</label>
                                                    <input className="form-control" name="title" type="text" defaultValue={post.title} onChange={(e) => this.handleTextChange(e.target.value)} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="body">Post Body</label>
                                                    <textarea rows="2" cols="20" name="body" className="form-control" type="text" onChange={(e) => this.handleBodyChange(e.target.value)} defaultValue={this.state.body}></textarea>                                                
                                                </div>
                                            </div>
                                            <div className="col-lg-2">
                                                {/* <div className="controlOptions">
                                                    <button onClick={this.closeEdit} type="button" className="close" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div> */}
                                            </div>
                                        </div>
                                        <div className="row saveButtonContainer">
                                            <button disabled={!this.state.postEdited} onClick={this.handleSave} className="btn btn-primary">Edit Post</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                
            </div>
            </div>
            
        )
    }
}

export default SinglePost;