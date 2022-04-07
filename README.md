![](https://imagedelivery.net/v7-TZByhOiJbNM9RaUdzSA/e4029fc9-7599-438c-236c-07f520360200/public)

# ✨ 우리만 아는 공간 (우.아.공) ✨
* 협업 필터링을 기반으로 맞춤 포토 스팟을 추천 받고 자신만의 장소를 공유하는 SNS 서비스

## 관련문서

- ### 1. 서비스 아키텍처
- ### 2. [Figma](https://www.figma.com/file/Nw2rXU8ah506LXmxyTyLRS/%EC%9A%B0%EC%95%84%EA%B3%B5?node-id=0%3A1)
- ### 3. [api 명세서](https://haney0y.notion.site/API-eb4ac283430445a992a5be8d4675bf4a)
- ### 4. [ERD](https://www.erdcloud.com/p/mgRwsWeNbbJAFJBGu)
- ### 5. [배포문서](exec/배포문서/배포가이드.pdf)


## 만든사람🛠

- #### **홍승기**(팀장/프론트엔드) [@hongseunggi](https://github.com/hongseunggi)
- #### **박현우**(팀원/백엔드) [@qweadzs](https://github.com/qweadzs)
- #### **배하은**(팀원/백엔드) [@pear96](https://github.com/pear96)
- #### **엄희성**(팀원/프론트엔드) [@ehs0525](https://github.com/ehs0525)
- #### **주지환**(팀원/프론트엔드) [@joojeehwan](https://github.com/joojeehwan)


<hr/>

## 프로젝트 상세 설명
- ### **진행 기간**: 2022.02.21 ~ 2022.04.08
- ###  프로젝트 개요
    
    ### 1. 혹시 다른 사람의 사진을 보고 어딘지 찾아보신 적은 없으신가요??    
    ### 2. 아니면 정말 멋있는 곳을 소개받아 가봤는데 어떻게 사진을 찍어야 할지 고민한 적은 없으신가요??    
    ### 3. 혹은 다른 사람에게 정말 소개시켜주고 싶은 나만의 장소를 알고계시진 않나요?? 
    #### "우리만 아는 공간"은 위 세가지의 문제점을 해결하고자 개발하게 되었습니다. 
    "인생샷", "사진명소"는 나이불문 사람들에게 ~~~~~ 

- ### 개발 환경 및 기술 스택
<img src ="https://img.shields.io/badge/platform-Web-red"></img>
<img src ="https://img.shields.io/badge/library-React-skyblue"></img>
<img src ="https://img.shields.io/badge/framework-SpringBoot-green"></img>
<img src ="https://img.shields.io/badge/framework-FastAPI-green"></img>
<img src ="https://img.shields.io/badge/database-MariaDB-lightgrey"></img>
<img src ="https://img.shields.io/badge/server-AWS-gold"></img>
<img src ="https://img.shields.io/badge/language-Java%2C%20Python%2C%20TypeScript-blueviolet"></img>

- **BE**
    - **IDE** : IntelliJ IDEA Ultimate
    - **Framework** : Spring boot 2.6.2
    - **JDK** : 11.0.13
    - **Build** : Gradle 7.1
    - **WAS** : Tomcat
    - **Database** : MariaDB
    - **ORM** : JPA
<br/>

- **FE**
    - **IDE** : Visual Studio Code
    - **Framework/Library** : React 17.0.2, redux-toolkit, react-router-dom v6
    - **Language** : TypeScript
<br/>

- **BigData**
    - **IDE** : Visual Studio Code
    - **Framework** : Fast api 0.75.0
    - **Python** : 3.9.7
    - **ASGI** : uvicorn 0.17.6
    - **ORM** : SQLAlchemy 1.4.32
    - **Plug-in** : Numpy 1.22.3, Pandas 1.4.1, PyMySQL 1.0.2, scikit-learn 1.0.2
<br/>

- **CI/CD**
    - **Server** : AWS ec2
    - **Docker**
    - **JenKins**
<br/>

## 주요기능 설명

### 1. 장소추천 기능
<img src="https://imagedelivery.net/v7-TZByhOiJbNM9RaUdzSA/67ff4e81-4c56-4e6c-bbb9-58f169407300/public" width="230px" height="500px">
<img src="https://imagedelivery.net/v7-TZByhOiJbNM9RaUdzSA/802f01a8-46b7-45bf-fff9-29aa787a7c00/public" width="230px" height="500px">

    1. 협업 필터링을 통해 사용자 맞춤 장소를 추천해 줍니다.
    2. 또한 회원가입시 입력받는 생년월일, mbti, 관심분위기, 성별등 메타데이터를 통해 사용자와 같은 취향의 인기있는 장소 목록을 보여주고 있습니다.

### 2. 지도기능

#### 사용 API : Tmap API
<img src="https://imagedelivery.net/v7-TZByhOiJbNM9RaUdzSA/2dcadeb0-74a2-48e8-3ff5-7d001dd68b00/public" width="210px" height="480px">
<img src="https://imagedelivery.net/v7-TZByhOiJbNM9RaUdzSA/61caff8d-41ba-476b-2b23-16b397ab7400/public" width="210px" height="480px">
<img src="https://imagedelivery.net/v7-TZByhOiJbNM9RaUdzSA/9a26a8bd-d92d-4d96-198d-fce7638e1d00/public" width="210px" height="480px">
<img src="https://imagedelivery.net/v7-TZByhOiJbNM9RaUdzSA/9cdf7143-241e-4073-3899-783206bf8200/public" width="210px" height="480px">  

    1. 자신의 위치에 기반하여, 최소 500m, 최대 2.5km 까지의 등록된 장소를 보여줍니다.
    2. 마커를 클릭하면, 해당 장소의 평점과 썸네일 장소명 등 간단한 정보를 확인 할 수 있습니다.
    3. 길찾기 버튼을 클릭하면 차량, 도보를 선택 할 수 있습니다.
    4. 선택한 이동수단을 기준으로 이동거리와, 경로, 시간을 보여줍니다.

### 3. SNS 기능
<img src="https://imagedelivery.net/v7-TZByhOiJbNM9RaUdzSA/8afc3b35-3411-4cbb-88a5-59da90289e00/public" width="230px" height="500px">
<img src="https://imagedelivery.net/v7-TZByhOiJbNM9RaUdzSA/eb57f749-1a82-427d-35e0-4dcb53602e00/public" width="230px" height="500px">

    1. 다른사람에게 추천 받았거나, 추천하고 싶은 장소를 피드로 등록 할 수 있습니다. 
    2. 등록된 피드를 통해서 좋아요와 댓글을 통해 사용자간 소통이 가능합니다.
