import { A } from '@solidjs/router';
import { For, Show } from 'solid-js';

import ModeToggle from '@/components/mode-toggle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { showToast } from '@/components/ui/toast';
import { useCart } from '@/context/cart-context';
import { Minus, Plus, ShoppingCart, X } from 'lucide-solid';

import type { CartItem } from '@/types';

const Header = () => {
	const { items, setItems } = useCart();
	let cartButton!: HTMLButtonElement;

	const increaseQuantity = (item: CartItem) => {
		setItems((p) => p.id === item.id, { ...item, quantity: item.quantity + 1 });
	};

	const decreaseQuantity = (item: CartItem) => {
		setItems((p) => p.id === item.id && item.quantity > 1, { ...item, quantity: item.quantity - 1 });
	};

	const removeItem = (item: CartItem) => {
		setItems((p) => p.filter((i) => i.id !== item.id));
	};

	const buyProducts = () => {
		setItems([]);
		cartButton.click();
		showToast({
			title: 'Thank you for your purchase!',
		});
	};

	return (
		<header class='container flex items-center py-6 text-white'>
			<A class='font-bold text-4xl uppercase' href='/'>
				Solid Store
			</A>
			<div class='ml-auto flex items-center gap-10'>
				<ModeToggle />
				<Sheet>
					<SheetTrigger class='relative' ref={cartButton} as={Button} size='icon' variant='ghost'>
						<ShoppingCart />
						<Show when={items.length}>
							<Badge variant='secondary' class='-right-4 pointer-events-none absolute top-0 text-red-500' round>
								{items.length}
							</Badge>
						</Show>
					</SheetTrigger>
					<SheetContent class='grid grid-rows-[1fr_min-content] overflow-y-auto' position='right'>
						<SheetHeader>
							<SheetTitle>Cart</SheetTitle>
							<SheetDescription class='grid gap-3'>
								<Show when={items.length} fallback={<p>Cart is empty</p>}>
									<For each={items}>
										{(item) => (
											<Card class='relative grid grid-cols-[max-content_1fr]'>
												<CardHeader>
													<img class='size-14' src={item.images[0]} alt={item.title} />
												</CardHeader>
												<CardContent class='p-6'>
													<CardTitle class='mb-2 text-balance'>
														<div class='mb-1'>{item.title}</div>
														<div class='font-normal'>
															Quantity: <span class='font-normal text-base'>{item.quantity}</span>
														</div>

														<Button
															class='absolute top-2 right-2 size-8 text-primary hover:text-primary'
															variant='ghost'
															onClick={() => removeItem(item)}
															size='icon'
														>
															<X />
														</Button>
													</CardTitle>
													<CardDescription class='flex items-center gap-3'>
														<Button onClick={() => decreaseQuantity(item)} class='size-8' size='icon'>
															<Minus />
														</Button>
														<span class='text-lg'>{(item.price * item.quantity).toFixed(2)}$</span>
														<Button onClick={() => increaseQuantity(item)} class='size-8' size='icon'>
															<Plus />
														</Button>
													</CardDescription>
												</CardContent>
											</Card>
										)}
									</For>
								</Show>
							</SheetDescription>
						</SheetHeader>
						<SheetFooter>
							<Show when={items.length}>
								<Button onClick={buyProducts} class='w-full font-bold text-lg' size='lg'>
									Buy
								</Button>
							</Show>
						</SheetFooter>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
};

export default Header;
