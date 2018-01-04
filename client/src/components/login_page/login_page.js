import React, {Component} from 'react';
import './login_page.css';

export default class LoginPage extends Component{
    
    constructor(props){
        super(props);

        this.state={
            form:{
                username: '',
                password: ''
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleInputChange(e){
        const {name, value} = e.target;
        const {form} = this.state;
        form[name] = value;
        this.setState({form: {...form}});
    }

    handleSubmit(e){
        console.log('inside handleSubmit');
        e.preventDefault();
        this.setState({
            form:{
                username:'',
                password:''
            }
        })
    }

    render(){

        const {username, password} = this.state.form;

        return(
            <div>
                <header>
                    <h1 className='title'>Pet to Vet</h1>
                </header>
                <div className='logoContainer'>
                    <div className='logo'></div>
                </div>
                <form id='form-container' className='col-xs-10 col-xs-offset-1' onSubmit={(e)=>this.handleSubmit(e)}>
                    <div className='form-group'>
                        <label>User Name</label>
                        <input className='userName form-control input-lg' type='text' placeholder="Username" onChange={e=>this.handleInputChange(e)}  name='username' value={username}/>
                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <input className='password form-control input-lg' type='password' placeholder="Password" onChange={e=>this.handleInputChange(e)}  name='password' value={password}/>
                    </div>
                    <div className='buttonContainer'>
                        <button className='btn btn-primary'>Login</button>
                    </div>
                    <br/>
                        <div id="register">New User?
                            <a href="http://##">Register.</a>
                        </div>

                </form>
            </div>
        )
    }
}

// onclick="verifyLogin()"