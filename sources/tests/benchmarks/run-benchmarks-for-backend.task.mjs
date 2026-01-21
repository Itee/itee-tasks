import { existsSync }     from 'fs'
import { basename }       from 'node:path'
import { join }           from 'path'
import {
    log,
    red,
    yellow
}                         from '../../utils/colors.mjs'
import { logLoadingTask } from '../../utils/loggings.mjs'
import {
    getUnscopedPackageName,
    packageTestsBenchmarksDirectory
}                         from '../../utils/packages.mjs'

logLoadingTask( import.meta.filename )

/**
 * @description Will run benchmarks with node
 */
const runBenchmarksForBackendTask       = async ( done ) => {

    const benchesPath = join( packageTestsBenchmarksDirectory, `/${ getUnscopedPackageName() }.benchmarks.js` )
    if ( !existsSync( benchesPath ) ) {
        log( yellow( `${ benchesPath } does not exist, skip backend benchmarks...` ) )
        done()
        return
    }

    try {
        await import(benchesPath)
        done()
    } catch ( error ) {
        done( red( error ) )
    }

}
runBenchmarksForBackendTask.displayName = basename( import.meta.filename, '.task.mjs' )
runBenchmarksForBackendTask.description = 'Will run benchmarks with node'
runBenchmarksForBackendTask.flags       = null

export { runBenchmarksForBackendTask }