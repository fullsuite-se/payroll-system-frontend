const Search = ({ query, setQuery }) => {
    return (
        <div className="flex gap-x-2">
            <input
                type="text"
                className="bg-white rounded-3xl border border-gray-500"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button
                type="button"
                className="bg-gray-300 border border-gray-400 text-white text-sm px-3 py-1 rounded-3xl cursor-pointer"
            >Search</button>
        </div>
    );
}

export default Search;