import React from 'react'
import './LoginForm.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGooglePlusG, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

const ValidEmailRegex = RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
const ValidZipCodeRegex = RegExp(/^[0-9]{5,6}$/);
const ValidPasswordRegex = RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/)

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            maskStyle: {
                left: 512,
                right: 0
            },
            showPassword: true,
            showSignupPassword: true,
            showSignupConfirmPassword: true,
            loginEmail: '',
            loginPassword: '',
            signupEmail: '',
            organizationName: '',
            signupPassword: '',
            signupConfirmPassword: '',
            addressLine: '',
            country: '',
            state: '',
            city: '',
            postalCode: '',
            errors: {
                signupConfirmPasswordErrorMsg: '',
                signupPasswordErrorMsg: '',
                signupEmailErrorMsg: '',
                signupPostalCodeErrorMsg: ''
            }
        }

        this.container = React.createRef()
        // this.signUpBtn = React.createRef()

        this.onSignIn = this.onSignIn.bind(this)
        this.onSignUp = this.onSignUp.bind(this)

    }

    componentWillUnmount() {
        clearInterval(this.interval);

    }

    onSignUp() {
        this.container.current.classList.add("right-panel-active");
    }
    onSignIn() {
        this.container.current.classList.remove("right-panel-active");
    }

    showPassword = () => {
        this.state.showPassword === false ? this.setState({ showPassword: true }) : this.setState({ showPassword: false });
    }

    showSignupPassword = () => {
        this.state.showSignupPassword === false ? this.setState({ showSignupPassword: true }) : this.setState({ showSignupPassword: false });
    }

    showSignupConfirmPassword = () => {
        this.state.showSignupConfirmPassword === false ? this.setState({ showSignupConfirmPassword: true }) : this.setState({ showSignupConfirmPassword: false });
    }

    handleChange = (event) => {
        event.preventDefault();
        const { id, value } = event.target;
        let errors = this.state.errors;
        switch (id) {
            case 'signupEmail':
                errors.signupEmailErrorMsg =
                    ValidEmailRegex.test(value)
                        ? ''
                        : 'Invalid Email';
                break;
            case 'signupPassword':
                errors.signupPasswordErrorMsg =
                    ValidPasswordRegex.test(value)
                        ? ''
                        : 'Password Should Contain atleast one uppercase letter, one lowercase letter, one digit and one special character and must be 8 to 20 characters';
                break;
            case 'signupConfirmPassword':
                errors.signupConfirmPasswordErrorMsg = this.state.signupPassword === value ? '' : 'Password and Confirm Password Should Match.'
                break;
            case 'postalCode':
                errors.signupPostalCodeErrorMsg = ValidZipCodeRegex.test(value) ? '' : 'Invalid Postal Code'
                break;
            default:
                break;
        }
        this.setState({ [id]: value });
    }

    render() {

        const { loginEmail, loginPassword, signupEmail, signupConfirmPassword, signupPassword, organizationName, country, city, state, addressLine, postalCode } = this.state;
        const isLoginEnabled = !loginEmail || !loginPassword
        const isSignupEnabled = !signupEmail || !signupPassword || !signupConfirmPassword || !organizationName || !country || !city || !state || !addressLine || !postalCode
        console.log(isSignupEnabled || this.state.postalCode.length >= 5);

        return (
            <div className="container" id="container" ref={this.container}>
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1>Create Account</h1>
                        <div className="social-container">
                            <a href="/#" className="social">
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
                            <a href="/#" className="social">
                                <FontAwesomeIcon icon={faGooglePlusG} />
                            </a>
                            <a href="/#" className="social">
                                <FontAwesomeIcon icon={faLinkedinIn} />
                            </a>
                        </div>
                        <span>or use your email for registration</span>
                        <input onChange={this.handleChange} id="signupEmail" type="email" placeholder="Email" />
                        <div style={{ textAlign: 'left', width: '100%', marginBottom: '0.5rem' }}>
                            <label className="errorMsgs">{this.state.errors.signupEmailErrorMsg}</label>
                        </div>
                        <input onChange={this.handleChange} id="organizationName" type="text" placeholder="Organization Name" />
                        <div style={{ display: 'flex', width: '100%' }}>
                            <input onChange={this.handleChange} id="signupPassword" type={this.state.showSignupPassword ? 'password' : 'text'} placeholder="Password" />
                            <FontAwesomeIcon style={{ marginTop: '1.25rem', marginLeft: '-1.75rem', cursor: 'pointer' }} onClick={this.showSignupPassword} icon={this.state.showSignupPassword ? faEyeSlash : faEye} />
                        </div>
                        <label className="errorMsgs">{this.state.errors.signupPasswordErrorMsg}</label>
                        <div style={{ display: 'flex', width: '100%' }}>
                            <input onChange={this.handleChange} id="signupConfirmPassword" type={this.state.showSignupConfirmPassword ? 'password' : 'text'} placeholder="Confirm Password" />
                            <FontAwesomeIcon style={{ marginTop: '1.25rem', marginLeft: '-1.75rem', cursor: 'pointer' }} onClick={this.showSignupConfirmPassword} icon={this.state.showSignupConfirmPassword ? faEyeSlash : faEye} />
                        </div>
                        <label className="errorMsgs">{this.state.errors.signupConfirmPasswordErrorMsg}</label>
                        <input type="text" onChange={this.handleChange} id="addressLine" placeholder="Address Line" />
                        <input type="text" onChange={this.handleChange} id="country" placeholder="Country" />
                        <input type="text" onChange={this.handleChange} id="state" placeholder="State" />
                        <input type="text" onChange={this.handleChange} id="city" placeholder="City" />
                        <input type="text" onChange={this.handleChange} id="postalCode" placeholder="Postal Code" />
                        <div style={{ textAlign: 'left', width: '100%', marginBottom: '0.5rem' }}>
                            <label className="errorMsgs">{this.state.errors.signupPostalCodeErrorMsg}</label>
                        </div>
                        <button disabled={isSignupEnabled} style={{ cursor: 'pointer' }} onClick={this.onSignUp}>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form action="#">
                        <h1>Sign in</h1>
                        <div className="social-container">
                            <a href="/#" className="social"><FontAwesomeIcon icon={faFacebook} /></a>
                            <a href="/#" className="social"><FontAwesomeIcon icon={faGooglePlusG} /></a>
                            <a href="/#" className="social"><FontAwesomeIcon icon={faLinkedinIn} /></a>
                        </div>
                        <span>or use your account</span>
                        <input id="loginEmail" type="email" placeholder="Email" onChange={this.handleChange} />
                        <div style={{ display: 'flex', width: '100%' }}>
                            <input onChange={this.handleChange} id="loginPassword" type={this.state.showPassword ? 'password' : 'text'} placeholder="Password" />
                            <FontAwesomeIcon style={{ marginTop: '1.25rem', marginLeft: '-1.75rem', cursor: 'pointer' }} onClick={this.showPassword} icon={this.state.showPassword ? faEyeSlash : faEye} />
                        </div>
                        <a href="/#">Forgot your password?</a>
                        <button disabled={isLoginEnabled} style={{ cursor: 'pointer' }} onClick={this.onSignIn}>Log In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button style={{ cursor: 'pointer' }} className="ghost" id="signIn" onClick={this.onSignIn}>Log In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>If you don't have account, Enter your personal details and start journey with us</p>
                            <button style={{ cursor: 'pointer' }} className="ghost" id="signUp" onClick={this.onSignUp}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginForm