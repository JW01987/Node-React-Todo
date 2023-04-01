# Node-React 할 일 리스트 만들기
node.js와 react를 연습해보기 위해 제작   
로그인 기능은 기존에 만들어 둔 [보일러 플레이트](https://github.com/JW01987/NodeReact-Login)를 활용하여 제작했습니다.

## 주요 기능
- 로그인기능
- 할일 리스트

## 문제 해결
- 고차컴포넌트에서 정보 받아오기에서 많은 오류 발생 
 -해결했지만 이유를 아직도 모름, 더 공부를 해야겠다.    
- 무한 리랜더링
  - location.state 때문에 발생, useeffect에 넣어 해결. 
- 몽구스 매서드를 더 공부해야할 필요성을 느낌  
- auth api있는거 까먹고 고차컴포넌트에서 데이터 전송...
  - api호출이 나을지 컴포넌트에서 데이터를 보내는 게 나을지 고민하다 api호출하기로 함
  - 최적화, DB 호출에 대한 공부를 더 해야겠다.
- 검색기능 구현하다가 api호출이 너무 많은것 같아서 고민
  - 디바운스랑 쓰로틀링 개념을 찾아서 해결
- 검색기능 띄어쓰기를 하지 않으면 검색이 안되는 문제
  - state가 성능최적화를 위해 비동기 처리라 값저장이 늦어 useEffect로 해결함.  
- 검색기능 유저기반으로 검색이 안되서 모든 할일이 노출
  - 데이터 베이스 검색기능에 유저 정보를 넣어서 검색
  
## 배운 것
 - 클라이언트 사이드 랜더링
 - 디바운스와 쓰로틀링
 - 몽구스
 
## 아쉬운 점
- 생각보다 node보다 react에 쏟은 시간이 더 많았다. node에 더 시간을 쓰는 프로젝트를 해보고싶다.   
- 데이터 베이스를 좀 더 많이 사용하고싶다 지금은 로그인, 할일밖에 없어서 아쉬움
- mongoDB말고 SQL쪽 데이터 베이스를 연습해보고싶다. noSQL은 명령어가 덜 간결한 것을 느낌


## 느낀 점
- 큰 기반은 유지하고 mongoDB -> MySQL,   react -> vue로 바꿔서 만들어보고싶다.
- 팀 프로젝트로 간단하게 만들어 보고싶다.

## 사용한 기술
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
