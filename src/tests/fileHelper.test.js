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