import React, {Component} from 'react';
import Posts from './Posts';
import HeaderNav from './Navbar'
import axios from 'axios';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            isTop: true
        }
        this.handleDelete = this.handleDelete.bind(this)
    }
    fetchApiData(){
        let ApiData;
        fetch(`https://jsonplaceholder.typicode.com/posts`)
        .then(res => res.json())
        .then(data => {
           this.setState({
               posts: data
           })
            
        })
        .catch(e => {
            console.log("An error occured")
        })
        return ApiData
    }
    handleDelete(id){
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(data => {
            console.log(data)
            const remainPosts = this.state.posts.filter((post) => {
                if(post.id !== id) return post;
            })
    
            this.setState({
                posts: remainPosts
            })
        })
        .catch(err => console.log(err))
        
    }
    handleSignout(){
        this.props.history.push('/')
    }
    componentDidMount(){   
       this.fetchApiData();
       document.addEventListener('scroll', () => {
        const isTop = window.scrollY < 100;
        if(isTop != this.state.isTop){
            this.setState({
                isTop: isTop
            })
        }
    })
    }

    render(){
        const { posts } = this.state;
        
        // this.handleDelete(1);
        return(
            <div>
                <HeaderNav onClick={this.handleSignOut} isTop={this.state.isTop} />
                <div className="Home container">
                    <Posts posts = {posts} onClick={this.handleDelete} />
                </div>
            </div>
              
        )
    }
}

export default Home;