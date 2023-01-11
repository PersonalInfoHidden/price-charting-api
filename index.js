const fs = require("fs");
const axios = require("axios");
const process = require("process");

const inp = fs.readFileSync("./input.txt", "utf-8");

function validURL(str) {
    var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$",
        "i"
    ); // fragment locator
    return !!pattern.test(str);
}

if (!validURL(inp)) {
    console.log("Invalid URL");
    process.exit();
}

const getHTML = async (url) => {
    const responce = await axios.get(url);
    const data = await responce.data;
    // console.log(await data);
    const arr = [];
    await data.offers.forEach((element, i) => {
        arr.push([]);
        arr[i].push(element["product-name"]);
    });
    await data.offers.forEach((element, i) => {
        let numArr = element["price"].toString().split("");
        numArr.splice(numArr.length - 2, 0, ".");
        const str = numArr.join("");
        arr[i].push(Number(str));
    });

    const dataObj = arr;
    fs.writeFileSync("./data.json", JSON.stringify(dataObj));
    console.log("successfully wrote data to data.json");
};

getHTML(inp);

// npm run start
