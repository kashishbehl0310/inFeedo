import React, {Component} from 'react';
import axios from "axios";
import { Redirect } from "react-router-dom"

export class LoginForm extends Component{
    constructor(props){
        super(props);
        this.state= {
            email: '',
            password: '',
            secureInput: true,
            isButtonVisible: false,
            error: '',
            redirect: false,
            validPassword: false,
            validEmail: false, 
            formValid: false
        }
        this.onChange = this.onChange.bind(this)
        this.toggleShowPassword = this.toggleShowPassword.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleSignIn = this.handleSignIn.bind(this)
    }
    onChange(e){
        let email = e.target.value;
        const emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.setState({
            email: email
        })
        if(!this.state.validEmail){
            if(emailCheckRegex.test(email)){
                this.setState({
                    validEmail: true
                })
            } else if(!emailCheckRegex.test(email)){
                this.setState({
                    validEmail: false
                })
            }
        }
    }
    handlePasswordChange(e){
        let password = e.target.value;
 
        this.setState({
            password: password
        })
        if(!this.state.validPassword){
            if(password.length > 4){
                this.setState({
                    validPassword: true
                })
            } else if(password.length <= 4){
                this.setState({
                    validPassword: false
                })
            }
        }
    }
    handleSignIn(e){
        e.preventDefault()
        if(this.state.email == "kashish@mail.com" && this.state.validPassword){
            this.setState({
                formValid: true
            })
        } else {
            this.setState({
                formValid: false
            })
        }
    }
    toggleShowPassword(e){
        e.preventDefault()
        this.setState({
            secureInput: !this.state.secureInput
        })
    }
    render(){
        const { formValid } = this.state;
        if(formValid){
            return <Redirect to="/home" />
        }
        return(
            <div className="login-body">
                <div>
                    <div className="login-content">
                        <h1>Sign In</h1>
                        <form>
                            <fieldset>
                                <input className="formControl" type="text" name="email" value={this.state.email} onChange={this.onChange} />
                                <label className="form-placeholder" for="email" >Email</label>
                            </fieldset>
                            <fieldset>
                                <input className="formControl" type={this.state.secureInput ? 'password': 'text'} name="password" value={this.state.password} onChange={this.handlePasswordChange} />
                                <label className="form-placeholder" for="password" >Password</label>
                                {/* <button onClick={this.toggleShowPassword} > {(this.state.secureInput) ? 'Show' : 'Hide' }</button> */}
                                {
                                    this.state.isButtonVisible && <button onClick={this.toggleShowPassword} > {(this.state.secureInput) ? 'Show' : 'Hide' }</button>
                                }
                                
                            </fieldset>
                            <button className="signup-button" onClick={this.handleSignIn} >Sign In</button>
                            
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginForm;