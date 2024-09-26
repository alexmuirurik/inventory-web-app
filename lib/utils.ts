import { Brand, Category, Tag } from "@prisma/client";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const toTitleCase = (slug: string) => {
	var letters = slug.split('-');
	for (var i = 0; i < letters.length; i++) {
		var word = letters[i];
		letters[i] = word.charAt(0).toUpperCase() + word.slice(1);
	}

	return letters.join(' ');
}

export const trimWords = (string: string, maxWords: number) => {
	var strippedString = string.trim();
	var array = strippedString.split(" ");
	var wordCount = array.length;
	var string = array.splice(0, maxWords).join(" ");

	if (wordCount > maxWords) {
		string += "...";
	}

	return string;
}

export const slugify = (input: string) => {
	if (!input) return '';
	var slug = input.toLowerCase().trim();
	slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
	slug = slug.replace(/[^a-z0-9\s-]/g, ' ').trim();
	slug = slug.replace(/[\s-]+/g, '-');
	return slug;
}

export const createSKU = (name: string, businessId: string, brandId: string ) => {
	const SKU = name.substring( 0, 2) + brandId.substring( 0, 2) + '-' + businessId.substring(0, 4)
	return SKU
}

export const stringToJSON = (string: string) => {
	const separateCommas = string.split(',')
	const jsonfile = separateCommas.map((string, i, separateCommas) => { return string })
	return jsonfile
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
