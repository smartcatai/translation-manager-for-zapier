const apiConst = require('../apiConst');

const stashDocsFunction = (z, bundle) => {
    // use standard auth to request the file
    const filePromise = z.request({
        url: `https://${bundle.authData.api_server}${apiConst.routes.createExport}/${bundle.inputData.exportId}`,
        raw: true
    });
    // and swap it for a stashed URL
    return z.stashFile(filePromise)
        .then((url) => {
            z.console.log(`Stashed URL = ${url}`);
            return url;
        });
};

module.exports = {
    stashDocs: stashDocsFunction
}