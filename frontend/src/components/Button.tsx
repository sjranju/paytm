type ButtonProps = {
    label: string,
    onclick: () => void
}

const Button = ({ label, onclick }: ButtonProps) => {
    return (
        <div className="w-full mt-2">
            <button type="button" onClick={onclick}
                className="bg-blue-900 text-white w-full py-2 px-6 rounded-md font-semibold text-md hover:bg-gray-800">{label}</button>
        </div>
    )
}

export default Button
