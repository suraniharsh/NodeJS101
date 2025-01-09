import validator from "validator";
import chalk from "chalk";
import fs from "fs";

const searchParamsObj = {};

const data = fs.readFileSync("urlValidator_DB.json");
const db = JSON.parse(data);

const url = process.argv[2]

if (validator.isURL(url)) {
  console.log(chalk.green(`${chalk.underline.bold(url)} is a valid URL`));

  if (validator.blacklist(url, "\\[\\]") !== url) {
    console.log(chalk.underline.red(`${url} is a blacklisted URL`));
    db[1].blacklistedUrls.push({ url: url });
  }
  
  const searchParams = new URL(url).searchParams; 
  searchParams.forEach((value, key) => {
    searchParamsObj[key] = value;
  });
  
  db[0].activeUrls.push({ url: url, searchParams : searchParamsObj, status: "valid" });
  fs.writeFileSync("urlValidator_DB.json", JSON.stringify(db));

} else {

  console.log(chalk.red(`${url} is not a valid URL`));

}
