import colors     from 'ansi-colors'
import log        from 'fancy-log'
import {
    existsSync,
    rmSync
}                 from 'fs'
import {
    basename,
    dirname,
    extname,
    join,
    relative
}                 from 'path'
import { rollup } from 'rollup'
import {
    getConfigurationFrom,
    iteePackageConfigurationsDirectory,
    packageRootDirectory,
    packageSourcesDirectory as sourcesDir,
    packageTasksConfigurationsDirectory,
    packageTestsBundlesDirectory as bundlesDir
}                 from '../../_utils.mjs'

const {
          red,
          green,
          blue,
          magenta,
          cyan
      } = colors

const sourcesFilesPath        = join( packageTasksConfigurationsDirectory, 'tests', 'bundlings', 'check-bundling.conf.mjs' )
const defaultSourcesFilesPath = join( iteePackageConfigurationsDirectory, 'tests', 'bundlings', 'check-bundling.conf.mjs' )
const sourcesFiles            = await getConfigurationFrom( sourcesFilesPath, defaultSourcesFilesPath )

const configurationPath        = join( packageTasksConfigurationsDirectory, 'tests', 'bundlings', 'check-bundling-from-esm-files-direct.conf.mjs' )
const defaultConfigurationPath = join( iteePackageConfigurationsDirectory, 'tests', 'bundlings', 'check-bundling-from-esm-files-direct.conf.mjs' )
const configuration            = await getConfigurationFrom( configurationPath, defaultConfigurationPath )

/**
 * @description In view to detect bundling side effects this task will
 * create intermediary file for each individual export from this package
 * and then create rollup config for each of them and bundle
 * Todo: Check for different target env like next task below this one
 */
const checkBundlingFromEsmFilesDirectTask       = async ( done ) => {

    const outputDir = join( bundlesDir, 'from_files_direct' )
    if ( existsSync( outputDir ) ) {
        log( 'Clean up', magenta( outputDir ) )
        rmSync( outputDir, { recursive: true } )
    }

    for ( let sourceFile of sourcesFiles ) {

        const specificFilePath = sourceFile.replace( sourcesDir, '' )
        const specificDir      = dirname( specificFilePath )
        const fileName         = basename( sourceFile, extname( sourceFile ) )

        const bundleFileName = `${ fileName }.bundle.js`
        const bundleFilePath = join( outputDir, specificDir, bundleFileName )

        configuration.input       = sourceFile
        configuration.output.file = bundleFilePath

        try {

            log( 'Bundling', green( configuration.output.file ) )

            const bundle = await rollup( configuration )
            await bundle.generate( configuration.output )
            await bundle.write( configuration.output )

        } catch ( error ) {

            log( red( error.message ) )

        }

    }

    done()

}
checkBundlingFromEsmFilesDirectTask.displayName = 'check-bundling-from-esm-files-direct'
checkBundlingFromEsmFilesDirectTask.description = 'In view to detect bundling side effects this task will create intermediary file for each individual export from this package and then create rollup config for each of them and bundle'
checkBundlingFromEsmFilesDirectTask.flags       = null

const taskPath                  = relative( packageRootDirectory, import.meta.filename )
const relativeConfigurationPath = relative( packageRootDirectory, configurationPath )
log( `Loading  ${ green( taskPath ) } with task ${ blue( checkBundlingFromEsmFilesDirectTask.displayName ) } and configuration from ${ cyan( relativeConfigurationPath ) }` )

export { checkBundlingFromEsmFilesDirectTask }