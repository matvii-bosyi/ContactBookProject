import React from 'react'

interface SearchProps {
	value: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	onClear: () => void
	placeholder?: string
}

const Search: React.FC<SearchProps> = ({
	value,
	onChange,
	onClear,
	placeholder = 'Type your text'
}) => {
	return (
		<form
			className={`relative h-[40px] w-[500px] flex items-center px-3 rounded-[30px] bg-white shadow-sm hover:shadow-md focus-within:shadow-lg focus-within:rounded-[4px] transition-all duration-500 group`}
			onSubmit={e => e.preventDefault()}>
			<button type='submit' className='text-[#8b8ba7] bg-none border-none'>
				<svg
					width={17}
					height={16}
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					role='img'
					aria-labelledby='search'>
					<path
						d='M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9'
						stroke='currentColor'
						strokeWidth='1.333'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</button>

			<input
				type='text'
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				className='w-full px-[0.7em] h-full text-sm text-black bg-transparent py-[0.7em] border-none placeholder:text-gray-400 focus:outline-none'
			/>

			{value && (
				<button
					type='button'
					onClick={onClear}
					className='text-[#8b8ba7] transition-opacity duration-300 opacity-100 visible'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-6 w-6'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						strokeWidth={2}>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M6 18L18 6M6 6l12 12'
						/>
					</svg>
				</button>
			)}

			{/* Animated bottom border */}
			<span className='absolute left-0 bottom-0 w-full h-[2px] bg-[#2f2ee9] scale-x-0 origin-center transition-transform duration-300 group-focus-within:scale-x-100 rounded-sm' />
		</form>
	)
}

export default Search
