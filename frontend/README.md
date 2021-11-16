# Directory Structure
```
├── public/
│   
├── src/
│   ├── assets                  // 이미지, 로고 파일 저장 디렉토리
│   ├── components              // 컴포넌트 디렉토리
│       ├── Atag                  // 예시로 만든 A tag
│   └── pages            // 라우터에 연결될 페이지 디렉토리
│       ├── Changecrawl           // 크롤링 세팅 변경 
│       ├── Logprofile            // 크롤링 로그 보여주는 
│       ├── Makecrawl             // 크롤링 세팅 만드는
│       ├── Settingprofile        // 크롤링 세팅 조회
│       ├── Signin                // 로그인 
│       ├── Signup                // 회원가입
│       ├── Specificcrawling      // 크롤링 결과 조회
│       └── Userprofile           // 사용자 프로필
│   ├── store               // redux용 디렉토리  
└── └── utils               // axios 디렉토리
```

## Scripts

### `npm install`

현재 프로젝트에 필요한 모듈들을 다운로드 받습니다. 아래의 스크립트들을 실행하기 위해 선행되어야 합니다.

### `yarn start` or `npm start`

현재 프로젝트를 실행시킵니다. http://localhost:3000 에 접속해서 확인할 수 있습니다.

### `yarn build` or `npm run build`

현재 프로젝트를 배포용 정적파일로 변환시킵니다. 
