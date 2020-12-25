import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faTimes, faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import {Consumer} from '../context';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Contact extends Component {
  state={
    showContactInfo: false
  };

   onShowClick= (e) => {
    this.setState((state)=>{
      return{
      showContactInfo: !state.showContactInfo
      }
    })
  }

  onDeleteIcon= async (id, dispatch) => {
    try{
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
       dispatch({type: 'DELETE_CONTACT', payload: id})  
    }
    catch(e){
      dispatch({type: 'DELETE_CONTACT', payload: id})  
    } 
  }

  render(){
    const {name, email, phone, id } = this.props.contact;
    const {showContactInfo}= this.state;
    return(
      <Consumer>
        {value=>{
          const {dispatch, contacts} = value;
          return(
            <div className="card card-body mb-3">
       <h4> {name}
        <FontAwesomeIcon icon={faSortDown} onClick={this.onShowClick}
       style={{cursor:'pointer'}} />
        <FontAwesomeIcon icon={faTimes} onClick={this.onDeleteIcon.bind(this, id, dispatch)}
       style={{cursor:'pointer', float:'right', color: 'red', marginRight:'10px'}} />
       <Link to={`/edit-contact/${id}`}>
       <FontAwesomeIcon icon={faPencilAlt} style={{cursor:'pointer', float:'right', marginRight:'10px'}}  />
       </Link> 
        </h4>
       {showContactInfo ? (
       <ul className="list-group">
         <li className="list-group-item">Email: {email} </li>
         <li className="list-group-item">Phone: {phone} </li>
       </ul>
        ): null }
     </div> 
          )
        }}
      </Consumer>
     
    )
  }
}

export default Contact;
