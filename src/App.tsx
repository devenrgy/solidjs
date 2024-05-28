import type { ParentComponent } from 'solid-js';

import Header from '@/components/header';
import { Toaster } from '@/components/ui/toast';

const App: ParentComponent = (props) => {
	return (
		<div class='grid grid-rows-[min-content_1fr] gap-10'>
			<Header />
			<main>{props.children}</main>
			<Toaster class='-translate-x-1/2 left-1/2' />
		</div>
	);
};

export default App;
