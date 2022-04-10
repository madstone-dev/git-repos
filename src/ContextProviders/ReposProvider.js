import { createContext, useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "repos";

export const ReposContext = createContext({
  repos: [],
  addRepo: () => {},
  removeRepo: () => {},
  getRepo: () => {},
  getRepos: () => {},
});

export const ReposProvider = ({ children }) => {
  const [repos, setRepos] = useState([]);

  const fetchRepo = useCallback(async (repo) => {
    const api = `https://api.github.com/repos/${repo.owner.login}/${repo.name}`;
    const res = await fetch(api, {
      headers: {
        Authorization: process.env.REACT_APP_GIT_TOKEN,
      },
    });
    return await res.json();
  }, []);

  const updateRepos = useCallback(
    async (repos) => {
      let newRepos = [];
      for (let i = 0; i < repos.length; i++) {
        const repo = await fetchRepo(repos[i]);
        newRepos = [...newRepos, repo];
      }
      setRepos(newRepos);
    },
    [fetchRepo]
  );

  useEffect(() => {
    const repos = localStorage.getItem(STORAGE_KEY);
    if (repos) updateRepos(JSON.parse(repos));
  }, [updateRepos]);

  const addRepo = (repo) => {
    const repos = localStorage.getItem(STORAGE_KEY);
    if (repos) {
      const oldRepos = JSON.parse(repos);
      for (const oldRepo of oldRepos) {
        if (oldRepo.id === repo.id) {
          alert("이미 등록된 저장소입니다.");
          return;
        }
      }
      if (oldRepos.length > 3) {
        alert("최대 등록가능한 저장소는 4개 입니다.");
        return;
      }
      const newRepos = [...oldRepos, repo];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newRepos));
      setRepos(newRepos);
    } else {
      const newRepos = [repo];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newRepos));
      setRepos(newRepos);
    }
  };

  const removeRepo = (repo) => {
    const repos = localStorage.getItem(STORAGE_KEY);
    if (repos) {
      const oldRepos = JSON.parse(repos);
      const newRepos = oldRepos.filter((oldRepo) => oldRepo.id !== repo.id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newRepos));
      setRepos(newRepos);
    }
  };

  const getRepo = (index) => {
    const repos = localStorage.getItem(STORAGE_KEY);
    if (repos) {
      const oldRepos = JSON.parse(repos);
      return oldRepos[index];
    }
  };

  const getRepos = () => {
    const repos = localStorage.getItem(STORAGE_KEY);
    if (repos) {
      return JSON.parse(repos);
    } else {
      return [];
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
