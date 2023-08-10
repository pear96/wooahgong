pipeline {
    agent none
    options { skipDefaultCheckout(true) }
    stages {
    stage('git pull') {
        agent any
        steps {
            checkout scm
        }
    }
    stage('copy settings') {
        agent any
        steps {
            sh 'cp /home/haeun/wooahgong/secrets/.env /frontend'
            sh 'cp /home/haeun/wooahgong/secrets/secret.json /bigdata'
            sh 'cp /home/haeun/wooahgong/secrets/application-*.yml /backend/src/main/resources'
        }
    }
    stage('Docker-Compose') {
        agent any
        steps {
            sh 'docker-compose up --build -d'
        }
    }
    // stage('Docker build') {
    //     parallel {
    //     // stage는 각각의 Job을 의미합니다. Job 내부의 단계를 의미하는 steps를 포함해야합니다.
    //         stage('Front image') {
    //             agent any
    //             steps {
    //                 sh 'pwd'
    //                 dir("frontend") {
    //                 // 
    //                     sh 'docker build -t wooahgong-front:latest /var/jenkins_home/workspace/wooahgong/frontend'
    //                 }
    //             }
    //         }
    //         stage('Back image') {
    //           // agent = 이 파이프라인 스크립트를 실행할 executor를 지정합니다. any로 두면 어떤 executor도 실행할 수 있다는 의미가 됩니다.
    //             agent any
    //           // steps에선 실제로 실행할 쉘이나 syntax를 입력해주면 됩니다.
    //             steps {
    //                 dir("backend") {
    //                 sh 'pwd'
    //                 sh 'echo backend 빌드를 실행합니다.'
    //                 sh 'docker build -t wooahgong-back:latest /var/jenkins_home/workspace/wooahgong/backend'
    //                 }
    //             }
    //         }
    //         stage('Bigdata image') {
    //           // agent = 이 파이프라인 스크립트를 실행할 executor를 지정합니다. any로 두면 어떤 executor도 실행할 수 있다는 의미가 됩니다.
    //             agent any
    //           // steps에선 실제로 실행할 쉘이나 syntax를 입력해주면 됩니다.
    //             steps {
    //                 dir("bigdata") {
    //                 sh 'pwd'
    //                 sh 'echo 파이썬 빌드를 실행합니다.'
    //                 sh 'docker build -t wooahgong-bigdata:latest /var/jenkins_home/workspace/wooahgong/bigdata'
    //                 }
    //             }
    //         }
    //     }
    // }
    // stage('Docker run') {
    //     parallel {
    //         stage('Front Container') {
    //             agent any
    //             steps {
    //             dir("frontend") {
    //                 sh 'docker ps -f name=wooahgong-front -q | xargs --no-run-if-empty docker container stop'
    //                 sh 'docker container ls -a -f name=wooahgong-front -q | xargs -r docker container rm'
    //                 sh 'docker run -d --name wooahgong-front -p 80:80 -p 443:443 \
    //                 -v /home/ubuntu/sslkey/:/var/jenkins_home/workspace/wooahgong/sslkey/ \
    //                 -v /etc/letsencrypt/:/etc/letsencrypt/ \
    //                 -e TZ=Asia/Seoul \
    //                 wooahgong-front:latest'
    //             }
    //             }
    //         }
    //         stage('Back Container') {
    //             agent any
    //             steps {
    //                 dir("backend"){
    //                 sh 'docker ps -f name=wooahgong-back -q | xargs --no-run-if-empty docker container stop'
    //                 sh 'docker container ls -a -f name=wooahgong-back -q | xargs -r docker container rm'
    //                 sh 'docker run -d --name wooahgong-back -p 8080:8080 \
    //                 -e TZ=Asia/Seoul \
    //                 wooahgong-back:latest'
    //             }
    //             }
    //         }
    //         stage('Bigdata Container') {
    //             agent any
    //             steps {
    //                 dir("bigdata"){
    //                 sh 'docker ps -f name=wooahgong-bigdata -q | xargs --no-run-if-empty docker container stop'
    //                 sh 'docker container ls -a -f name=wooahgong-bigdata -q | xargs -r docker container rm'
    //                 sh 'docker run -d --name wooahgong-bigdata -p 8000:8000 \
    //                 -e TZ=Asia/Seoul \
    //                 wooahgong-bigdata:latest'
    //             }
    //             }
    //         }
    //     }
    // }
    // stage('clear image') {
    //     agent any
    //     steps {
    //         sh 'docker image prune -f'
    //     }
    // }
    }
}
