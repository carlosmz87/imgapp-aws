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
            environment{
                DATABASE_USER = 'root'
                DATABASE_PASSWORD = 'root'
                DATABASE_HOST = 'mysqldb'
                DATABASE_NAME = 'trainingdb'
                DATABASE_PORT = '3307'
                REGION = 'us-east-1'
                BUCKET1 = 'trainingb1'
                ACCESS_KEY = credentials('ACCESS_KEY')
                ACCESS_SECRET = credentials('ACCESS_SECRET')
            }
            steps{
                echo 'test api'
                dir('Backend'){
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }
        stage('dockerize'){
            steps{
                echo 'dockerize'
            }
        }
    }
}