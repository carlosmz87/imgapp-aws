pipeline{
    agent any
    tools{
        nodejs 'nodejs'
    }
    stages{
        stage('build'){
            steps{
                echo 'build frontend'
                dir('Frontend'){
                    sh 'npm install'
                    sh 'npm run ng build'
                }
            }
        }
        stage('test'){
            steps{
                echo 'test'
            }
        }
        stage('dockerize'){
            steps{
                echo 'dockerize'
            }
        }
    }
}