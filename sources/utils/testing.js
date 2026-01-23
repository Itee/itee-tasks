async function getTestingPackage() {

    const testingPackage = ( typeof global === 'undefined' )
                           ? await import('itee-utils/sources/testings/benchmarks.js')
                           : await import('itee-utils/builds/utils.cjs')

    return testingPackage.Testing

}

export { getTestingPackage }
