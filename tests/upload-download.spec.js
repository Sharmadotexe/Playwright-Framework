const ExcelJs = require('exceljs');
const {expect,test} = require('@playwright/test');

async function writeExcelTest(searchText,modifyText,filePath) {

    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');

   const output =  await readExcelTest(worksheet,searchText);

    const cell = worksheet.getCell(output.rowNum, output.colNum);
    cell.value = modifyText;
    await workbook.xlsx.writeFile(filePath);
}

async function readExcelTest(worksheet,searchText) {
    let output = { rowNum: -1, colNum: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.rowNum = rowNumber;
                output.colNum = colNumber;
            }
        })
    })
    return output;
}


test('@WEB Upload-Download', async({page})=>{
    const searchText = "Mango";
    const modifyText = "Test";
    const filePath = "C:/Users/FF612ZH/Downloads/download.xlsx";

    await page.goto("https://rahulshettyacademy.com/upload-download-test/");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', {name:'Download'}).click();
    const downloadP = await downloadPromise;
    await downloadP.saveAs(filePath);
    await page.waitForTimeout(500);
    await writeExcelTest(searchText,modifyText,filePath);
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles(filePath);
    const textLocator = page.getByText(modifyText);
    const desiredRow = await page.getByRole('row').filter({has:textLocator});
    await expect(desiredRow.locator("#cell-2-undefined")).toContainText(modifyText);
})