/**
 * @file      FileHelper.js
 * @brief     This class is designed to manage a FileHelper.
 * @author    Created by Robiel.Tesfazghi
 * @version   28-MAR-2022
 */

"use strict";

const FileNotFoundException = require('../FileHelper/FileNotFoundException');
const EmptyFileException = require('../FileHelper/EmptyFileException');
const Fs = require('fs')
const Path = require('path')

module.exports = class FileHelper {

    //region private attributes
    #fullFileName;
    //endregion private attributes

    //region public methods

    constructor(filePath, fileName) {
        this.#fullFileName = Path.join(filePath, fileName)
        if (!Fs.existsSync(this.#fullFileName)) {
            throw new FileNotFoundException('file could not found');
        }
        if (!Fs.statSync(this.#fullFileName).size) {
            throw new EmptyFileException('File is empty!');
        }
    }
}

