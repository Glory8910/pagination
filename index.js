




let uri = "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json"


async function fetchdata(uri) {

    let listOfData = await fetch(uri)
    let list = await listOfData.json()
    showList(list);
    return list

}

fetchdata(uri);




let div = document.createElement("div")
div.id = "datalogs"




let showList = (data) => {



    let inital = 0;

    let offsetval = 10;
    let lastval = data.length / offsetval;
    let totalData = data.length
    var current = 0;


    let noOfButtons = totalData / offsetval;

    let cont = document.getElementById("container")

    let paginationsection = document.createElement("nav")
    paginationsection.setAttribute("class", "paginate")

    cont.append(paginationsection)

    let prev = document.createElement("button")
    prev.id = "prevbtn";
    prev.innerHTML = "Previous";
    prev.setAttribute('class', "buttonslist")


    let next = document.createElement("button")
    next.id = "next";
    next.innerHTML = "Next";
    next.setAttribute('class', "buttonslist")


    let first = document.createElement("button")
    first.id = "first";
    first.innerHTML = "First";
    first.setAttribute('class', "buttonslist")


    let last = document.createElement("button")
    last.id = "last";
    last.innerHTML = "Last";
    last.setAttribute('class', "buttonslist")


    paginationsection.append(first, prev)




    for (i = 1; i <= noOfButtons; i++) {



        paginationsection.innerHTML += `<button id="${i}" class="buttonlist">${i}</button>`


    }

    paginationsection.append(next, last)








    for (i = 1; i <= noOfButtons; i++) {



        document.getElementById(`${i}`).addEventListener("click", (e) => { getlist(e) })


    }
    let table = document.createElement("table")
    table.id = "table"



    div.append(table);




    let getlist = (e) => {




        let start = e.target.id * offsetval - offsetval;
        let end = e.target.id * offsetval;

        let displayArea = data.slice(start, end)





        let tbody = document.createElement("tbody")
        tbody.id = "tab1"
        tbody.innerHTML = ""


        let table1 = document.createElement("tbody")
        table1.id = "tab1"


        let thead = document.createElement("thead")
        thead.innerHTML = `<th>S.No</th><th>Name</th><th>Email</th>`

        table.append(thead);



        displayArea.map((el) => {

            let tr = document.createElement("tr")

            tr.id = el.id
            tr.innerHTML += `<td>${el.id}</td><td>${el.name}</td><td>${el.email}</td>`

            table1.innerHTML += tr.innerHTML;



        })





        tbody.innerHTML = table1.innerHTML

        table.innerHTML = `${thead.innerHTML}${tbody.innerHTML}`




        cont.append(div)



        current = e.target.id;

        setstyle(current);




    }






    let getnext = () => {

        let nextindicator = +(current) + 1;

        gettable(nextindicator);

    }








    let getprev = () => {

        let previndicator = current - 1;


        gettable(previndicator);

    }




    document.getElementById(`prevbtn`).addEventListener("click", getprev)

    next.addEventListener("click", getnext)

    document.getElementById("first").addEventListener("click", () => { gettable(1) })


    document.getElementById("last").addEventListener("click", () => { gettable(lastval) })



    let setstyle = (currentval) => {

        if (currentval == 1) {
            document.getElementById(`prevbtn`).disabled = true;
            document.getElementById(`first`).disabled = true;

        }
        if (currentval > 1) {
            document.getElementById(`prevbtn`).disabled = false;
            document.getElementById(`first`).disabled = false;


        }




        if (currentval == 10) {
            document.getElementById(`next`).disabled = true;
            document.getElementById(`last`).disabled = true;

        }
        if (currentval < 10) {
            document.getElementById(`next`).disabled = false;
            document.getElementById(`last`).disabled = false;

        }




        document.getElementById(currentval).setAttribute("class", "act");

        for (i = 1; i <= noOfButtons; i++) {



            let sle = document.getElementById(`${i}`)


            if (sle.id != currentval) {
                sle.removeAttribute("class", "act")
            }




        }

    }


    let gettable = (val) => {

        current = val;



        setstyle(current);


        let start = (val * offsetval) - offsetval;
        let end = start + offsetval;

        let dataset = data.slice(start, end)


        let tbody = document.createElement("tbody")
        tbody.id = "tab1"
        tbody.innerHTML = ""


        let table1 = document.createElement("tbody")
        table1.id = "tab1"


        let thead = document.createElement("thead")
        thead.innerHTML = `<th>S.No</th><th>Name</th><th>Email</th>`

        table.append(thead);



        dataset.map((el) => {

            let tr = document.createElement("tr")

            tr.id = el.id
            tr.innerHTML += `<td>${el.id}</td><td>${el.name}</td><td>${el.email}</td>`

            table1.innerHTML += tr.innerHTML;



        })





        tbody.innerHTML = table1.innerHTML

        table.innerHTML = `${thead.innerHTML}${tbody.innerHTML}`




        cont.append(div)



    }

    gettable(1)
}