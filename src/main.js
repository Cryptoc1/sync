import './extensions'
import optimist from 'optimist'
import Sync from './sync'

const args = optimist
  .options('l', {
    alias: 'left',
    demand: true,
    description: 'Left side of the comparison',
    type: 'string'
  })
  .options('r', {
    alias: 'right',
    demand: true,
    description: 'Right side of the comparison',
    type: 'string'
  })
  .argv

if (args.h) {
  console.log(optimist.help())
} else {
  Sync.main(args)
}
