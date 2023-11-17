var jsonFile;
$(document).ready(function() {
    selector();
    
});

//hide all sections
function hideAllElements(){
    $.each($('.nav_element'), function() {
        let sectionId = "#"+this.id.substring(4);
        if ($(sectionId).css('display') != 'none'){
            $(sectionId).hide();
        }
    });
}

function switchdoc(){
    if (jsonFile == "lab6.json"){
        jsonFile = "MBE.json";
    }
    else{
        jsonFile = "lab6.json";
    }
    loadData();
}

function setdoc(doc){
    jsonFile = doc;
    loadData();
}


function selector(){
    $("#navbar").empty();
    $("#navbar").append(`<button onclick="setdoc('MBE.json')">MBE</button><br><br>`);
    $("#navbar").append(`<button onclick="setdoc('lab6.json')">WebSys</button>`);
}

//read from json file and load in content
function loadData(){
    $("#navbar").empty();
    $("#content").empty();
    $.getJSON(jsonFile, function(info) {
        // load lectures
        $("#navbar").append(`<h3><u>Lectures</u></h3>`);
        $.each(info.Websys_course.Lectures, function() {
            //construct main content
            let content = `<section id="${this.title.replace(/\s+/g, '')}">`;
            content += `<h1>${this.title} - ${this.date}</h1>`;
            content += `<h2>${this.description}</h2>`;
            $.each(this.links, function (){
                content += `<a href="${this}">`;
                content += `<iframe src="${this}" width="100%" loading="lazy"></iframe></a>`;
            });
            content += `</section>`;
            $("#content").append(content);
            
            //construct nav bar 
            $("#navbar").append(`<p id="nav_${this.title.replace(/\s+/g, '')}" class="nav_element">${this.title}</p>`);
        });

        //load labs
        $("#navbar").append(`<h3><u>Labs</u></h3>`);
        $.each(info.Websys_course.Labs, function() {
            //construct main content
            let content = `<section id="${this.title.replace(/\s+/g, '')}">`;
            content += `<h1>${this.title} - ${this.date}</h1>`;
            content += `<h2>${this.description}</h2>`;
            $.each(this.links, function (){
                content += `<a href="${this}">`;
                content += `<iframe src="${this}" width="100%" loading="lazy"></iframe></a>`;
            });
            content += `</section>`;
            $("#content").append(content);
            
            //construct nav bar 
            $("#navbar").append(`<p id="nav_${this.title.replace(/\s+/g, '')}" class="nav_element">${this.title}</p>`);
        });

        hideAllElements();

        //add click functionality (hide and show)
        $(".nav_element").click(function() {
            let sectionId = "#"+this.id.substring(4);
            if ($(sectionId).css('display') == 'none'){    //show the element
                hideAllElements();
                $(sectionId).show();
            }
            else {                                         //hide the element
                $(sectionId).hide();
            }       
        });

        $("#navbar").append(`<button onclick="loadData();">Refresh</button><br><br>`)
        $("#navbar").append(`<button onclick="switchdoc()" id="switch">Switch</button>`)

    });
}