class boxcar {
    constructor(Id, tareWeight, maxGrossWeight) {
        this.Id = Id
        this.tareWeight = tareWeight
        this.maxGrossWeight = maxGrossWeight
        this.maxCargoWeight = maxGrossWeight - tareWeight
        this.cargo = []
        }

        cargoWeight() {
            return this.cargo.reduce(function (acc, obj) { return acc + obj.weight }, 0)
        }
        
        grossWeight() {
            return this.cargoWeight() + this.tareWeight
        }

        static generateRandomBoxcar() {
            return new boxcar(
                "BX" + (Math.floor(Math.random() * (999 - 100) ) + 100),
                (Math.floor(Math.random() * (500 - 100) ) + 100),
                (Math.floor(Math.random() * (999 - 500) ) + 500),
            )
        }
    }

class cargo {
    constructor(transportId, description, weight, status) {
        this.transportId = transportId
        this.description = description
        this.weight = weight
        this.status = status
        this.destination = transportId.substring(transportId.length - 3)
    }
}

class station {
    constructor(stationId) {
    this.Id = stationId
    this.warehouseManifest = []
    }

    cargoWeight() {
        return this.cargo.reduce(function (acc, obj) { return acc + obj.weight }, 0)
    }
}

var STATIONS = [new station("S01"), new station("S02"), new station("S03"), new station("S04")]
var TRAIN = {
    boxcars:[],
    location:STATIONS[0]
}

var CURRENTDAY = 1

function displayDivB () {
    $("#divB").show();
    $("#divA").hide();
    if (TRAIN.boxcars.length > 0) {
    displayDivC();
    } 
}

function displayDivC() {
    $("#divA").hide()
    $("#divC").show();
    let tbody = $("#divC").find("tbody")
    let tfoot = $("#divC").find("tfoot")
    tbody.empty()
    tfoot.empty()
    if (TRAIN.boxcars.length > 0) {    
        let totalCargoWeight = 0;
        TRAIN.boxcars.forEach(Boxcar => {
            let boxcarRow = document.createElement("tr")
            let IdCell = document.createElement("td")
            let tareWeightCell = document.createElement("td")
            let maxGrossWeightCell = document.createElement("td")
            let CargoWeightCell = document.createElement("td")
            let GrossWeightCell = document.createElement("td")
            IdCell.textContent = Boxcar.Id
            tareWeightCell.textContent = Boxcar.tareWeight
            maxGrossWeightCell.textContent = Boxcar.maxCargoWeight
            CargoWeightCell.textContent = Boxcar.cargoWeight()
            GrossWeightCell.textContent = parseInt(Boxcar.grossWeight())
            boxcarRow.append(IdCell, tareWeightCell, maxGrossWeightCell, CargoWeightCell, GrossWeightCell)
            tbody.append(boxcarRow)
            totalCargoWeight += parseInt(Boxcar.cargoWeight())
        });
        let totalCargoWeightRow = document.createElement("tr")
        let totalCargoWeightCell = document.createElement("td")
        let totalCargoWeightDescriptionCell = document.createElement("td")
        totalCargoWeightDescriptionCell.textContent = "Total Cargo Weight"
        totalCargoWeightDescriptionCell.colSpan = 3
        totalCargoWeightCell.textContent = totalCargoWeight
        totalCargoWeightRow.append(totalCargoWeightDescriptionCell, totalCargoWeightCell)
        tfoot.append(totalCargoWeightRow) 
    }
} 

function displayDivD () {
    $("#divA").hide();
    $("#divD").show();
    let boxCarSelectedValue = $("#Box_Car_Selected_input");
    let divDTableBody = $("#divD").find("tbody");
    let cargoEntryForm = $("#cargoForm");
    cargoEntryForm[0].reset();
    $("#cargoForm :input").prop("disabled", true);
    divDTableBody.addClass("selectabletable");
    divDTableBody.empty();
    TRAIN.boxcars.forEach(Boxcar => {
        let boxcarIdCell = document.createElement("td");
        let boxcarIdRow = document.createElement("tr");
        $(boxcarIdCell).on('click', ()=>{   
            divDTableBody.prop("disabled", true);
            divDTableBody.removeClass("selectabletable");
            $("#cargoForm :input").prop("disabled", false);
            boxCarSelectedValue.val(Boxcar.Id);
            $("td").off();
        })
        boxcarIdCell.textContent = Boxcar.Id;
        boxcarIdRow.append(boxcarIdCell);
        divDTableBody.append(boxcarIdRow);
    });
  }

function displayDivE(boxcar){
    $("#divA").hide()
    $("#divE").show()
    $("#divE").find("table, h1").remove()
    createManifestTable($("#divE"), boxcar.cargo)
    $("#divE").find('button').detach().appendTo("#divE")
}

function displayDivF() {
    div = $("#divF")
    $("#divA").hide()  
    div.show()
    div.find("table, h1").remove()
    STATIONS.forEach(stationwarehouse => {
        createManifestTable(div, stationwarehouse.warehouseManifest)
    })
    div.find('button').detach().appendTo(div)
 
}

function displayDivG() {
    $("#divA").hide()
    $("#divG").show()
    
    let divGTableBody = $("#divG").find("tbody");
    $("#divG").find("h1").text(`CNA - Warehouse Manifest - Station AAAA`)
    divGTableBody.empty()
        TRAIN.boxcars.forEach(Boxcar => {
        Boxcar.cargo.forEach(cargo => {  
            let freightStatusRow = document.createElement("tr");
            let transportIdCell = document.createElement("td");
            let descriptionCell = document.createElement("td");
            let weightCell = document.createElement("td");
            let statusCell = document.createElement("td");
            
            divGTableBody.append(freightStatusRow);
            transportIdCell.textContent = cargo.transportId
            descriptionCell.textContent = cargo.description
            weightCell.textContent = cargo.weight
            statusCell.textContent = cargo.status
            freightStatusRow.append(transportIdCell, descriptionCell, weightCell, statusCell);})
        }   
    )}

function createManifestTable(manifestdiv,  cargoArray) {
    let tableTitle = document.createElement('h1')
    let table = createTable(["Transport ID", "Description", "Weight"])
    let tbody = table.querySelector('tbody')
    let tfoot = table.querySelector('tfoot')
    let totalCargoWeight = 0
    cargoArray.forEach(cargoUnit => {
        let boxcarIdRow = document.createElement("tr");
        let transportIdCell = document.createElement("td");
        let descriptionCell = document.createElement("td");
        let weightCell = document.createElement("td");
        
        tbody.append(boxcarIdRow);
        transportIdCell.textContent = cargoUnit.transportId
        descriptionCell.textContent = cargoUnit.description
        weightCell.textContent = cargoUnit.weight
        totalCargoWeight += parseInt(cargoUnit.weight)
        tbody.append(transportIdCell, descriptionCell, weightCell);
        tableTitle.textContent = cargoUnit.status
    })
    let totalCargoWeightRow = document.createElement("tr")
    let totalCargoWeightCell = document.createElement("td")
    let totalCargoWeightDescriptionCell = document.createElement("td")
    totalCargoWeightDescriptionCell.textContent = "Total Cargo Weight"
    totalCargoWeightDescriptionCell.colSpan = 2
    totalCargoWeightCell.textContent = totalCargoWeight
    totalCargoWeightRow.append(totalCargoWeightDescriptionCell, totalCargoWeightCell)
    tfoot.append(totalCargoWeightRow)
    
    manifestdiv.append(tableTitle, table)
}

function createTable(headers){
    let table = document.createElement('table')
    let tableHead = document.createElement('thead')
    let tableHeaderRow = document.createElement('tr')
    let tableBody = document.createElement('tbody')
    let tableFooter = document.createElement('tfoot')
    headers.forEach(header => {
        let headerColumn = document.createElement('th')
        headerColumn.textContent = header
        tableHeaderRow.appendChild(headerColumn)
    })
    tableHead.appendChild(tableHeaderRow)
    table.appendChild(tableHead)
    table.appendChild(tableBody)
    table.appendChild(tableFooter)
    return (table)
}

function validateCreateBoxcar(event){
    event.preventDefault();
    $(event.currentTarget).find("span").text("");
    let boxcarId = $("#Boxcar_ID_input").val();
    let tareWeight = parseInt($("#TAREWeight_input").val());
    let maxGrossWeight = parseInt($("#Max_Gross_Weight_input").val());

    
    if (!(/BX\d{3}$/).test(boxcarId)) {
        $("#Boxcar_ID_input").next().text("Boxcar ID must be in the format BX123");
    }
    else if (0 > tareWeight || tareWeight > 200000) {
        $("#TAREWeight_input").next().text("TARE weight ust be between 0 and 200,000");
    }
    else if (maxGrossWeight < tareWeight) {
        $("#Max_Gross_Weight_input").next().text("Gross weight must be larger than TARE weight");
    }  
    else if (0 > maxGrossWeight || maxGrossWeight > 200000) {
        $("#Max_Gross_Weight_input").next().text("Max gross weight must be between 0 and 200,000")}
    else {
        TRAIN.boxcars.push(new boxcar(
        boxcarId,tareWeight, maxGrossWeight))
        displayDivC()
    }
}

function validateCreateCargo(event) {
    event.preventDefault();
    let divDwarehouseSpan = $("#divD").find("span");
    let boxCarSelectedValue = $("#Box_Car_Selected_input").val();
    let Transport_ID = $("#Transport_ID_input").val()
    let Description = $("#Description_input").val()
    let Cargo_Weight = parseInt($("#DivD_Cargo_Weigh_input").val())
    const boxcar = TRAIN.boxcars.find(boxcar => boxcar.Id === boxCarSelectedValue)
    const maxCargoWeight = boxcar.maxCargoWeight - boxcar.cargoWeight()
    divDwarehouseSpan.text('')
    if (!(/[a-zA-Z]{3}\d{4}S0[1-4]/).test(Transport_ID)) {
        divDwarehouseSpan.text('Transport id must be in the format XXX1234S0 (1 - 4)')
    }
    else{
    if (Cargo_Weight > maxCargoWeight) {
        let newCargo = new cargo(Transport_ID, Description, Cargo_Weight, STATIONS[CURRENTDAY-1].Id)
        STATIONS[0].warehouseManifest.push(newCargo)
        divDwarehouseSpan.text("Weight Exceeds boxcar weight... diverting to warehouse")
        $("#divF, #divE").hide()
        displayDivF()
    }
    else {
        let newCargo = new cargo(Transport_ID, Description, Cargo_Weight, boxcar.Id)
        boxcar.cargo.push(newCargo)
        $("#divF, #divE").hide()
        displayDivE(boxcar)
    }}
}

function Handle_return_to_menu() {
    $("div").hide();
    $("#divA").toggle();
    $("[name='menu']").prop('checked', false);
}

function Advance_Day() {
    $('input').prop('disabled', true)
    CURRENTDAY += 1
    $("#dayCounter").val(CURRENTDAY)
    TRAIN.location = STATIONS[Math.min(CURRENTDAY - 1, STATIONS.length - 1)]
    console.log(TRAIN.location)
    TRAIN.boxcars.forEach(boxcar => {
        boxcar.cargo.forEach(cargo => {
            console.log(cargo.destination)
        })
    });
};

function offLoadCargo() {}
// const TESTING = () => {
//     let sampleBoxcar1 = new boxcar("BX500", 12000, 90000 );
//     let sampleBoxcar2 = new boxcar("BX505", 15000, 105000 );
//     let sampleBoxcar3 = new boxcar("BX520", 10000, 80000 );
//     let sampleCargo1 = new cargo("TXL2031S01", "50000 Shirts", 25000, "BX500");
//     let sampleCargo2 = new cargo("MED2033S01", "Medical MX45000", 16000, "BX505");
//     let sampleCargo3 = new cargo("CSX2037S01", "Lamp Oil K1 Drum", 10000, "BX520");
//     let sampleCargo4 = new cargo("TXL2031S02", "30000 Coats", 30000, "BX500");
//     let sampleCargo5 = new cargo("MED2033S02", "Medical MX34111", 16000, "BX505");
//     let sampleCargo6 = new cargo("CSZ2039S02", "Fuel Dsl G1 10000L BL", 8320, "BX520");
//     sampleBoxcar1.cargo.push(sampleCargo1, sampleCargo4);
//     sampleBoxcar2.cargo.push(sampleCargo2, sampleCargo5);
//     sampleBoxcar3.cargo.push(sampleCargo3, sampleCargo6);
//     TRAIN.boxcars.push(sampleBoxcar1, sampleBoxcar2, sampleBoxcar3);
//} 
$(function () {
    $("[name='menu']").prop('checked', false)
    $("#dayCounter").val(1)
    
    $(".Return_to_main_page_btn").on("click", Handle_return_to_menu)

    $("#createBoxcarForm").on("submit", validateCreateBoxcar)
    $("#cargoForm").on('submit', validateCreateCargo)

    $('#return_to_create_box_car_btn').on('click', ()=>{
        $('#divC').hide()
        $('#createBoxcarForm')[0].reset()
        $('#divB').show()
    })

    $(".returnToCreateFreight").on("click", (event) => {
        $(event.currentTarget).parent("div").toggle();
        $("#divD").toggle();
        displayDivD();
    })
    // TESTING()
})

// TODO
// see if there isnt a better way to create div e and f without moving buttons around like a doofus