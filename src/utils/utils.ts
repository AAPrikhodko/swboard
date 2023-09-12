export function getIdByUrl (url: string) {
    let splittedUrl = url.split('/')
    return splittedUrl[splittedUrl.length - 2]
}