import { Context, type ParentComponent, createContext, useContext } from 'solid-js';
import { type SetStoreFunction, createStore } from 'solid-js/store';

import type { CartItem } from '@/types';

type CartContext = {
	items: CartItem[];
	setItems: SetStoreFunction<CartItem[]>;
};

const CartContext = createContext<CartContext>();

export const useCart = (): CartContext => {
	return useContext(CartContext)!;
};

const CartProvider: ParentComponent = (props) => {
	const [items, setItems] = createStore<CartItem[]>([]);

	return <CartContext.Provider value={{ items, setItems }}>{props.children}</CartContext.Provider>;
};

export default CartProvider;
