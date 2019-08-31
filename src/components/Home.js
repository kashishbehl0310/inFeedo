import React, {Component} from 'react';
import Posts from './Posts';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            posts: []
        }
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
    componentDidMount(){    
       this.fetchApiData();
    }

    render(){
        const { posts } = this.state;
        return(
            <div className="Home container">
                <h1 style={{color: "white"}} >Welcome to the social App</h1>
                <Posts posts = {posts} />
            </div>  
        )
    }
}

export default Home;