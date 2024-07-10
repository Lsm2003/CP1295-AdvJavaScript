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
    }

class cargo {
    constructor(transportId, description, weight, status) {
        this.transportId = transportId
        this.description = description
        this.weight = weight
        this.status = status
    }
}

var WAREHOUSEMANIFEST = []
var CONFIGUREDBOXCARS = []

function Handle_return_to_menu() {
    $("div").hide();
    $("#divA").toggle();
    $("[name='menu']").prop('checked', false);

}

function DisplayDivB () {
    $("#divB").show();
    $("#divA").hide();
    if (CONFIGUREDBOXCARS.length > 0) {
    DisplayDivC();
    }
    
}

function validate_create_boxcar(event){
        event.preventDefault();
        let boxcarId = $("#Boxcar_ID_input").val();
        let tareWeight = parseInt($("#TAREWeight_input").val());
        let maxGrossWeight = parseInt($("#Max_Gross_Weight_input").val());
        $(this).find("span").text("");
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

            CONFIGUREDBOXCARS.push(new boxcar(
            $(this[0]).val(),
            $(this[1]).val(),
            $(this[2]).val(),
            ))
            DisplayDivC()
        }
    }

function DisplayDivC() {
    $("#divA").hide()
    $("#divC").show();
    divCTableBody = $("#divC").find("tbody")
    divCTableFooter = $("#divC").find("tfoot")
    divCTableBody.empty()
    divCTableFooter.empty()
    if (CONFIGUREDBOXCARS.length > 0) {    
        let totalCargoWeight = 0;
        CONFIGUREDBOXCARS.forEach(Boxcar => {
            divCTableBody.append(`<tr>`);
            divCTableBody.append(`<td>${Boxcar.Id}</td>`);
            divCTableBody.append(`<td>${Boxcar.tareWeight}</td>`); 
            divCTableBody.append(`<td>${Boxcar.maxGrossWeight}</td>`); 
            divCTableBody.append(`<td>${Boxcar.cargoWeight()}</td>`); 
            divCTableBody.append(`<td>${parseInt(Boxcar.grossWeight())}</td>`); 
            totalCargoWeight += parseInt(Boxcar.cargoWeight())
        });
        divCTableFooter.append(`Total Cargo Weight: ${totalCargoWeight}`)
    }
} 

function DisplayDivD () {
    $("#divA").hide()
    $("#divD").show();
    let boxCarSelectedValue = $("#Box_Car_Selected_input");
    let divDTableBody = $("#divD").find("tbody");
    let divDwarehouseSpan = $("#divD").find("span");
    let cargoEntryForm = $("#cargoForm")
    cargoEntryForm.off()
    cargoEntryForm[0].reset()
    $("#cargoForm :input").prop("disabled", true);
    divDTableBody.addClass("selectabletable");
    divDTableBody.empty();
    
    CONFIGUREDBOXCARS.forEach(Boxcar => {
        let boxcarIdCell = document.createElement("td");
        let boxcarIdRow = document.createElement("tr");
        divDTableBody.append(boxcarIdRow);
        $(boxcarIdCell).on('click', ()=>{   
        divDTableBody.prop("disabled", true);
        divDTableBody.removeClass("selectabletable");
        $("#cargoForm :input").prop("disabled", false);
        boxCarSelectedValue.val(Boxcar.Id)
        $("td").off()
    })
        boxcarIdCell.textContent = Boxcar.Id
        divDTableBody.append(boxcarIdCell);
    });
    cargoEntryForm.on('submit', (event) => {
        event.preventDefault();
        divDwarehouseSpan.text('')
        const boxcar = CONFIGUREDBOXCARS.find(boxcar => boxcar.Id === boxCarSelectedValue.val())
        let Transport_ID = $("#Transport_ID_input").val()
        let Description = $("#Description_input").val()
        let Cargo_Weight = $("#DivD_Cargo_Weigh_input").val()
        const maxCargoWeight = boxcar.maxCargoWeight - boxcar.cargoWeight()
        if (parseInt(Cargo_Weight) > maxCargoWeight) {
            let newCargo = new cargo(Transport_ID, Description, Cargo_Weight, "Warehouse")
            WAREHOUSEMANIFEST.push(newCargo)
            divDwarehouseSpan.text("Weight Exceeds boxcar weight... diverting to warehouse")
            $("#divF").hide()
            displayDivF()
        }
        else {
            let newCargo = new cargo(Transport_ID, Description, parseInt(Cargo_Weight), boxcar.Id)
            boxcar.cargo.push(newCargo)
            $("#divE").hide()
            displayDivE(boxcar)
        }
    })

}

function displayDivE(boxcar){
    $("#divA").hide()
    $("#divE").show()
    const cargo = boxcar.cargo
    let divETableBody = $("#divE").find("tbody");
    let divEtableFooter = $("#divE").find("tfoot")
    let alphabeticalboxcars = []
    let totalCargoWeight = 0
    console.log(boxcar.cargo)
    $("#divE").find("h1").text(`CNA BOX CAR ${boxcar.Id} Manifest`)
    cargo.forEach(element => {
        alphabeticalboxcars.push(element.transportId)
    });
    alphabeticalboxcars.sort()
    divETableBody.empty()
    divEtableFooter.empty()
    alphabeticalboxcars.forEach(transportId => {
        let Cargo = cargo.find(cargo => cargo.transportId === transportId)
        let boxcarIdRow = document.createElement("tr");
        let transportIdCell = document.createElement("td");
        let descriptionCell = document.createElement("td");
        let weightCell = document.createElement("td");
        
        divETableBody.append(boxcarIdRow);
        transportIdCell.textContent = Cargo.transportId
        descriptionCell.textContent = Cargo.description
        weightCell.textContent = Cargo.weight
        totalCargoWeight += parseInt(Cargo.weight)
        divETableBody.append(transportIdCell, descriptionCell, weightCell);
    })
    divEtableFooter.append(`Total Cargo Weight: ${totalCargoWeight}`) 
}

function displayDivF() { 
    $("#divA").hide()  
    $("#divF").show()
    let alphabeticalcargo = []
    let divFTableBody = $("#divF").find("tbody");
    let divFtableFooter = $("#divF").find("tfoot");
    let totalCargoWeight = 0
    $("#divF").find("h1").text(`CNA - Warehouse Manifest - Station AAAA`)
    WAREHOUSEMANIFEST.forEach(cargo => {
        alphabeticalcargo.push(cargo.transportId)
    })
    alphabeticalcargo.sort()
    divFTableBody.empty()
    divFtableFooter.empty()
    alphabeticalcargo.forEach(transportId => {
        let Cargo = WAREHOUSEMANIFEST.find(cargo => cargo.transportId === transportId)
        let boxcarIdRow = document.createElement("tr");
        let transportIdCell = document.createElement("td");
        let descriptionCell = document.createElement("td");
        let weightCell = document.createElement("td");
        
        divFTableBody.append(boxcarIdRow);
        transportIdCell.textContent = Cargo.transportId
        descriptionCell.textContent = Cargo.description
        weightCell.textContent = Cargo.weight
        totalCargoWeight += parseInt(Cargo.weight)
        divFTableBody.append(transportIdCell, descriptionCell, weightCell);
    })
    divFtableFooter.append(`Total Cargo Weight: ${totalCargoWeight}`) 
}

function displayDivG() {
    $("#divA").hide()
    $("#divG").show()
    
    let divGTableBody = $("#divG").find("tbody");
    $("#divG").find("h1").text(`CNA - Warehouse Manifest - Station AAAA`)
    divGTableBody.empty()
    WAREHOUSEMANIFEST.forEach(cargo => {
        let freightStatusRow = document.createElement("tr");
        let transportIdCell = document.createElement("td");
        let descriptionCell = document.createElement("td");
        let weightCell = document.createElement("td");
        let statusCell = document.createElement("td");
        
        divGTableBody.append(freightStatusRow);
        transportIdCell.textContent = cargo.transportId
        descriptionCell.textContent = cargo.description
        weightCell.textContent = cargo.weight
        statusCell.textContent = "warehouse"
        divGTableBody.append(transportIdCell, descriptionCell, weightCell, statusCell);
    })
    CONFIGUREDBOXCARS.forEach(Boxcar => {
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
            divGTableBody.append(transportIdCell, descriptionCell, weightCell, statusCell);})
        }
    )
}

function returnToCreateFreightE() {
    $("#divE, #divD").toggle()
    DisplayDivD()

}

function returnToCreateFreightF() {
    $("#divF, #divD").toggle()
    DisplayDivD()

}

$(function () {
    $("[name='menu']").prop('checked', false)
    $(".Return_to_main_page_btn").on("click", Handle_return_to_menu)
    $("#createBoxcarForm").on("submit", validate_create_boxcar)

    $('#return_to_create_box_car_btn').on('click', ()=>{
        $('#divC').hide()
        $('[name="create_boxcar"]')[0].reset()
        $('#divB').show()
    })
});