import React from 'react';
import { Link } from "react-router-dom";

class Post extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const { PostData } = this.props;
        return(
            // <div className="row">
                <div className="col-md-6 col-sm-12 col-xs-12">
                    <div className="card postCard" >
                        <div className="card-body">
                            <h5 className="card-title">{PostData.title}</h5>
                            <p className="card-text">{PostData.body}</p>
                            <Link to={`/${PostData.id}`} className="btn btn-primary readmore" style={{color: "#fff", textDecoration: "none"}}>Read More</Link>
                        </div>
                    </div>
                    {/* <p style={{color: "white"}}>{PostData.title}</p> */}
                </div>
            // </div>
        )
    }
}

export default Post;