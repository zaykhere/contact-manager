import React from 'react';
import classnames from 'classnames';

const TextGroupInput= (props) =>{
  const {name,type,label,placeholder, onChange,value, error} = props;
  return(
  <div className="form-group">
              <label htmlFor={name}>{label}</label>
              <input type={type} name={name} className={classnames('form-control form-contro-lg',{
                'is-invalid': error
              })}
              placeholder={placeholder} value={value}  onChange={onChange} />
              {error && <div className="invalid-feedback"> {error} </div>}
            </div>
  )
}

TextGroupInput.defaultProps = {
  type: 'text'
}

export default TextGroupInput;
