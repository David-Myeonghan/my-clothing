import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

import HomePage from "./pages/hompage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils"; // store the state of user info in App state
import { setCurrentUser } from "./redux/user/user.action";

class App extends React.Component {
	unsubscribeFromAuth = null;

	componentDidMount() {
		const { setCurrentUser } = this.props;
		// open Subscription
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				userRef.onSnapshot((snapShot) => {
					setCurrentUser(
						{
							currentUser: {
								id: snapShot.id,
								...snapShot.data(),
							},
						}
						// ,
						// () => { // To see the result, as this is async.
						// 	console.log(this.state);
						// }
					);
					// console.log(this.state);
				});
			} else {
				setCurrentUser(userAuth);
			}
		});
	}

	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		return (
			<div>
				<Header />
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/shop" component={ShopPage} />
					<Route path="/signin" component={SignInSignUpPage} />
				</Switch>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
