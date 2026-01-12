import colors        from 'ansi-colors'
import log           from 'fancy-log'
import child_process from 'node:child_process'
import { promisify } from 'node:util'
import {
    join,
    relative
}                    from 'path'
import {
    packageRootDirectory,
    tasksConfigurationsDirectory
}                    from '../_utils.mjs'

const execFile = promisify( child_process.execFile )
const {
          red,
          green,
          blue,
          cyan
      }        = colors

const taskPath                  = relative( packageRootDirectory, import.meta.filename )
const configurationPath         = join( tasksConfigurationsDirectory, 'lints', 'eslint.conf.mjs' )
const relativeConfigurationPath = relative( packageRootDirectory, configurationPath )

/**
 * @method npm run lint
 * @global
 * @description Will lint the sources files and try to fix the style when possible
 */
const lintTask       = async ( done ) => {

    try {

        const { stdout } = await execFile( 'npx', [ 'eslint', '--config', relativeConfigurationPath, '--fix' ] )
        if ( stdout !== '' ) {
            log( stdout )
        }

        done()

    } catch ( error ) {

        log( error.stdout )
        done( red( error.message ) )

    }

}
lintTask.displayName = 'lint'
lintTask.description = 'Will lint the sources files and try to fix the style when possible.'
lintTask.flags       = null

log( `Loading  ${ green( taskPath ) } with task ${ blue( lintTask.displayName ) } and configuration from ${ cyan( relativeConfigurationPath ) }` )

export { lintTask }