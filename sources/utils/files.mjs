import { glob }      from 'glob'
import {
    existsSync,
    mkdirSync,
    readFileSync,
    writeFileSync
}                    from 'node:fs'
import { normalize } from 'node:path'
import { log }       from './loggings.mjs'
import { green }     from './colors.mjs'

function createDirectoryIfNotExist( directoryPath ) {

    if ( existsSync( directoryPath ) ) { return }

    log( 'Creating', green( directoryPath ) )
    mkdirSync( directoryPath, { recursive: true } )

}

function getJsonFrom( path ) {

    const buffer      = readFileSync( path )
    const fileContent = buffer.toString()
    return JSON.parse( fileContent )

}

function createFile( filePath, fileContent ) {

    log( 'Creating', green( filePath ) )
    writeFileSync( filePath, fileContent )

}

function getFilesFrom( globPattern, filter = ( /*any*/ ) => true ) {

    return glob.sync( globPattern )
               .map( filePath => normalize( filePath ) )
               .filter( filter )

}


export {
    createDirectoryIfNotExist,
    getJsonFrom,
    createFile,
    getFilesFrom,
}