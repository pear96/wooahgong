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
    stage('Docker build') {
      parallel {
        // stage는 각각의 Job을 의미합니다. Job 내부의 단계를 의미하는 steps를 포함해야합니다.
        stage('Front image') {
          agent any
          steps {
              sh 'pwd'
              dir("frontend") {
                // 
                  sh 'docker build -t wooahgong-front:latest /var/jenkins_home/workspace/wooahgong/frontend'
              }
          }
        }
        stage('Back image') {
          // agent = 이 파이프라인 스크립트를 실행할 executor를 지정합니다. any로 두면 어떤 executor도 실행할 수 있다는 의미가 됩니다.
          agent any
          // steps에선 실제로 실행할 쉘이나 syntax를 입력해주면 됩니다.
          steps {
              sh 'pwd'
              dir("backend") {
                sh '''
                echo 'hihi'
                '''
              }
          }
        }
      }
    }
    stage('Docker run') {
      parallel {
        stage('Front Container') {
          agent any
          steps {
            dir("frontend") {
              sh 'docker ps -f name=wooahgong-front -q | xargs --no-run-if-empty docker container stop'
              sh 'docker container ls -a -f name=wooahgong-front -q | xargs -r docker container rm'
              sh 'docker image prune -f'
              sh 'docker run -d --name wooahgong-front -p 80:80 -p 443:443 \
              -v /home/ubuntu/sslkey/:/var/jenkins_home/workspace/wooahgong/sslkey/ \
              -v /etc/localtime:/etc/localtime:ro \
              wooahgong-front:latest'
            }
          }
        }
        stage('Back Container') {
          agent any
          steps {
            dir("backend"){
              sh 'echo hi'
            }
          }
        }
      }
    }
  }
}