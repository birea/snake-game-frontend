pipeline {
    agent none
    stages {
        stage('frontend') {
            agent {
                dockerfile {
                    args '-p 7000:7000 -t tron-snake-frontend'
                }
            }
            steps {
                sh 'node ./src/server.js'
            }
        }
    }
}
