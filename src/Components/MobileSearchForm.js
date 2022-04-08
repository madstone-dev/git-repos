import { SearchIcon } from "@heroicons/react/solid";

export default function MobileSearchForm({
  value,
  onChange,
  onSubmit = (event) => {
    event.preventDefault();
  },
}) {
  return (
    <form className="w-full flex md:ml-0" onSubmit={onSubmit}>
      <label htmlFor="search-field" className="sr-only">
        저장소 검색
      </label>
      <div className="relative w-full text-gray-400 focus-within:text-gray-600">
        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5" aria-hidden="true" />
        </div>
        <input
          id="search-field"
          name="search-field"
          className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:text-sm"
          placeholder="저장소 검색"
          type="search"
          value={value}
          onChange={onChange}
        />
      </div>
    </form>
  );
}
