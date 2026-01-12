import colors from 'ansi-colors'
import log    from 'fancy-log'
import {
    join,
    relative
}             from 'path'
import {
    getConfigurationFrom,
    packageRootDirectory,
    serializeTasksFrom,
    tasksConfigurationsDirectory
}             from '../../_utils.mjs'

const {
          green,
          blue,
          cyan
      } = colors

const taskPath                  = relative( packageRootDirectory, import.meta.filename )
const configurationPath         = join( tasksConfigurationsDirectory, 'tests', 'benchmarks', 'run-benchmarks.conf.mjs' )
const relativeConfigurationPath = relative( packageRootDirectory, configurationPath )
const configuration             = await getConfigurationFrom( configurationPath, [] )

const runBenchmarksTestsTask       = await serializeTasksFrom( configuration )
runBenchmarksTestsTask.displayName = 'run-benchmarks'
runBenchmarksTestsTask.description = 'Will run benchmarks in back and front environments.'
runBenchmarksTestsTask.flags       = null

log( `Loading  ${ green( taskPath ) } with task ${ blue( runBenchmarksTestsTask.displayName ) } and configuration from ${ cyan( relativeConfigurationPath ) }` )

export { runBenchmarksTestsTask }