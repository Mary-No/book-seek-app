import type {Book} from "../types.ts";
import Papa from 'papaparse';

export const exportToCSV = (data: Book[], filename = 'data.csv') => {
    const csv = Papa.unparse(data, {delimiter: ';'});

    const csvWithBOM = '\uFEFF' + csv;

    const blob = new Blob([csvWithBOM], {type: 'text/csv;charset=utf-8;'});
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};
