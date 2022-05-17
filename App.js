import React from "react";
// import useFormik from formik library
import {useFormik} from 'formik';

function App() {
  // add a const called formik assigned to useFormik()
  const validEmail = new RegExp(
    '^[[a-zA-Z0-9][a-zA-Z0-9._[:$!%-]+[@][a-zA-Z0-9.-]+[.][a-zA-Z]+$'
  );
 
  const formik = useFormik({
    initialValues: {
      emailField: '',
      pswField: '',
      login: 'yesLogin',
      rememberMe: false,

    },
    onSubmit: (values, onSubmitProps) => {
      console.log('Form', values);
      console.log('On Submit Props:', onSubmitProps);
      onSubmitProps.setSubmitting(false);
      onSubmitProps.resetForm();
      if(!self.validate){
      alert('Login Successful');
      }
    },
    validate: values => {
      let errors={};
      if(!values.emailField) {
        errors.emailField = 'Field Required';
      }
      else if (!validEmail.test(values.emailField)) errors.emailField ="Username should be an email";
      if(!values.pswField){
        errors.pswField = 'Field Required';
      }
      return errors;
    }

  })
  return (
    <div>
    <h1>Log In | Register</h1>
     <form onSubmit={formik.handleSubmit}>
       <select id = 'select' name='login' onChange={formik.handleChange} value = {formik.values.login}>
         <option name='login' value='yesLogin'>Login</option>
         <option name='login' value='noRegister'>Register</option>
       </select>
       <div>Email Address: </div>
       <input id = "emailField" name="emailField" type ="email" onChange={formik.handleChange} value = {formik.values.emailField}/>
        {formik.errors.emailField ? <div id = 'emailError' style={{color:'red'}}>{formik.errors.emailField}</div> : null}
       <div>Password: </div>
       <input id = "pswField" name="pswField" type ="password" onChange={formik.handleChange} value = {formik.values.pswField}/>
        {formik.errors.pswField ? <div id ='pswError' style={{color:'red'}}>{formik.errors.pswField}</div> : null}
       <div>
         <input id = "checkbox" name="rememberMe" type="checkbox" onChange={formik.handleChange} value = {formik.values.rememberMe}/>
         <label>Remember Me</label>
       </div>
       <div>
        <button type ="reset" onClick={ e => formik.resetForm()}>Reset</button>
        <button id = "submitBtn" type="Submit" disabled={formik.isSubmitting}>Submit</button>
       </div>
     </form>
    </div>
  );
}

export default App;
