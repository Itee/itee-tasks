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
const configurationPath         = join( tasksConfigurationsDirectory, 'tests', 'units', 'run-unit-tests.conf.mjs' )
const relativeConfigurationPath = relative( packageRootDirectory, configurationPath )
const configuration             = await getConfigurationFrom( configurationPath, [] )

const runUnitTestsTask       = await serializeTasksFrom( configuration )
runUnitTestsTask.displayName = 'run-unit-tests'
runUnitTestsTask.description = 'Will run unit tests in back and front environments.'
runUnitTestsTask.flags       = null

log( `Loading  ${ green( taskPath ) } with task ${ blue( runUnitTestsTask.displayName ) } and configuration from ${ cyan( relativeConfigurationPath ) }` )

export { runUnitTestsTask }