import Layout from "../Components/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Loader from "../Components/Loader";
import { parseQueryString } from "../Utils/paginationUtils";
import Paginator from "../Components/Paginator";
import { ReposContext } from "../ContextProviders/ReposProvider";
import { classNames } from "../Utils/tailwindUtils";
import { bgList } from "../constances";

export default function Issue() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  const [issues, setIssues] = useState([]);
  const [totalIssues, setTotalIssues] = useState(0);
  const { getRepos } = useContext(ReposContext);
  const PER_PAGE = 10;

  useEffect(() => {
    const queries = parseQueryString(location.search);
    if (!queries.page) {
      navigate("/?page=1");
      return;
    }
    setLoading(true);
    const repos = getRepos();
    let issuesCount = 0;
    let maxIssuesCount = 0;
    repos.forEach((repo) => {
      if (repo.open_issues_count > maxIssuesCount) {
        maxIssuesCount = repo.open_issues_count;
      }
      issuesCount += repo.open_issues_count;
    });
    setTotalIssues(issuesCount);
    setTotalPage(
      Math.ceil(
        maxIssuesCount > 1000 ? 1000 / PER_PAGE : maxIssuesCount / PER_PAGE
      )
    );

    const fetchIssues = async (repo) => {
      const api = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/issues?&per_page=${PER_PAGE}&page=${queries.page}`;
      const res = await fetch(api, {
        headers: {
          Authorization: process.env.REACT_APP_GIT_TOKEN,
        },
      });
      return await res.json();
    };

    const mergeIssues = async () => {
      let newIssues = [];
      for (let i = 0; i < repos.length; i++) {
        const issues = await fetchIssues(repos[i]);
        newIssues = [
          ...newIssues,
          ...issues.map((issue) => {
            return {
              ...issue,
              repo_index: i,
              repo_name: repos[i].name,
            };
          }),
        ];
      }
      setIssues(newIssues);
      setLoading(false);
    };
    mergeIssues();
  }, [location.search, getRepos, navigate]);

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
              전체 이슈 ({totalIssues})
            </h1>
          </div>
        </div>

        {issues.length === 0 && (
          <div className="flex-1 justify-center items-center flex text-bold text-gray-400 text-xl">
            <span>열려있는 이슈가 없습니다.</span>
          </div>
        )}
        <ul className="relative z-0 divide-y divide-gray-200 border-b border-gray-200">
          {issues.map((issue) => (
            <li
              key={issue.id}
              className="relative pl-4 pr-6 py-5 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6"
            >
              <div className="flex items-center justify-between space-x-4">
                <div className="min-w-0 space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="block">
                      <h2 className="text-base font-medium">
                        <div className="relative group flex items-start space-x-2.5">
                          <div className="flex flex-col flex-shrink">
                            <div>
                              <span
                                className={classNames(
                                  issue.state === "open"
                                    ? "bg-green-100"
                                    : "bg-gray-100",
                                  "inline-flex flex-shrink items-center px-2 py-0.5 rounded text-xs font-medium text-gray-800 mt-1"
                                )}
                              >
                                {issue.state}
                              </span>
                            </div>
                            {issue.pull_request && (
                              <span
                                className={
                                  "inline-flex bg-purple-100 w-fit flex-shrink items-center px-2 py-0.5 rounded text-xs font-medium text-gray-800 mt-1"
                                }
                              >
                                PR
                              </span>
                            )}
                          </div>
                          <div className="flex space-y-1 flex-col">
                            <div>
                              <a
                                href={issue.html_url}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:underline"
                              >
                                <span className="break-all">{issue.title}</span>
                              </a>
                            </div>
                            <div>
                              <span
                                className={classNames(
                                  bgList[issue.repo_index],
                                  "w-2.5 h-2.5 mr-2 rounded-full inline-block"
                                )}
                                aria-hidden="true"
                              />
                              <span className="text-gray-500 font-medium text-sm">
                                {issue.repo_name} / #{issue.number} opened on by{" "}
                                {issue.user.login}
                              </span>
                            </div>
                          </div>
                        </div>
                      </h2>
                    </span>
                  </div>
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
