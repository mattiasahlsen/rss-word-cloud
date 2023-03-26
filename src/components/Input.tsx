import classNames from 'classnames'

interface InputProps {
  type: string
  placeholder: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}
export default function Input({
  type,
  placeholder,
  label,
  value,
  onChange,
  className,
}: InputProps) {
  return (
    <>
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={classNames(
          'mt-1 p-1 block bg-white outline-none shadow-inner',
          className
        )}
      />
    </>
  )
}
