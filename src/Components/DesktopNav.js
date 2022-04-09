import { Link, useLocation } from "react-router-dom";
import { bgList } from "../constances";
import { classNames } from "../Utils/tailwindUtils";

export default function DesktopNav({ navs, repos }) {
  const location = useLocation();

  return (
    <nav className="px-3 mt-6">
      <div className="space-y-1">
        {navs.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className={classNames(
              location.pathname === item.href
                ? "bg-gray-200 text-gray-900"
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
              "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            )}
            aria-current={location.pathname === item.href ? "page" : undefined}
          >
            <item.icon
              className={classNames(
                location.pathname === item.href
                  ? "text-gray-500"
                  : "text-gray-400 group-hover:text-gray-500",
                "mr-3 flex-shrink-0 h-6 w-6"
              )}
              aria-hidden="true"
            />
            {item.name}
          </Link>
        ))}
      </div>
      <div className="mt-8">
        {/* Secondary navigation */}
        <h3
          className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
          id="desktop-teams-headline"
        >
          저장소 목록
        </h3>
        <div
          className="mt-1 space-y-1"
          role="group"
          aria-labelledby="desktop-teams-headline"
        >
          {repos.map((repo, index) => (
            <Link
              key={index}
              to={`/issue?repo=${index}&page=1`}
              className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50"
              title={repo.full_name}
            >
              <span
                className={classNames(
                  bgList[index],
                  "w-2.5 h-2.5 mr-4 rounded-full"
                )}
                aria-hidden="true"
              />
              <span className="truncate">{repo.full_name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
