/**
 * @file      fileHelper.test.js
 * @brief     This class is designed to test the behaviour of an fileHelper.
 * @author    Created by Robiel.Tesfazghi
 * @version   28-MAR-2022
 */

"use strict";

const FileHelper =  require('../FileHelper/FileHelper');
const FileNotFoundException =  require('../FileHelper/FileNotFoundException');


test('Constructor_InexistingFile_ThrowException', () => {
    //given
    let wrongPath = "falkjalj";
    let wrongFileName = "wrong.csv";

    //when
    expect(() => new FileHelper(wrongPath, wrongFileName)).toThrow(FileNotFoundException);

    //then
    //exception thrown

})

test('Constructor_FileEmpty_ThrowException', () => {
    //given
    //refer to Init() method
    let fileHelper = new FileHelper(path, fileName);
    let wrongPath = "falkjalj";
    let wrongFileName = "wrong.csv";

    //when
    expect(() => new FileHelper(wrongPath, wrongFileName)).toThrow(EmptyFileException);

    //then
    //exception thrown

})