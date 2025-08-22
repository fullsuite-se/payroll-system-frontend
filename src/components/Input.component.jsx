const Input = ({ label, error, ...props }) => {
    return (
        <div className="mb-4">
            <label className="blcok text-sm font-medium">{label}</label>
            <input
                className="w-full px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}


export default Input;