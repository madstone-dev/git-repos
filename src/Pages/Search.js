import Layout from "../Components/Layout";
import { useLocation } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import Loader from "../Components/Loader";
import { parseQueryString } from "../Utils/paginationUtils";
import Paginator from "../Components/Paginator";
import { ReposContext } from "../ContextProviders/ReposProvider";
import { numberFormat } from "../Utils/utils";
import { classNames } from "../Utils/tailwindUtils";

export default function Search() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [repos, setRepos] = useState([]);
  const { addRepo, getRepos } = useContext(ReposContext);
  const PER_PAGE = 30;

  const markString = useCallback((text, keyword) => {
    if (!text) return;
    const words = text.split(new RegExp(`(${keyword})`, "gi"));
    return (
      <>
        {words.map((word, index) =>
          word.toLowerCase() === keyword.toLowerCase() ? (
            <mark key={index}>{word}</mark>
          ) : (
            word
          )
        )}
      </>
    );
  }, []);

  const checkExistsRepo = useCallback(
    (target) => {
      const repos = getRepos();
      for (const repo of repos) {
        if (target.id === repo.id) return true;
      }
      return false;
    },
    [getRepos]
  );

  useEffect(() => {
    const queries = parseQueryString(location.search);
    if (!queries.q || !queries.page) {
      return;
    }
    setLoading(true);
    const keyword = decodeURI(queries.q);
    const api = `https://api.github.com/search/repositories?q=${keyword}&page=${queries.page}`;
    fetch(api, {
      headers: {
        Authorization: "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",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTotalResults(data.total_count > 1000 ? 1000 : data.total_count);
        setKeyword(keyword);
        setTotalPage(
          Math.ceil(
            data.total_count > 1000
              ? 1000 / PER_PAGE
              : data.total_count / PER_PAGE
          )
        );
        setRepos(data.items);
        setLoading(false);
      });
  }, [location.search]);

  if (loading)
    return (
      <Layout>
        <Loader />
      </Layout>
    );

  return (
    <Layout>
      <div className="bg-white min-w-0 flex-1 flex flex-col">
        <div className="pl-4 pr-6 pt-4 pb-4 border-b border-t border-gray-200 sm:pl-6 lg:pl-8 xl:pl-6 xl:pt-6 xl:border-t-0">
          <div className="flex items-center">
            <h1 className="flex-1 text-lg font-medium">
              "{keyword}" 검색 결과 ({numberFormat(totalResults)})
            </h1>
          </div>
        </div>
        {repos.length === 0 && (
          <div className="flex-1 justify-center items-center flex text-bold text-gray-400 text-xl">
            <span>검색 결과가 없습니다.</span>
          </div>
        )}
        <ul className="relative z-0 divide-y divide-gray-200 border-b border-gray-200">
          {repos.map((repo) => (
            <li
              key={repo.id}
              className="relative pl-4 pr-6 py-5 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6"
            >
              <div className="flex items-center justify-between space-x-4">
                {/* Repo name and link */}
                <div className="min-w-0 space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="block">
                      <h2 className="text-base font-medium">
                        <div className="relative group flex items-start space-x-2.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="flex-shrink-0 w-5 h-5 mt-1 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                          <div className="flex space-y-1 flex-col">
                            <div>
                              <a
                                href={repo.url}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:underline text-sky-500"
                              >
                                <span className="breack-all">
                                  {markString(repo.full_name, keyword)}
                                </span>
                              </a>
                            </div>
                            <div>
                              <span className="text-gray-500 font-medium">
                                {markString(repo.description, keyword)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </h2>
                    </span>
                  </div>
                </div>
                <div className="flex flex-col flex-shrink-0 items-end space-y-3">
                  <p className="flex items-center space-x-4">
                    <button
                      type="button"
                      className={classNames(
                        checkExistsRepo(repo) && "bg-gray-50",
                        "inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      )}
                      onClick={() => {
                        addRepo(repo);
                      }}
                    >
                      {checkExistsRepo(repo) ? "추가됨" : "+ 추가"}
                    </button>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {totalPage > 1 && (
          <div>
            <Paginator lastPage={totalPage} />
          </div>
        )}
      </div>
    </Layout>
  );
}
