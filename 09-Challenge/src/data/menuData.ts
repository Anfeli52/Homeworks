import { NaryNode } from '../utils/NaryNode';

export const root = new NaryNode({
	id: 'root',
	title: 'Menu',
	link: '/menu',
	children: [
		new NaryNode({
			id: 'inicio',
			title: 'Inicio',
			link: '/',
		}),
		new NaryNode({
			id: 'cartelera',
			title: 'Cartelera',
			link: '/cartelera',
			children: [
				new NaryNode({
					id: 'generos',
					title: 'Géneros',
					link: '/cartelera/generos',
					children: [
						new NaryNode({
							id: 'accion',
							title: 'Acción',
							link: '/cartelera/accion',
						}),
						new NaryNode({
							id: 'terror',
							title: 'Terror',
							link: '/cartelera/terror',
						}),
						new NaryNode({
							id: 'animacion',
							title: 'Animación',
							link: '/cartelera/animacion',
						}),
					],
				}),
				new NaryNode({
					id: 'estrenos',
					title: 'Estrenos de la Semana',
					link: '/estrenos',
				}),
				new NaryNode({
					id: 'preventas',
					title: 'Preventas',
					link: '/preventas',
				}),
			],
		}),
		new NaryNode({
			id: 'dulceria',
			title: 'Dulcería',
			link: '/dulceria',
			children: [
				new NaryNode({
					id: 'combos',
					title: 'Combos',
					link: '/dulceria/combos',
				}),
				new NaryNode({
					id: 'snacks',
					title: 'Snacks',
					link: '/dulceria/snacks',
				}),
			],
		}),
		new NaryNode({
			id: 'beneficios',
			title: 'Beneficios',
			link: '/promociones',
			children: [
				new NaryNode({
					id: 'club',
					title: 'Socio El Telón',
					link: '/club',
				}),
				new NaryNode({
					id: 'bancos',
					title: '2x1 con Bancos',
					link: '/promos/bancos',
				}),
			],
		}),
	],
});
