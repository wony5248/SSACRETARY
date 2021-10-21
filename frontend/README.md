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

## Available Scripts

In the project directory, you can run:

### `yarn start` or `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test` or `npm run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build` or `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject` or `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

