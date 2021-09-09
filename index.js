#!/usr/bin/env node
const file = process.argv[2]

const { fork } = require('child_process')
const chokidar = require('chokidar')

const watcher = chokidar.watch('./', {
	ignoreInitial: true,
})

let child = fork('./' + file)

function restartChildProcess() {
	child.kill()
	child = fork('./' + file)
}

watcher.on('all', () => {
	restartChildProcess()
})
