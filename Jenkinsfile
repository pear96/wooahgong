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