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
                sh 'cp /home/haeun/wooahgong/secrets/.env frontend/'
                sh 'cp /home/haeun/wooahgong/secrets/secret.json bigdata/'
                sh 'cp /home/haeun/wooahgong/secrets/application-*.yml backend/src/main/resources/'
            }
        }
        stage('Shutdown Previous Containers') {
            agent any
            steps {
                sh 'docker-compose -f docker-compose.yml down || echo "No containers to shutdown"'
            }
        }
        stage('Docker-Compose Build') {
            parallel {
                stage('Frontend Docker Image Build') {
                    agent any
                    steps {
                        sh 'pwd'
                        sh 'ls -al'
                        sh 'docker-compose -f docker-compose.yml build frontend'
                    }
                }
                stage('Backend Docker Image Build') {
                    agent any
                    steps {
                        sh 'pwd'
                        sh 'ls -al'
                        sh 'docker-compose -f docker-compose.yml build backend'
                    }
                }
                stage('BigData Docker Image Build') {
                    agent any
                    steps {
                        sh 'pwd'
                        sh 'ls -al'
                        sh 'docker-compose -f docker-compose.yml build bigdata'
                    }
                }
            }
        }
        stage('Docker-Compose Run') {
            parallel {
                stage('Frontend Docker Container') {
                    agent any
                    steps {
                        sh 'pwd'
                        sh 'ls -al'
                        sh 'docker-compose -f docker-compose.yml up -d frontend'
                    }
                }
                stage('Backend Docker Container') {
                    agent any
                    steps {
                        sh 'pwd'
                        sh 'ls -al'
                        sh 'docker-compose -f docker-compose.yml up -d backend'
                    }
                }
                stage('BigData Docker Container') {
                    agent any
                    steps {
                        sh 'pwd'
                        sh 'ls -al'
                        sh 'docker-compose -f docker-compose.yml up -d bigdata'
                    }
                }
            }
        }
        stage('clear image') {
            agent any
            steps {
                sh 'docker rmi $(docker images -f "dangling=true" -q) || echo "No images to delete"'
            }
        }
    }
}
