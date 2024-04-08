import { ChangeEvent } from "react"

type InputProps = {
    label: string,
    placeholder: string,
    type: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const InputBox = ({ label, placeholder, type, onChange }: InputProps) => {
    return (
        <div className="flex flex-col justify-start items-start w-full space-y-2 font-semibold text-[0.95em]">
            <label htmlFor={label} className="rounded-sm">{label}</label>
            <input type={type} placeholder={placeholder} name={label} id={label}
                onChange={onChange}
                className="rounded-md outline-none border p-1.5 w-full placeholder:text-sm placeholder:pl-1" />
        </div>
    )
}

export default InputBox
