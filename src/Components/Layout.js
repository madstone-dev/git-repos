import React, { useContext, useEffect, useState } from "react";
import { MenuAlt1Icon, LightningBoltIcon } from "@heroicons/react/outline";
import gitLogo from "../Assets/GitHub-Mark-64px.png";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import DesktopSearchForm from "./DesktopSearchForm";
import MobileSearchForm from "./MobileSearchForm";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { parseQueryString } from "../Utils/paginationUtils";
import { ReposContext } from "../ContextProviders/ReposProvider";

const navs = [
  {
    name: "전체 이슈",
    href: "/?page=1",
    icon: LightningBoltIcon,
  },
];

const MemoDesktopNav = React.memo(({ navs, repos }) => (
  <DesktopNav navs={navs} repos={repos} />
));

const MemoMobileNav = React.memo(
  ({ sidebarOpen, setSidebarOpen, navs, repos }) => (
    <MobileNav
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      navs={navs}
      repos={repos}
    />
  )
);

const MemoMain = React.memo(({ children }) => (
  <main className="flex-1 flex flex-col">{children}</main>
));

export default function Layout({ children }) {
  const { repos } = useContext(ReposContext);
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const onChangeKeyword = (event) => {
    setKeyword(event.target.value);
  };

  const onSubmitSearch = (event) => {
    event.preventDefault();
    navigate(`/search?q=${keyword}&page=1`);
  };

  useEffect(() => {
    const queries = parseQueryString(location.search);
    if (queries.q) {
      setKeyword(decodeURI(queries.q));
    }
  }, [location.search]);

  return (
    <div className="min-h-full">
      <MemoMobileNav
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        navs={navs}
        repos={repos}
      />
      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:pt-5 lg:pb-4 lg:bg-gray-100">
        <Link to="/">
          <div className="flex items-center flex-shrink-0 px-6 space-x-4">
            <img className="h-8 w-auto" src={gitLogo} alt="Workflow" />
            <span className="font-semibold">Git Repos</span>
          </div>
        </Link>
        <div className="mt-6 h-0 flex-1 flex flex-col overflow-y-auto">
          <DesktopSearchForm
            value={keyword}
            onChange={onChangeKeyword}
            onSubmit={onSubmitSearch}
          />
          <MemoDesktopNav navs={navs} repos={repos} />
        </div>
      </div>
      {/* Main column */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Mobile Search header */}
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex-1 flex">
              <MobileSearchForm
                value={keyword}
                onChange={onChangeKeyword}
                onSubmit={onSubmitSearch}
              />
            </div>
          </div>
        </div>
        <MemoMain children={children} />
      </div>
    </div>
  );
}
