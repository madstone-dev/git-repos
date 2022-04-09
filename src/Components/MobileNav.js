import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { Link, useLocation } from "react-router-dom";
import gitLogo from "../Assets/GitHub-Mark-64px.png";
import { classNames } from "../Utils/tailwindUtils";
import { bgList } from "../constances";

export default function MobileNav({
  sidebarOpen,
  setSidebarOpen,
  navs,
  repos,
}) {
  const location = useLocation();

  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 flex z-40 lg:hidden"
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 flex items-center px-4 space-x-4">
              <img className="h-8 w-auto" src={gitLogo} alt="Workflow" />
              <span className="font-semibold">Git Repos</span>
            </div>
            <div className="mt-5 flex-1 h-0 overflow-y-auto">
              <nav className="px-2">
                <div className="space-y-1">
                  {navs.map((item, index) => (
                    <Link
                      key={index}
                      to={item.href}
                      className={classNames(
                        location.pathname === item.href
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                        "group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md"
                      )}
                      aria-current={
                        location.pathname === item.href ? "page" : undefined
                      }
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
                  <h3
                    className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                    id="mobile-teams-headline"
                  >
                    저장소 목록
                  </h3>
                  <div
                    className="mt-1 space-y-1"
                    role="group"
                    aria-labelledby="mobile-teams-headline"
                  >
                    {repos.map((repo, index) => (
                      <Link
                        key={index}
                        to={`/issue?repo=${index}&page=1`}
                        className="group flex items-center px-3 py-2 text-base leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                        title={repo.full_name}
                        onClick={() => {
                          setSidebarOpen(false);
                        }}
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
            </div>
          </div>
        </Transition.Child>
        <div className="flex-shrink-0 w-14" aria-hidden="true">
          {/* Dummy element to force sidebar to shrink to fit close icon */}
        </div>
      </Dialog>
    </Transition.Root>
  );
}
