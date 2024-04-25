pipeline {
  agent any
  stages {
    stage('Checkout Code') {
      steps {
        git(url: 'https://github.com/robertvitoriano/api-biketracker', branch: 'master')
      }
    }

    stage('log file names') {
      steps {
        sh 'ls -la'
      }
    }

  }
}
