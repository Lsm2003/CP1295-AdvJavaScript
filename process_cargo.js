$(document).ready(function () {

    $("#currentWeight").val($("#emptyWeight").val())
    $('#CargoProcessingForm').after("<div id=CargoManifestDiv></div>");

    $("#CargoProcessingForm").on("submit", (event) => {
        $("#cargoProcessingErrorMessage").empty();
        event.preventDefault(); 
        if ($("#transportId").val() == "" | $("#description").val() == "" | $("#cargoWeight").val() == "") {
            $("#cargoProcessingErrorMessage").text("please fill all fields")
            return
        }
        else if (isNaN(parseInt($("#cargoWeight").val()))) {
            $("#cargoProcessingErrorMessage").text("Cargo weight must be a number")
            return
        }
        else if (parseInt($("#cargoWeight").val()) + parseInt($("#emptyWeight").val()) > parseInt($("#maxWeight").val()) || parseInt($("#cargoWeight")) < 0 ) {
            $("#cargoProcessingErrorMessage").text("Cargos max weight has beem exceeded ")
            return
        }
       
        if ($(`#cargoStatus`).length === 0) {
            createCargoStatus()
        }

        const boxCarId = $("#boxCarId").val();

        if ($(`#${boxCarId}`).length === 0) {
        createManifest(boxCarId)
        }
        
        if (parseInt($("#cargoWeight").val())  +  parseInt($("#currentWeight").val()) < parseInt($("#maxWeight").val())) {
            addToStatus(boxCarId)
            addToManifest(boxCarId)
        }
        else {
            addToStatus("Warehouse")
        }
      
    });
});

function createManifest (boxCarId) {
   
        var manifestLabel = $("<label></label>").text(`Cargo Box Car Manifest for ${boxCarId}`);

        var table = $("<table></table>").attr("id", boxCarId);

        var tableheader = $("<tr></tr>");

        var th1 = $("<th></th>").text("Transport ID");
        tableheader.append(th1);
        
        var th2 = $("<th></th>").text("Description");
        tableheader.append(th2);
        
        var th3 = $("<th></th>").text("Cargo Weight");
        tableheader.append(th3);

        var totalWeightRow = $("<tr><td colspan='2'>Total Cargo Weight</td></tr>");
        totalWeightRow.append($("<td id='totalWeight'></td>").text("0"))

        table.append(tableheader);
        $("#CargoManifestDiv").append(manifestLabel);
        //table.append(tableheader);
        table.append(totalWeightRow);
        $("#CargoManifestDiv").append(table);
    }

function createCargoStatus () {    
   
    var statusLabel = $("<label></label>").text(`Cargo Status`);
    statusLabel.attr('class', 'tableHeader')
    
    var table = $("<table></table>").attr("id", 'cargoStatus');

    var tableheader = $("<tr></tr>");

    var th1 = $("<th></th>").text("Transport ID");
    tableheader.append(th1);
    
    var th2 = $("<th></th>").text("Description");
    tableheader.append(th2);
    
    var th3 = $("<th></th>").text("Weight");
    tableheader.append(th3);

    var th4 = $("<th></th>").text("Status");
    tableheader.append(th4);

    table.append(tableheader);
    $("#CargoManifestDiv").append(statusLabel);
    $("#CargoManifestDiv").append(table);

}

function addToManifest(boxCarId) {
    
        let DataRow = $("<tr></tr>");

        DataRow.append($("<td></td>").text($("#transportId").val()));
        DataRow.append($("<td></td>").text($("#description").val()));
        DataRow.append($("<td></td>").text($("#cargoWeight").val()));

        $(`#${boxCarId} tr:last`).before(DataRow);
        
        $("#totalWeight").text(parseInt($("#totalWeight").text()) + parseInt($("#cargoWeight").val()));
        $("#currentWeight").val(parseInt($("#currentWeight").val()) + parseInt($("#cargoWeight").val())) 


}

function addToStatus(Location) {
    
    let DataRow = $("<tr></tr>");

    DataRow.append($("<td></td>").text($("#transportId").val()));
    DataRow.append($("<td></td>").text($("#description").val()));
    DataRow.append($("<td></td>").text($("#cargoWeight").val()));
    DataRow.append($("<td></td>").text(Location))

    $("#cargoStatus").append(DataRow)

}