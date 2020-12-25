import React, {Component} from 'react';

import {Consumer} from '../context';
import { v4 as uuidv4 } from 'uuid';
import TextGroupInput from './layout/TextGroupInput';
import axios from "axios";

class EditContact extends Component{
  state={
    name: '',
    email: '',
    phone: '',
    
    errors: {}
  };

  async componentDidMount(){
    const {id} = this.props.match.params;
    const res= await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    const contact= res.data;
    this.setState({name: contact.name, email: contact.email, phone:contact.phone});
  }

  onTyping = (e) =>{
    this.setState(()=>{
      return{
        [e.target.name] : e.target.value
      }
    })
  }

  onSubmitForm= async (dispatch, e) => {
    e.preventDefault();
    const {name, email, phone} = this.state;
    //Check for errors
    if(name===''){
      this.setState({errors: {name: 'Name is required'}});
      return;
    }

    if(email===''){
      this.setState({errors: {email: 'Email is required'}});
      return;
    }

    if(phone===''){
      this.setState({errors: {phone: 'Phone is required'}});
      return;
    }

    const updContact={
      name,
      email,
      phone
    }
    const {id} = this.props.match.params;
   const res= await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updContact);
    dispatch({type:'UPDATE_CONTACT', payload: res.data});
    
    this.setState(()=>{
      return{
        name: '',
        email: '',
        phone: '',
        errors: {}
      }
    })
    this.props.history.push('/');
  }

  render(){
    const {name,email,phone, isDropDown, errors}= this.state;
      return(
      <Consumer>
        {value=>{
          const {dispatch} = value;
          return(
          <div className="card-mb-3 ">
        <div className="card-header bg-primary text-white mb-3">
          Edit Contact
        </div>
        
        <div className="card-body  ">
          <form className="addContact" onSubmit={this.onSubmitForm.bind(this, dispatch)}>
            <TextGroupInput label="Name:" name="name" placeholder="Enter Name..." 
            onChange={this.onTyping} value={name} error={errors.name} />
            <TextGroupInput label="Email:" name="email" placeholder="Enter Email..." 
            type="email" onChange={this.onTyping} value={email} error={errors.email} />
            <TextGroupInput label="Phone:" name="phone" placeholder="Enter Phone..." 
            onChange={this.onTyping} value={phone} error={errors.phone} />
            <input type="submit" value="Edit Contact" className="btn btn-primary btn-block container" style={{maxWidth: '150px', textAlign: 'center'}} />
          </form>

        </div>
       
      </div>
          )}}
      </Consumer>
      )
  }
}

export default EditContact;
