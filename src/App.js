import './App.css';
import useSignUpForm from './CustomHooks';

function App() {
  const signUp = () => {
    alert(
      `User Created:
      Name: ${inputs.firstName} ${inputs.lastName}
      email: ${inputs.email}`
    );
  }
  const {inputs, handleInputChange, handleSubmit} = useSignUpForm(signUp);

  return (
    <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="firsName">First Name</label>
      <input id="firsName" type="text" name="firstName" onChange={handleInputChange} value={inputs.firstName} required />
      <label>Last Name</label>
      <input type="text" name="lastName" onChange={handleInputChange} value={inputs.lastName} required />
    </div>
    <div>
      <label>Email Address</label>
      <input type="email" name="email" onChange={handleInputChange} value={inputs.email} required />
    </div>
    <div>
      <label>Password</label>
      <input type="password" name="password1" onChange={handleInputChange} value={inputs.password1}/>
    </div>
    <div>
      <label>Re-enter Password</label>
      <input type="password" name="password2" onChange={handleInputChange} value={inputs.password2}/>
    </div>
    <button type="submit">Sign Up</button>
  </form>
  );
}

export default App;
