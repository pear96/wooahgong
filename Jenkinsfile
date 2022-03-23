pipeline {
    agent none
    options { skipDefaultCheckout(true) }
    stages {
        stage('Build') {
        parallel{
            stage('Front Build') {
                agent {
                    docker {
                        image 'node:16.14.0-alpine'
                    }
                  }
                  options { skipDefaultCheckout(false) }
                  steps {
                    sh 'pwd'
                    dir("frontend") {
                        sh 'pwd'
                        sh 'npm install'
                        sh 'npm run build'
                    }
                  }
              }
            //   stage('Back Build') {
            //     agent {
            //       docker {
            //           image 'gradle:7.1-jdk11'
            //       }
            //     }
            //     options { skipDefaultCheckout(false) }
            //     steps {
            //       dir("/backend") {
            //           sh 'gradle clean build -x test'
            //       }
            //     }
            // }
        }
    }
    stage('Docker build') {
        agent any
        steps {
            sh 'pwd'
            dir("frontend") {
                sh 'docker build -t wooahgong-front:latest /var/jenkins_home/workspace/wooahgong/frontend'
            }
        }
    }
    stage('Docker run') {
        agent any
        steps {
          dir("frontend") {
            sh 'docker ps -f name=wooahgong-front -q | xargs --no-run-if-empty docker container stop'
            sh 'docker container ls -a -f name=wooahgong-front -q | xargs -r docker container rm'
            sh 'docker image prune -a'
            sh 'docker run -d --name wooahgong-front -p 80:80 -p 443:443 \
            -v /home/ubuntu/sslkey/:/var/jenkins_home/workspace/wooahgong/sslkey/ \
            -v /etc/localtime:/etc/localtime:ro \
            wooahgong-front:latest'
          }
        }
    }
  }
}