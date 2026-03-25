pipeline {
    agent any

    stages {

        stage('Clone Code') {
            steps {
                git branch: 'main', credentialsId: 'cicdwebhook', url: 'https://github.com/shaliniche-code/ci-cdrepo.git'
            }
        }

       stage('Clean Old Containers & Ports') {
            steps {
                sh '''
                docker-compose down || true
                docker rm -f nodeapp || true
                docker system prune -f || true
                '''
            }
        }

        stage('Build & Run') {
            steps {
                sh 'docker-compose up --build -d'
            }
        }
    }
}
