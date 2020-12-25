import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown} from '@fortawesome/free-solid-svg-icons';
import {Consumer} from '../context';
import { v4 as uuidv4 } from 'uuid';
import TextGroupInput from './layout/TextGroupInput';
import axios from "axios";

class AddContact extends Component{
  state={
    name: '',
    email: '',
    phone: '',
    isDropDown: true,
    errors: {}
  };

  onShowClick = () => {
    this.setState((prevState)=>{
      return{
        isDropDown: !prevState.isDropDown
      }
    })
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
    const newContact={
      name,
      email,
      phone 
    }
    const res= await axios.post('https://jsonplaceholder.typicode.com/users', newContact)
       dispatch({type:'ADD_CONTACT', payload: res.data }) 
    
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
          Add Contact <FontAwesomeIcon icon={faSortDown} onClick={this.onShowClick}
       style={{cursor:'pointer'}} /> 
        </div>
        {isDropDown ? (
        <div className="card-body  ">
          <form className="addContact" onSubmit={this.onSubmitForm.bind(this, dispatch)}>
            <TextGroupInput label="Name:" name="name" placeholder="Enter Name..." 
            onChange={this.onTyping} value={name} error={errors.name} />
            <TextGroupInput label="Email:" name="email" placeholder="Enter Email..." 
            type="email" onChange={this.onTyping} value={email} error={errors.email} />
            <TextGroupInput label="Phone:" name="phone" placeholder="Enter Phone..." 
            onChange={this.onTyping} value={phone} error={errors.phone} />
            <input type="submit" value="Add Contact" className="btn btn-primary btn-block container" style={{maxWidth: '150px', textAlign: 'center'}} />
          </form>

        </div>
        ): null}
      </div>
          )}}
      </Consumer>
      )
  }
}

export default AddContact;
