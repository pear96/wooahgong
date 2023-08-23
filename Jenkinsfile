pipeline {
    // 최상단의 agent any는 파이프라인 전체의 기본 실행자와 작업 공간을 설정합니다. 이후의 모든 스테이지는 기본으로 이 작업 공간을 사용하게 됩니다.
    // 만약 별도의 스테이지에서 agent를 재지정하지 않는다면, 해당 스테이지는 기본 작업 공간에서 실행됩니다. 
    // 따라서, 각 스테이지에서 agent none을 설정하면, 각 스테이지는 최상단에서 지정된 작업 공간에서 실행됩니다.
    agent any
    options { skipDefaultCheckout(true) }
    stages {
        stage('git pull') {
            steps {
                checkout scm
            }
        }
        stage('copy settings') {
            steps {
                sh 'cp /home/haeun/wooahgong/secrets/.env frontend/'
                sh 'cp /home/haeun/wooahgong/secrets/secret.json bigdata/'
                sh 'cp /home/haeun/wooahgong/secrets/application-*.yml backend/src/main/resources/'
            }
        }
        stage('Docker-Compose Build') {
            parallel {
                stage('Frontend Docker Image Build') {
                    steps {
                        sh 'docker-compose -f docker-compose.yml build frontend'
                    }
                }
                stage('Backend Docker Image Build') {
                    steps {
                        sh 'docker-compose -f docker-compose.yml build backend'
                    }
                }
                stage('BigData Docker Image Build') {
                    steps {
                        sh 'docker-compose -f docker-compose.yml build bigdata'
                    }
                }
            }
        }
        stage('Shutdown Previous Containers') {
            steps {
                sh 'docker-compose -f docker-compose.yml down || echo "No containers to shutdown"'
            }
        }
        stage('Docker-Compose Run') {
            parallel {
                stage('Frontend Docker Container') {
                    steps {
                        sh 'docker-compose -f docker-compose.yml up -d frontend'
                    }
                }
                stage('Backend Docker Container') {
                    steps {
                        sh 'docker-compose -f docker-compose.yml up -d backend'
                    }
                }
                stage('BigData Docker Container') {
                    steps {
                        sh 'docker-compose -f docker-compose.yml up -d bigdata'
                    }
                }
            }
        }
        stage('clear image') {
            steps {
                sh 'docker rmi $(docker images -f "dangling=true" -q) || echo "No images to delete"'
            }
        }
    }
}
