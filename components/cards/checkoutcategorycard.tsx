'use client'
import React, { useState } from 'react'

export interface Category {
    title: string
}

export const categories = [
    {
        title: 'All Categories',
    },
    {
        title: 'Computers',
    },
    {
        title: 'Utensils',
    },
    {
        title: 'Windows',
    },
]

export const CategoryCard = ({ category }: { category: Category }) => {
    const [active, setActive] = useState(false)
    return (
        <div
            className={`${
                active && 'active'
            } hover:bg-teal-200 [&.active]:bg-teal-200 border text-center text-xs py-2 px-3 cursor-pointer`}
            onClick={() => setActive(!active)}
        >
            {category.title}
        </div>
    )
}

const Checkoutcategorycard = () => {
    return (
        <div className="flex items-center gap-2 flex-nowrap">
            {categories.map((category) => (
                <CategoryCard category={category} />
            ))}
        </div>
    )
}

export default Checkoutcategorycard
