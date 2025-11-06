import * as XLSX from 'xlsx';
import * as path from 'path';

export interface CityData {
    city_name: string;
    country_code: string;
    expected_title_part: string;
    expected_url_part: string;
    min_temp_range: number;
    max_temp_range: number;
}

export function readExcelData(filePathName: string, sheetName: string): CityData[] {

    const filePath = path.resolve(__dirname, '..', 'data', filePathName);

    try {
        const workbook = XLSX.readFile(filePath);
        const worksheet = workbook.Sheets[sheetName];

        const data: CityData[] = XLSX.utils.sheet_to_json(worksheet) as CityData[];
        return data;
    }  catch (error) {
        console.log(`Greska pri citanju Excel fajla ${filePath}:`, error);
        return [];
    }
}