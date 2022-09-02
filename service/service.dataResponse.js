// Ce fichier exporte une fonction qui peut être utilisée par les fichiers qui l'importent

export default (records, page = 1, count = 1, limit = 1) => {
    let last = Math.ceil(count/limit);
    return {
        records,
        nbRecords : count,
        page : {
            current : page,
            previous: (page > 1) ? page-1 : null,
            next: (page < last) ? page+1 : null,
            last: last
        }
    };
}
