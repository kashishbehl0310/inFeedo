import React from 'react';
import { Link } from "react-router-dom";

class Post extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const { PostData, onClick } = this.props;
        return(
            // <div className="row">
                <div className="col-md-6 col-sm-12 col-xs-12">
                    <div className="card postCard" >
                        <div className="card-body">
                            <div className="container">
                                  <div className="row">
                                <div className="col-lg-10 col-xs-12 col-sm-12 title">
                                    <h5 className="card-title">{PostData.title}</h5>
                                    
                                </div>
                                <div className="col-lg-2 col-xs-12 col-sm-12" style={{padding: "0"}}>
                                    <div className="controlOptions">
                                        {/* <p onClick={() => onClick(PostData.id)} value={PostData.id} >Delete</p> */}
                                        <button className="btn deleteButton" onClick={() => onClick(PostData.id)} value={PostData.id}>
                                            <i className="material-icons icon">delete</i>
                                        </button>
                                    </div>
                                </div>
                                
                            </div>
                            </div>
                          
                            <p className="card-text">{PostData.body}</p>
                            <Link to={`/posts/${PostData.id}`} className="btn readmore" style={{color: "#fff", textDecoration: "none"}}>Read More</Link>
                        </div>
                    </div>
                    {/* <p style={{color: "white"}}>{PostData.title}</p> */}
                </div>
            // </div>
        )
    }
}

export default Post;