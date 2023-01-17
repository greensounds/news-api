const path = require("path");
const fs = require("fs");
const puppeteer = require('puppeteer');
const { guardarPortadas } = require("./conection");

//Codigo pa
(async () => {
    console.log('loading scraper')
    const browser = await puppeteer.launch({
        //headless: false,
        //slowMo: 500
    });
    const page = await browser.newPage();
    const portadas = [];
    const urls = [
        "https://es.kiosko.net/ca/",
        "https://es.kiosko.net/de/",
        "https://es.kiosko.net/fr/",
        "https://es.kiosko.net/es/",
        "https://es.kiosko.net/it/",
        "https://es.kiosko.net/uk/",
        "https://es.kiosko.net/tr/",
        "https://es.kiosko.net/pt/",
        "https://es.kiosko.net/br/",
        "https://es.kiosko.net/us/",
        "https://es.kiosko.net/cn/",
        "https://es.kiosko.net/mx/",
        "https://es.kiosko.net/in/",
        "https://es.kiosko.net/jp/",
        "https://es.kiosko.net/ru/",
        "https://es.kiosko.net/za/",
        "https://es.kiosko.net/eg/",
        "https://es.kiosko.net/ng/",
        "https://es.kiosko.net/mx/geo/Mexico_DF.html",
        "https://es.kiosko.net/mx/geo/Nuevo_Leon.html",
        "https://es.kiosko.net/mx/geo/Jalisco.html",
        "https://es.kiosko.net/mx/geo/San_Luis_Potosi.html",
        "https://es.kiosko.net/mx/geo/Est_Mexico.html"
    ]
    for (const url of urls) {
        await page.goto(url);
        const detallesPagina = await page.evaluate(() => {
            const portadas = [...document.querySelectorAll('.thcover img')].map((el) => el.src.replace('.200', '.750'))
            return {
                portadas, 
                url: window.location.href
            }
        });
        portadas.push(detallesPagina)
    }
    await guardarPortadas(portadas)

    console.log('scrape complete');
    await browser.close();
    process.exit();
})()