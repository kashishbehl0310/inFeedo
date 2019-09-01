import React from 'react';
import Post from './Post';
import Search from './Search';
import axios from 'axios';
import SearchResults from './SearchResults';

class Posts extends React.Component{
    constructor(props){
        super(props);
        this.state={
            val: '',
            searchPosts: [],
            showResponse: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }
    handleChange(e){
        this.setState({
            val: e
        })
        if(e != ""){
            fetch(`https://jsonplaceholder.typicode.com/posts?title_like=${e}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    searchPosts: data,
                    showResponse: true
                })
            })
            .catch(err => console.log(err))
        }

        if(e.length == 0){
            this.setState({
                showResponse: false
            })
        }
    }
    handleDelete(id){
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(data => {
            const remainPosts = this.state.searchPosts.filter((post) => {
                if(post.id !== id) return post;
            })
    
            this.setState({
                searchPosts: remainPosts
            })
        })
        .catch(err => console.log(err))
    }
    render(){
        const { posts, onClick } = this.props;
        const { val, searchPosts, showResponse } = this.state
        return(
            <div>
                <div className="postsContainer">
                <div className="search-wrapper" >
                    <Search
                        value = {val}
                        searchPosts = {searchPosts}
                        handleChange={(e) => this.handleChange(e.target.value)}
                    />
                </div>
                {
                    showResponse ?
                        <SearchResults SearchValues={searchPosts} onClick={this.handleDelete} /> :
                        <div className="container">
                            <div className="row">
                            {
                                posts.map((post, index) => {
                                    return(
                                        <Post onClick={onClick} key={index}  PostData = {post} />
                                    )
                                })
                            }
                            </div>
                        </div>
                }
                
                
            </div>

            </div>
            
        )
    }
}

export default Posts;
