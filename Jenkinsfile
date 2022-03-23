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