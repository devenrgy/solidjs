import { A } from '@solidjs/router';
import { For, Show, createResource } from 'solid-js';

import { useCart } from '@/context/cart-context';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { showToast } from '@/components/ui/toast';
import type { CartItem } from '@/types';
import { Heart } from 'lucide-solid';

const getProducts = async () => {
	const params = new URLSearchParams({ limit: '10' });
	const res = await fetch(`https://dummyjson.com/products?${params}`);
	return res.json();
};

const Home = () => {
	const { items, setItems } = useCart();

	const [products] = createResource(getProducts);

	const addProduct = (item: CartItem) => {
		setItems((p) => [...p, { ...item, quantity: 1 }]);
		showToast({
			title: 'Added to cart',
			description: `${new Intl.DateTimeFormat('en-US', {
				hour: 'numeric',
				minute: 'numeric',
				year: 'numeric',
				month: 'numeric',
				day: 'numeric',
			}).format(new Date())}`,
			variant: 'success',
		});
	};

	const isExist = (item: CartItem) => {
		return items.some((i) => i.id === item.id);
	};

	return (
		<section class='container text-white'>
			<h1 class='mb-10 text-3xl uppercase'>Products</h1>

			<Show when={products()} fallback={<p>Loading...</p>}>
				<ul class='grid grid-cols-4 gap-x-4 gap-y-6 pt-2 pb-20'>
					<For each={products().products}>
						{(product) => (
							<li>
								<Card class='h-full'>
									<CardHeader>
										<Button
											disabled={isExist(product)}
											onClick={() => addProduct(product)}
											class='group self-end'
											variant='ghost'
											size='icon'
										>
											<Heart
												class='text-red-500 group-hover:fill-red-500'
												classList={{ 'fill-red-500': isExist(product) }}
											/>
										</Button>
									</CardHeader>
									<CardContent class='flex h-[300px] justify-center p-6'>
										<Dialog>
											<DialogTrigger>
												<img
													class='mx-auto block h-full w-full object-contain duration-300 hover:scale-110'
													src={product.images[0]}
													alt={product.title}
												/>
											</DialogTrigger>
											<DialogContent class='flex size-[500px]'>
												<DialogHeader class='size-full'>
													<DialogTitle>{product.title}</DialogTitle>
													<DialogDescription class='size-full'>
														<img
															class='mx-auto block size-full object-contain'
															src={product.images[0]}
															alt={product.title}
														/>
													</DialogDescription>
												</DialogHeader>
											</DialogContent>
										</Dialog>
									</CardContent>
									<CardFooter class='flex-col justify-center gap-5'>
										<CardTitle>{product.title}</CardTitle>
										<A class='w-2/3' href={`product/${product.id}`}>
											<Button variant='outline' class='w-full font-bold' size='lg'>
												More
											</Button>
										</A>
									</CardFooter>
								</Card>
							</li>
						)}
					</For>
				</ul>
			</Show>
		</section>
	);
};

export default Home;
