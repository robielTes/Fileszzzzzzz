/**
 * @file      fileHelper.test.js
 * @brief     This class is designed to test the behaviour of an fileHelper.
 * @author    Created by Robiel.Tesfazghi
 * @version   28-MAR-2022
 */

"use strict";

const FileHelper = require('../FileHelper/FileHelper');
const FileNotFoundException = require('../FileHelper/FileNotFoundException');
const EmptyFileException = require('../FileHelper/EmptyFileException');
const Fs = require('fs')
const Path = require('path')

let fileName = "testFile.csv";
let path = __dirname;
let fullFileName = Path.join(path, fileName)

/// This test method prepares the context for all tests methods
beforeEach(() => {
    if (Fs.existsSync(fullFileName)) {
        Fs.unlinkSync(fullFileName)
    }
    Fs.closeSync(Fs.openSync(fullFileName, 'w'))
});


/// This test validates the constructor's behavior.
/// Test case : try to open an inexisting file
test('Constructor_InexistingFile_ThrowException', () => {
    //given
    let wrongPath = "falkjalj";
    let wrongFileName = "wrong.csv";

    //when
    expect(() => new FileHelper(wrongPath, wrongFileName)).toThrow(FileNotFoundException);

    //then
    //exception thrown

})

/// This test validates the constructor's behavior.
/// Test case : File is empty.
test('Constructor_FileEmpty_ThrowException', () => {
    //given
    //refer to Init() method
    //when
    expect(() => new FileHelper(path, fileName)).toThrow(EmptyFileException);

    //then
    //exception thrown

})

/// This test validates the extract method, via the lines accessors.
test('Constructor_NominalCase_Success', () => {
    //given
    //refer to Init() method
    let expectedAmountOfLines = 20;
    let actualAmountOfLines = 0;

    Fs.writeFileSync(fullFileName, '');

    for (let i = 0; i < expectedAmountOfLines; i++) {
        Fs.appendFileSync(fullFileName, `${i} \n`);
    }

    let file = Fs.readFileSync(fullFileName);
    actualAmountOfLines = file.toString().split('\n').length - 1;

    //then

    expect(expectedAmountOfLines).toEqual(actualAmountOfLines);

})

/// This test validates the Split method's behavior.
/// Test case : One big file (400 lines) splitted in two files (200 lines each)
test('Split_OnlyOneBigFile_Success', () => {

    //given
    //refer to Init()
    let amountOfLinesInOriginalFile = 400;
    let expectedAmountOfResultFiles = 2;
    let expectedLinesPerFiles = amountOfLinesInOriginalFile / expectedAmountOfResultFiles;

    Fs.writeFileSync(fullFileName, '');
   

    for (let i = 0; i < amountOfLinesInOriginalFile; i++) {
        Fs.appendFileSync(fullFileName, `${i} \n`);
    }


    //splite the original file into two files
    for (let i = 0; i < expectedAmountOfResultFiles; i++) {
        Fs.writeFileSync(Path.join(path, `testFile${i}.csv`),Fs.readFileSync(fullFileName).toString().split(expectedLinesPerFiles)[i]);
    }

    //delete the original file
    Fs.unlinkSync(fullFileName);

    
    //count file that end with .csv
    let listOfFilesResult = 0;  
    let files = Fs.readdirSync(path);
    for (let i = 0; i < files.length; i++) {
        if (files[i].endsWith('.csv')) {
            listOfFilesResult++;
        } 
    }
    //then
    expect(expectedAmountOfResultFiles).toEqual(listOfFilesResult);

})