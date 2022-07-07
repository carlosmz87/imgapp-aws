pipeline{
    agent any
    stages{
        stage('build'){
            steps{
                sh 'docker image ls'
            }
        }
        stage('test'){
            steps{
                sh 'aws s3 ls'
            }
        }
    }
}