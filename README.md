# 깃 저장소 모아보기

## 🔗 배포 주소

- 아래 URL을 클릭하면 배포된 페이지로 이동합니다.

https://madstone-dev.github.io/git-repos/#/?page=1

<br>

## ⚙ 개발 환경

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">

<br>

## 🕹 설치 및 시작방법

install dependencies

```
$ npm install
```

serve with hot reload at localhost:3000

```
$ npm start
```

<br>

## 📝 구현

깃 저장소를 검색 할 수 있습니다.

- 최대 4000개까지 조회 가능합니다.

![홈에서 검색](https://user-images.githubusercontent.com/50011531/162585238-851f713a-4f1a-4961-8327-8001824eeb6c.gif)

등록 된 저장소별 이슈를 조회할 수 있습니다.

- 최대 1000개까지 조회 가능합니다.

![개별 이슈](https://user-images.githubusercontent.com/50011531/162585248-d3668e04-4852-4725-a91a-d5e8d283debf.gif)


등록 된 모든 저장소의 이슈를 조회할 수 있습니다.

- 최대 1000개까지 검색 가능합니다.

![이슈 모아보기](https://user-images.githubusercontent.com/50011531/162585273-ce3c571c-3a20-4a05-a080-a6cca67af26d.gif)

<br>

## 🗂 프로젝트 구조

```
📁src
|─📁Assets
|─📁Components
│  | DesktopNav.js
│  | DesktopSearchForm.js
│  | IssueTitle.js
│  | Layout.js
│  | Loader.js
│  | MobileNav.js
│  | MovileSearchForm.js
│  └─Paginator.js
│
├─📁ContextProviders
│  └─ReposProvider.js
│
├─📁Pages
│  | Home.js
│  | Isuue.js
│  └─Search.js
│
├─📁Utils
│  | paginationUtils.js
│  | tailwindUtils.js
│  └─utils.js
│
│─App.js
│─contances.js
│─index.css
└─index.js
```
