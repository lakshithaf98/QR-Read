function save(){
        bookList = JSON.parse(localStorage.getItem('listItem3')) ?? []
        var id
        bookList.length != 0 ? bookList.findLast((item) => id = item.id) : id = 0
    
        if(document.getElementById('inputBookId').value){
            bookList.forEach(value => {
                if(document.getElementById('inputBookId').value == value.id){
                    value.title         = document.getElementById('inputBookTitle').value, 
                    value.author        = document.getElementById('inputBookAuthor').value
                }
            });
            document.getElementById('id').value = ''
        }else{
            var item = {
                id          : id + 1, 
                title       : document.getElementById('inputBookTitle').value, 
                author      : document.getElementById('inputBookAuthor').value
            }
            bookList.push(item)
        }
		        localStorage.setItem('listItem3', JSON.stringify(bookList))	
		allData()
		document.getElementById('form').reset()
}

function allData(){
            
    
    table2.innerHTML = ``
    bookList2 = JSON.parse(localStorage.getItem('listItem3')) ?? []
	
	console.log(bookList2)
    
    bookList2.forEach(function (value2, i){
       
        var table2 = document.getElementById('table2')
        // console.log(value2.isComplete);
        // if(value2.isComplete == 1){
        table2.innerHTML += `
            <tr>
                <td>${i+1}</td>
                <td>${value2.title}</td>
                <td>${value2.author}</td>
				<td>
                    <button class="btn btn-sm btn-success" onclick="generate(${value2.id})">
                        <i class="fa fa-edit"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="removeData3(${value2.id})">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            </tr>`
        // }
    
    })
    
}

function removeData3(id){
    
    bookList = JSON.parse(localStorage.getItem('listItem3')) ?? []
    bookList = bookList.filter(function(value){ 
        return value.id != id; 
    });
    // localStorage.clear();
    localStorage.setItem('listItem3', JSON.stringify(bookList))
    allData()
}
function removeData4(id){
    bookList = JSON.parse(localStorage.getItem('listItem4')) ?? []
    bookList = bookList.filter(function(value){ 
        return value.id != id; 
    });
    localStorage.setItem('listItem4', JSON.stringify(bookList))
    allData()
}

function find(id){
    bookList = JSON.parse(localStorage.getItem('listItem4')) ?? []
    bookList.forEach(function (value){
        if(value.id == id){
            console.log(id);
            document.getElementById('inputBookId').value = id
            document.getElementById('inputBookTitle').value = value.title
            document.getElementById('inputBookAuthor').value = value.author
        }
    })
}

function read(id1,title1,author1){
    if(id1){
        var item = [{
            id          : id1, 
            title       : title1, 
            author      : author1,
        }];   
        bookList = JSON.parse(localStorage.getItem('listItem3')) ?? []
        books = item.concat(bookList);
        var itemString = JSON.stringify(books);
        localStorage.setItem('listItem3', itemString);
    }
    
    bookList4 = JSON.parse(localStorage.getItem('listItem4')) ?? []
    bookList4 = bookList4.filter(function(value){ 
        return value.id != id1; 
    });
    localStorage.setItem('listItem4', JSON.stringify(bookList4))
    allData()
}
function read2(id1,title1,author1){
    if(id1){
        var item = [{
            id          : id1, 
            title       : title1, 
            author      : author1,
        }];   
        bookList = JSON.parse(localStorage.getItem('listItem4')) ?? []
        books = item.concat(bookList);
        var itemString = JSON.stringify(books);
        localStorage.setItem('listItem4', itemString);
    }
    
    bookList3 = JSON.parse(localStorage.getItem('listItem3')) ?? []
    bookList3 = bookList3.filter(function(value){ 
        return value.id != id1; 
    });
    localStorage.setItem('listItem3', JSON.stringify(bookList3))
    allData()
}

function generate(id){
    document.querySelector(".qr-code").style = "";

    var qrcode = new QRCode(document.querySelector(".qr-code"), {
        text: `${id}`,
        width: 250, //128
        height: 250,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });

    console.log(qrcode);

    let download = document.createElement("button");
    document.querySelector(".qr-code").appendChild(download);
	

    let download_link = document.createElement("a");
    download_link.setAttribute("download", "qr_code_linq.png");
    download_link.innerText = "Download";

    download.appendChild(download_link);

    if(document.querySelector(".qr-code img").getAttribute("src") == null){
        setTimeout(() => {
            download_link.setAttribute("href", `${document.querySelector("canvas").toDataURL()}`);
        }, 300);
    } else {
        setTimeout(() => {
            download_link.setAttribute("href", `${document.querySelector(".qr-code img").getAttribute("src")}`);
        }, 300);
    }
}

