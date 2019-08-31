import React from 'react';
import Post from './Post';
import Search from './Search';
import SearchResults from './SearchResults';

class Posts extends React.Component{
    constructor(props){
        super(props);
        this.state={
            val: '',
            searchPosts: [],
            showResponse: false
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e){
        this.setState({
            val: e
        })
        if(e != ""){
            fetch(`https://jsonplaceholder.typicode.com/posts?title_like=${e}`)
            .then(res => res.json())
            .then(data => {
                console.log("fetching")
                console.log(data)
                this.setState({
                    searchPosts: data,
                    showResponse: true
                })
            })
            .catch(err => console.log(err))
        }

        if(e.length == 0){
            console.log("empty value")
            this.setState({
                showResponse: false
            })
        }
    }
    render(){
        const { posts } = this.props;
        const { val, searchPosts, showResponse } = this.state
        return(
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
                        <SearchResults SearchValues={searchPosts} /> :
                        <div className="container">
                            <div className="row">
                            {
                                posts.map((post, index) => {
                                    return(
                                        <Post key={index}  PostData = {post} />
                                    )
                                })
                            }
                            </div>
                        </div>
                }
                
                
            </div>
        )
    }
}

export default Posts;
