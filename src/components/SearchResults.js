import React, { Component } from 'react';
import Post from './Post';

class SearchResults extends Component{
    render(){
        const { SearchValues, onClick} = this.props;
        const posts = SearchValues.length ?
            SearchValues.map((post, index) => {
                return(
                    <Post onClick={onClick} PostData={post} key={index} />
                )
            }) : 
            <div className="text-center">
                <h3 style={{color: "white"}} >No results found</h3>
            </div>;
            return(
                <div className="container">
                    <div className="row">
                        {posts}
                    </div>
                </div>
            )
    }
}

export default SearchResults;