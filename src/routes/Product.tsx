import { useNavigate, useParams } from '@solidjs/router';
import { Show, createResource } from 'solid-js';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const getProduct = async (id: string) => {
	const res = await fetch(`https://dummyjson.com/products/${id}`);
	return res.json();
};

const Product = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [product] = createResource(params.id, getProduct);

	return (
		<div class='container'>
			<Show when={product()} fallback={<p>Loading...</p>}>
				<Card class='grid grid-cols-[1fr_600px] border-none bg-transparent text-lg text-white shadow-none'>
					<CardHeader class='h-[600px]'>
						<img class='mx-auto block h-full w-full object-contain' src={product().images[0]} alt={product().title} />
					</CardHeader>
					<CardContent class='space-y-5 p-6'>
						<CardTitle class='text-4xl'>{product().title}</CardTitle>
						<CardDescription class='text-lg text-white/80'>{product().description}</CardDescription>
						<p>
							Price: <span class='font-bold text-xl'>{product().price}$</span>
						</p>
						<Button variant='outline' onClick={() => navigate(-1)} class='font-bold' size='lg'>
							Back
						</Button>
					</CardContent>
				</Card>
			</Show>
		</div>
	);
};

export default Product;
