import React, { Component } from 'react';

class Search extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const {
            value,
            searchPosts,
            handleChange
        } = this.props;
        return(
            <React.Fragment  >
                <input 
                    className="search-input" 
                    placeholder="Search for title "
                    onChange={handleChange}
                />
            </React.Fragment>
        )
    }
}

export default Search;