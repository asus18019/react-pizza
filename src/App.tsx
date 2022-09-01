import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './scss/app.scss';
import Header from './components/Header';

const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Cart = lazy(() => import('./pages/Cart'));

const App = () => {
	return (
		<div className="wrapper">
			<Header/>
			<div className="content">
				<Suspense fallback={ <div>loading...</div> }>
					<Routes>
						<Route path="/" element={ <Home/> }/>
						<Route path="/cart" element={ <Cart/> }/>
						<Route path="*" element={ <NotFound/> }/>
					</Routes>
				</Suspense>
			</div>
		</div>
	);
};

export default App;
