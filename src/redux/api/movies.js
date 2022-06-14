const movies = [
	{
		id: "1",
		title: "Oceans 8",
		category: "Heist",
		likes: 4,
		dislikes: 1
	}, {
		id: "2",
		title: "Midnight Sun",
		category: "Drama",
		likes: 2,
		dislikes: 0
	}, {
		id: "3",
		title: "Les indestructibles 2",
		category: "Animation",
		likes: 3,
		dislikes: 1
	}, {
		id: "4",
		title: "Sans un bruit",
		category: "Murder",
		likes: 6,
		dislikes: 6
	}, {
		id: "5",
		title: "Creed II",
		category: "Boxing",
		likes: 16,
		dislikes: 2
	}, {
		id: "6",
		title: "Pulp Fiction",
		category: "Classic",
		likes: 11,
		dislikes: 3
	}, {
		id: "7",
		title: "Django Unchained",
		category: "Tarentino",
		likes: 12333,
		dislikes: 32
	}, {
		id: "8",
		title: "Seven",
		category: "Number",
		likes: 2,
		dislikes: 1
	}, {
		id: "9",
		title: "Inception",
		category: "Thriller",
		likes: 2,
		dislikes: 1
	}, {
		id: "10",
		title: "Gone Girl",
		category: "Horror",
		likes: 22,
		dislikes: 12
	},
	{
		id: "11",
		title: "Moonwalking my life",
		category: "Documentary",
		likes: 22,
		dislikes: 12
	},
	{
		id: "12",
		title: "H2G2",
		category: "Sci-fi",
		likes: 22,
		dislikes: 12
	},
	{
		id: "13",
		title: "Harry Potter",
		category: "Magical",
		likes: 22,
		dislikes: 12
	},
	{
		id: "14",
		title: "Las Vegas Parano",
		category: "Noir",
		likes: 22,
		dislikes: 12
	},
	{
		id: "15",
		title: "Dracula",
		category: "Horror",
		likes: 22,
		dislikes: 12
	}
];

const movies$ = new Promise((resolve) => setTimeout(resolve, 1000, {data: movies}));

export default movies$;
