pipeline{
    agent any
    tools{
        nodejs 'nodejs'
    }
    environment{
        DATABASE_USER = 'admin'
        DATABASE_PASSWORD = credentials('DATABASE_PASSWORD')
        DATABASE_HOST = credentials('DATABASE_HOST')
        DATABASE_NAME = 'trainingdb'
        DATABASE_PORT = '3306'
        REGION = 'us-east-1'
        BUCKET1 = 'trainingb1'
        ACCESS_KEY = credentials('ACCESS_KEY')
        ACCESS_SECRET = credentials('ACCESS_SECRET')
    }
    stages{
        stage('build'){
            steps{
                echo '-----------build frontend----------'
                dir('Frontend'){
                    sh 'npm install'
                    sh 'npm run ng build'
                }
            }
        }
        stage('test'){
            steps{
                echo '-----------test api-----------'
                dir('Backend'){
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }
        stage('dockerize'){
            steps{
                echo '----------dockerize backend----------'
                dir('Backend'){
                    script{
                        dockerImageB = docker.build "carlosmz87/aws-imgapp-backend"
                    }
                }
                echo '---------dockerize frontend---------'
                dir('Frontend'){
                    script{
                        dockerImageF = docker.build "carlosmz87/aws-imgapp-frontend"
                    }
                }
            }
        }
        stage('deliver-app'){
            steps{
                script{
                    echo '------------deliver app-----------'
                    docker.withRegistry('', 'Docker-hub'){
                        echo "-----------deliver backend-----------"
                        dockerImageB.push('$BUILD_NUMBER')
                        dockerImageB.push('latest')
                        echo "----------deliver frontend-----------"
                        dockerImageF.push('$BUILD_NUMBER')
                        dockerImageF.push('latest')
                    }
                }
            }
        }
    }
}