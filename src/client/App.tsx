import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './views/Home';
import AllBlogs from './views/Blogs';
import Create from './views/Create';
import BlogDetails from './views/BlogDetails';
import Edit from './views/Edit';
import Donate from './components/Donate';
import { Stripe, loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripe = loadStripe('pk_test_51N354BHiwFseldVGekkno47ALnonGrZg5klQQp92WXpjeJvPDctiKEHbxjdKtORaNdtRTKjBxttJncWRrG0Jmjae00Xk8Oogom');

const App = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<div className="container mt-5 text-bg-primary">
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/blogs' element={<AllBlogs />} />
					<Route path='/blogs/create' element={<Create />} />
					<Route path='/blogs/:id' element={<BlogDetails />} />
					<Route path='/blogs/:id/edit' element={<Edit />} />
					<Route path='/donate' element={
						<Elements stripe={stripe}>
							<Donate />
						</Elements>
					} />
				</Routes>
			</div>
		</BrowserRouter>

	)
}

export default App;