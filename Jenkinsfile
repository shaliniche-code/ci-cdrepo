pipeline {
    agent any

    stages {

        stage('Clone Code') {
            steps {
                git branch: 'main',
                credentialsId: 'cicdwebhook',
                url: 'https://github.com/shaliniche-code/ci-cdrepo.git'
            }
        }

        stage('Build Image') {
            steps {
                sh 'docker build -t projectapp:v1 .'
            }
        }

        stage('Tag Image') {
            steps {
                sh 'docker tag projectapp:v1 shalinidocker12/projectapp:v1'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                sh 'docker push shalinidocker12/projectapp:v1'
            }
        }
        
          stage('Deploy to EC2') {
              steps {
                   sh '''
                      ssh ubuntu@15.206.168.164 << 'EOF'
                      docker pull shalinidocker12/projectapp:v1
                      docker stop app || true
                      docker rm app || true
                      docker run -d -p 8000:5000 --name app shalinidocker12/projectapp:v1
                      EOF
                           '''
                    }
                }
      }
}
