import React, { Component } from "react";

class SinglePost extends Component{
    constructor(props){
        super(props);
        this.state = {
            post: {},
            comments: [],
            dataFetched: false,
            limit: 1
        }
        this.loadMore = this.loadMore.bind(this)
    }
    fetchComments(id){
        let url = `https://jsonplaceholder.typicode.com/posts/${id}/comments`
        console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    comments: data,
                    dataFetched: true
                })
            })
            .catch(err => console.log(err))
    }
    fetchPostData(id){
        let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
        console.log(url)
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState({
                post: data,
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
    componentDidMount(){
        const { id } = this.props.match.params;
        console.log(id)
        this.fetchPostData(id)
        this.fetchComments(id)
    }
    render(){
        const { post, comments, limit, dataFetched } = this.state;
        console.log(comments);
        return(
            (dataFetched) ? 
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">{post.title}</h4>
                                <p className="card-text">{post.body}</p>
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
                <h2 className="loading">Loading...</h2>
            </div>
        )
    }
}

export default SinglePost;