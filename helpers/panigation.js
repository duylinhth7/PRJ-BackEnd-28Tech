module.exports = (objectPanigation, query, countProducts) => {
    if(query.page){
        objectPanigation.currentPage = parseInt(query.page);
    };
    objectPanigation.skipItems = (parseInt(query.page) -1) * (objectPanigation.limitItems);

    objectPanigation.totalPages = Math.ceil(countProducts/objectPanigation.limitItems);

    return objectPanigation;
}