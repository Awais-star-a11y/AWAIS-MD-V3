const fs = require('fs');
const path = require("path");
const { File } = require("megajs");
const AdmZip = require("adm-zip");
const axios = require("axios");

const PLUGINS_DIR = './plugins';
const LIB_DIR = './lib';
const AUTH_DIR = './auth_info_baileys';
const DATA_DIR = './my_data';
const ZIP_DIR = './';

async function downloadAndExtractZip() {
  try {

  const MEGA_ZIP_LINK = `https://mega.nz/file/yppB3bRR#8IzDy0FitHAo9ObJhsRerUyORZ_ucdI5itnISRQvfUk`;
  
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(AUTH_DIR)) {
      fs.mkdirSync(AUTH_DIR, { recursive: true });
    }
    if (!fs.existsSync(PLUGINS_DIR)) {
      fs.mkdirSync(PLUGINS_DIR, { recursive: true });
    }
    if (!fs.existsSync(LIB_DIR)) {
        fs.mkdirSync(LIB_DIR, { recursive: true });
      }

    console.log('FETCHING FILE FOR AWAIS-MD 🚀❤️');
    
    const file = File.fromURL(MEGA_ZIP_LINK);
    const fileData = await file.downloadBuffer();

    const tempZipPath = path.join(__dirname, 'temp.zip');
    fs.writeFileSync(tempZipPath, fileData);
    console.log(` AWAIS-MD FILES DOWNLOADED SUCCESSFULLY ✅`);

    const zip = new AdmZip(tempZipPath);
    zip.extractAllTo(ZIP_DIR, true);

    fs.unlinkSync(tempZipPath);
    require("./index.js");

  } catch (error) {
    console.error('Error:', error.message);
  }
}

downloadAndExtractZip();
