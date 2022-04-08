import { createContext, useEffect, useState } from "react";

export const ReposContext = createContext({
  repos: [],
  addRepo: () => {},
  removeRepo: () => {},
});

export const ReposProvider = ({ children }) => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const repos = localStorage.getItem("repos");
    if (repos) setRepos(JSON.parse(repos));
  }, [setRepos]);

  const addRepo = (repo) => {
    const repos = localStorage.getItem("repos");
    if (repos) {
      const oldRepos = JSON.parse(repos);
      if (oldRepos.length > 3) {
        alert("최대 등록가능한 저장소는 4개 입니다.");
        return;
      }
      for (const oldRepo of oldRepos) {
        if (oldRepo.id === repo.id) {
          alert("이미 등록된 저장소입니다.");
          return;
        }
      }
      const newRepos = [...oldRepos, repo];
      localStorage.setItem("repos", JSON.stringify(newRepos));
      setRepos(newRepos);
    } else {
      const newRepos = [repo];
      localStorage.setItem("repos", JSON.stringify(newRepos));
      setRepos(newRepos);
    }
  };

  const removeRepo = (repo) => {
    const repos = localStorage.getItem("repos");
    if (repos) {
      const oldRepos = JSON.parse(repos);
      const newRepos = oldRepos.filter((oldRepo) => oldRepo.id !== repo.id);
      localStorage.setItem("repos", JSON.stringify(newRepos));
      setRepos(newRepos);
    }
  };

  const getRepo = (index) => {
    const repos = localStorage.getItem("repos");
    if (repos) {
      const oldRepos = JSON.parse(repos);
      return oldRepos[index];
    }
  };

  const getRepos = () => {
    const repos = localStorage.getItem("repos");
    if (repos) {
      return JSON.parse(repos);
    }
  };

  return (
    <ReposContext.Provider
      value={{
        repos,
        addRepo,
        removeRepo,
        getRepo,
        getRepos,
      }}
    >
      {children}
    </ReposContext.Provider>
  );
};
