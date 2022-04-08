export default function IssueTitle({ title, onClick }) {
  return (
    <div className="border-b border-gray-200 py-4 flex items-center justify-between px-6 lg:px-8">
      <div className="flex-1 min-w-0">
        <h1 className="text-lg font-medium leading-6 text-gray-900 truncate">
          {title}
        </h1>
      </div>
      <div className="flex mt-0 ml-4">
        <button
          type="button"
          className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700 sm:order-1 sm:ml-3"
          onClick={onClick}
        >
          제거
        </button>
      </div>
    </div>
  );
}
