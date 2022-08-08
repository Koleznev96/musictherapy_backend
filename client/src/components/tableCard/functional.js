export const sortRoot = async (url, data, sortData, status, request, auth) => {
    return await request(url, 'POST', {
        data,
        sortData,
        status
    }, {
        Authorization: auth.token
    });
}