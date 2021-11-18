# exec

## 특이사항

- emailjs라는 라이브러리를 사용하는데 이를 사용하려면 emailjs계정이 있어야함.
- emailjs에 관련된 정보들을 .env에 적혀있으므로 여기서 emailjs에서 발급받은 토큰값들을 대체해주면 사용가능
- 백엔드도 email을 보내기 위해 javaMail이라는 라이브러리 활용
- `backend/src/main/java/com/ssacretary/ScheduledTasks.java`에 email과 smtp 사용시 필요한 비밀번호 기재

## deploy

## frontend

1. 배포에 필요한 사전준비

```bash
npm install
```

2. 프론트 배포용 정적 파일로 변환

```bash
npm run build
```

3. nginx에 빌드된 정적 파일의 주소와 연결

### backend

1. gradle을 통하여 빌드
2. 이후 생성된 build/libs/ssacretary-0.0.1-SNAPSHOT.jar파일을 실행 java로 실행

```bash
java -jar /path/to/jar/ssacretary-0.0.1-SNAPSHOT.jar
```



