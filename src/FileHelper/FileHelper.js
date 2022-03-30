/**
 * @file      FileHelper.js
 * @brief     This class is designed to manage a FileHelper.
 * @author    Created by Robiel.Tesfazghi
 * @version   28-MAR-2022
 */

"use strict";

const FileNotFoundException =  require('../FileHelper/FileNotFoundException');
const Fs = require('fs')
const Path = require('path')

module.exports = class FileHelper {

    //region private attributes
    #path;
    #name;
    #artists;
    //endregion private attributes

    //region public methods

    constructor(path, name) {
        if(!Fs.existsSync(Path.join(__dirname, "{path}/{name}"))){
            throw new FileNotFoundException('file could not found');
        }
        this.#path = path;
        this.#name = name;

    }
}
