import { writable } from 'svelte/store';
// import club from '$lib/data.json';

const data = await fetch('http://backend.nguyenlee.com/api/collections/club/records?sort=-created');
const data2 = await fetch('http://backend.nguyenlee.com/api/collections/club/records?sort=name');

const club = await data.json();
const club2 = await data2.json();

const clubs = writable(club.items);
const club2s = writable(club2.items);

export { clubs, club2s };
