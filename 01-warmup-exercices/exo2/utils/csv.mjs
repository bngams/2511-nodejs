export const jsonArrayToCSV = (jsonArray, withHeaders = true) => {
    if (jsonArray.length === 0) return '';

    if(!withHeaders) {
        return jsonArray.map(obj => Object.values(obj).map(value => JSON.stringify(value, replacer)).join(',')).join('\n');
    } else {
        const headers = Object.keys(jsonArray[0]);
        const csvRows = [
            headers.join(','), // header row
            ...jsonArray.map(obj => headers.map(header => JSON.stringify(obj[header], replacer)).join(',')) // data rows
        ];

        return csvRows.join('\n');
    };
};