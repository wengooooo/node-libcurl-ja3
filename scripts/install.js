const { spawnSync } = require('node:child_process')
const { join } = require('node:path')

function runNodePreGyp(cmd) {
  const script = join(
    __dirname,
    '..',
    'node_modules',
    '@mapbox',
    'node-pre-gyp',
    'bin',
    'node-pre-gyp',
  )
  return spawnSync(process.execPath, [script, cmd], {
    stdio: 'inherit',
    env: process.env,
  })
}

function run() {
  if (process.platform === 'win32') {
    let r = runNodePreGyp('install')
    if (r.status !== 0) {
      r = runNodePreGyp('rebuild')
      if (r.status !== 0) process.exit(r.status || 1)
    }
    process.exit(0)
  } else {
    const r = spawnSync('bash', [join(__dirname, 'install.sh')], {
      stdio: 'inherit',
      env: process.env,
    })
    process.exit(r.status || 0)
  }
}

run()
