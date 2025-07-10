import React from 'react'

interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
	label: string
	id: string
	error?: string
	as?: 'input' | 'textarea'
}

const Input: React.FC<InputProps> = ({
	label,
	id,
	error,
	as = 'input',
	className = '',
	...props
}) => {
	const baseStyles =
		'mt-1 block w-[300px] px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'

	const Component = as

	return (
		<div>
			<label htmlFor={id} className='block text-sm font-medium text-gray-700'>
				{label}
			</label>
			<Component
				id={id}
				name={id}
				className={`${baseStyles} ${className}`}
				{...props}
			/>
			{error && <p className='text-red-500 text-xs mt-1'>{error}</p>}
		</div>
	)
}

export default Input
