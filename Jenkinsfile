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
                    dir("/frontend") {
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
            sh 'docker build -t wooahgong-front:latest .'
        }
    }
    stage('Docker run') {
        agent any
        steps {
            sh 'docker ps -f name=wooahgong-front -q | xargs --no-run-if-empty docker container stop'
            sh 'docker container ls -a -f name=wooahgong-front -q | xargs -r docker container rm'
            sh 'docker rmi $(docker images -f "dangling=true" -q)'
            sh 'docker run -d --name wooahgong-front -p 80:80 wooahgong-front:latest'
        }
    }
  }
}