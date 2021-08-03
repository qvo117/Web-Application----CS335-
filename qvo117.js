const showHome = () => {
    document.getElementById("home").style.display = "block";
    document.getElementById("products").style.display = "none";
    document.getElementById("news").style.display = "none";
    document.getElementById("location").style.display = "none";
    document.getElementById("guestBook").style.display = "none";

    document.getElementById("homeTab").style.backgroundColor = "lightgray";
    document.getElementById("prodTab").style.backgroundColor = "transparent";
    document.getElementById("newsTab").style.backgroundColor = "transparent";
    document.getElementById("locTab").style.backgroundColor = "transparent";
    document.getElementById("commTab").style.backgroundColor = "transparent";
}

const showProducts = () => {
    document.getElementById("home").style.display = "none";
    document.getElementById("products").style.display = "block";
    document.getElementById("news").style.display = "none";
    document.getElementById("location").style.display = "none";
    document.getElementById("guestBook").style.display = "none";

    document.getElementById("homeTab").style.backgroundColor = "transparent";
    document.getElementById("prodTab").style.backgroundColor = "lightgray";
    document.getElementById("newsTab").style.backgroundColor = "transparent";
    document.getElementById("locTab").style.backgroundColor = "transparent";
    document.getElementById("commTab").style.backgroundColor = "transparent";

    getProducts();
}

const showNews = () => {
    document.getElementById("home").style.display = "none";
    document.getElementById("products").style.display = "none";
    document.getElementById("news").style.display = "block";
    document.getElementById("location").style.display = "none";
    document.getElementById("guestBook").style.display = "none";

    document.getElementById("homeTab").style.backgroundColor = "transparent";
    document.getElementById("prodTab").style.backgroundColor = "transparent";
    document.getElementById("newsTab").style.backgroundColor = "lightgray";
    document.getElementById("locTab").style.backgroundColor = "transparent";
    document.getElementById("commTab").style.backgroundColor = "transparent";

    getNewsfeed();
}

const showLocation = () => {
    document.getElementById("home").style.display = "none";
    document.getElementById("products").style.display = "none";
    document.getElementById("news").style.display = "none";
    document.getElementById("location").style.display = "block";
    document.getElementById("guestBook").style.display = "none";

    document.getElementById("homeTab").style.backgroundColor = "transparent";
    document.getElementById("prodTab").style.backgroundColor = "transparent";
    document.getElementById("newsTab").style.backgroundColor = "transparent";
    document.getElementById("locTab").style.backgroundColor = "lightgray";
    document.getElementById("commTab").style.backgroundColor = "transparent";

    getLocation();
}

const showComments = () => {
    document.getElementById("home").style.display = "none";
    document.getElementById("products").style.display = "none";
    document.getElementById("news").style.display = "none";
    document.getElementById("location").style.display = "none";
    document.getElementById("guestBook").style.display = "block";

    document.getElementById("homeTab").style.backgroundColor = "transparent";
    document.getElementById("prodTab").style.backgroundColor = "transparent";
    document.getElementById("newsTab").style.backgroundColor = "transparent";
    document.getElementById("locTab").style.backgroundColor = "transparent";
    document.getElementById("commTab").style.backgroundColor = "lightgray";
}

window.onload = showHome;

const postComment = () =>
{
    const comment = document.getElementById("comment").value;
    const name = document.getElementById("name").value;
    const fetchPromise = fetch("http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/comment?name=" + name,
    {
        headers : {
            "Content-Type": "application/json"
        },
        method : "POST",
        body : JSON.stringify(comment)
    });
    const streamPromise = fetchPromise.then( (response) => {
        document.getElementById("update").src = document.getElementById("update").src;
        document.getElementById("comment").value = "";
        document.getElementById("name").value = "";
    });
}

const showProductTable = (products) =>
{
    const prodTab = document.getElementById("productsTab");
    let tableContent = "";
    const addRecord = (record) => {
        const imageSource = "http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/itemimg?id=" + record.ItemId;
        tableContent += 
        "<tr><td class='prodImg'><img width='200'src='" + imageSource + "'/></td><td class='left-align'>" + record.Title + "</br>" + 
        record.Price + "</br>" + record.Origin + "</br></br><button type='button'>Buy now</button></td></tr>";
        tableContent += "<tr><td colspan='2'><hr width='50%'/></td></tr>";
    }
    products.forEach(addRecord);
    prodTab.innerHTML = tableContent;
} 

const getProducts = () => 
{
    const fetchPromise = fetch("http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/items",
    {
        headers: {
            "Accept": "application/json",
        }
    });
    const streamPromise = fetchPromise.then( (response) => response.json());
    streamPromise.then( (arrayOfProducts => showProductTable(arrayOfProducts)));
} 

const searchProduct = () =>
{
    const input = document.getElementById("search").value;
    const fetchPromise = fetch("http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/search?term=" + input,
    {
        headers: {
            "Accept": "application/json",
        }
    });
    const streamPromise = fetchPromise.then( (response) => response.json());
    streamPromise.then( (arrayOfProducts => showProductTable(arrayOfProducts)));
}

const getNewsfeed = () =>
{
    const fetchPromise = fetch("http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/news",
    {
        headers: {
            "Accept": "application/json",
        }
    });
    const streamPromise = fetchPromise.then( (response) => response.json());
    streamPromise.then( (arrayOfNews => showNewsfeed(arrayOfNews)));
}

const showNewsfeed = (news) =>
{
    const newsfeedTab = document.getElementById("newsfeedTab");
    let tableContent = "";
    const addRecord = (record) => {
        const imageSource = "http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/itemimg?id=" + record.ItemId;
        tableContent += 
         "<tr><td><img width='200' src='" + record.enclosureField.urlField + "'/></td><td></td></tr>";
        tableContent += "<tr><td><a href=" + record.linkField + "target='_blank'>" + record.titleField + "</a></td><td class='left-align'>" + record.pubDateField + "</td></tr>";
        tableContent += "<tr><td class='left-align'>" + record.descriptionField + "</td></tr>";
        tableContent += "<tr><td><hr width='50%'/></td></tr>";

    }
    news.forEach(addRecord);
    newsfeedTab.innerHTML = tableContent;
}

const getLocation = () =>
{
    const fetchPromise = fetch("http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/vcard",
    {
        headers: {
            "Accept": "application/json",
        }
    });
    const streamPromise = fetchPromise.then( (response) => response.text());
    streamPromise.then( (arrayOfInfo => showLocationInfo(arrayOfInfo)));
}

const showLocationInfo = (contact) =>
{
    const oldA = contact.split("\n");
    const newA = oldA.map((e) => e.split(":"));
    let emailIndex = -1;
    let telIndex = -1;
    let adrIndex = -1;

    for (let i = 0; i< newA.length; ++ i) 
    {
        if (newA[i][0].indexOf("EMAIL") >= 0) {
            emailIndex = i;
        }
        else if (newA[i][0].indexOf("TEL") >= 0) {
           telIndex = i;
        }
        else if (newA[i][0].indexOf("ADR") >= 0) {
            adrIndex = i;
        }
    };
    const email = newA[emailIndex][1];
    const tel = newA[telIndex][1];
    let adr = newA[adrIndex][1];
    adr = adr.split(";").join("").trim();
    
    document.getElementById("email").innerText = email;
    document.getElementById("email").href = "mailto: " + email;
    document.getElementById("ph").innerText = tel;
    document.getElementById("ph").href = "tel: " + tel;
    document.getElementById("adr").innerText = adr;
}