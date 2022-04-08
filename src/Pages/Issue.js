import Layout from "../Components/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Loader from "../Components/Loader";
import { parseQueryString } from "../Utils/paginationUtils";
import Paginator from "../Components/Paginator";
import { ReposContext } from "../ContextProviders/ReposProvider";
import { classNames } from "../Utils/tailwindUtils";
import IssueTitle from "../Components/IssueTitle";
import { numberFormat } from "../Utils/utils";

export default function Issue() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  const [repo, setRepo] = useState(null);
  const [issues, setIssues] = useState([]);
  const { getRepo, removeRepo } = useContext(ReposContext);

  useEffect(() => {
    const queries = parseQueryString(location.search);
    if (!queries.repo || !queries.page) {
      return;
    }
    const repo = getRepo(queries.repo);
    setLoading(true);
    const api = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/issues?&page=${queries.page}`;
    fetch(api, {
      headers: {
        Authorization: "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",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setRepo(repo);
        setTotalPage(Math.ceil(repo.open_issues_count / 30));
        setIssues(data);
        setLoading(false);
      });
  }, [location.search, getRepo]);

  if (loading)
    return (
      <Layout>
        <Loader />
      </Layout>
    );

  return (
    <Layout>
      <div className="bg-white min-w-0 flex-1 flex flex-col">
        <IssueTitle
          title={`${repo.owner.login}/${repo.name} (${numberFormat(
            repo.open_issues_count
          )})`}
          onClick={() => {
            removeRepo(repo);
            navigate("/?page=1");
          }}
        />
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
                                href={`https://github.com/${repo.owner.login}/${repo.name}/issues/${issue.number}`}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:underline"
                              >
                                <span>{issue.title}</span>
                              </a>
                            </div>
                            <div>
                              <span className="text-gray-500 font-medium text-sm">
                                #{issue.number} opened on by {issue.user.login}
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
