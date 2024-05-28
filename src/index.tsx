import { Route, Router } from '@solidjs/router';
import { lazy } from 'solid-js';
import { render } from 'solid-js/web';

import '@fontsource/nunito';
import { ColorModeProvider, ColorModeScript, createLocalStorageManager } from '@kobalte/core';

import App from '@/App';
import CartProvider from '@/context/cart-context';

import '@/index.css';

const Home = lazy(() => import('@/routes/Home'));
const About = lazy(() => import('@/routes/About'));
const Product = lazy(() => import('@/routes/Product'));

const storageManager = createLocalStorageManager('vite-ui-theme');

render(
	() => (
		<>
			<ColorModeScript storageType={storageManager.type} />
			<ColorModeProvider storageManager={storageManager}>
				<CartProvider>
					<Router root={App}>
						<Route path='/' component={Home} />
						<Route path='/about' component={About} />
						<Route path='/product/:id' component={Product} />
					</Router>
				</CartProvider>
			</ColorModeProvider>
		</>
	),
	document.getElementById('root')!,
);
