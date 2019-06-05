const Multipart = require('multipart-stream')

module.exports = function (z, url, method, model, files) {

    const mp = new Multipart();

    mp.addPart({
        headers: {
            'Content-Disposition': 'form-data; name="model"',
            'Content-Type': 'application/json',
        },
        body: z.JSON.stringify(model)
    })
    if (files.length > 0) {
        files.forEach(function(file) {
            mp.addPart({
                headers: {
                    'Content-Disposition': `form-data; name="file_"; filename="${file.name}"`,
                    'Content-Type': 'application/octet-stream',
                },
                body: file.content,
            })
        })
    }

    const promise = z.request({
        url: url,
        method: method,
        body: mp,
        headers: {
            'Content-Type': `multipart/form-data; boundary="${mp.boundary}"`,
            'Accept': 'application/json'
        }
    });

    return promise.then((response) => JSON.parse(response.content));


};