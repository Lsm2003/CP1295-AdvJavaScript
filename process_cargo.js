$(document).ready(function () {
    $("#TotalWeight").val($("#EmptyWeight").val())
    $('#CargoProcessForm').after("<div id=CargoManifestDiv></div>");

    $("#CargoProcessForm").on("submit", (event) => {

        event.preventDefault();

        var boxCarID = $("#BoxCarID").val();
        if ($(`#${boxCarID}`).length === 0) {
            
            var tableTitle = $("<label class='tableHead'></label>").text(`Cargo Box Car Manifest for Box Car ${boxCarID}`);

            var table = $("<table></table>").attr("id", boxCarID);

            var tableheader = $("<tr></tr>"); 

            var th1 = $("<th></th>").text("Transport ID");
            tableheader.append(th1);
            
            var th2 = $("<th></th>").text("Description");
            tableheader.append(th2);
            
            var th3 = $("<th></th>").text("Cargo Weight");
            tableheader.append(th3);

            var totalWeight = $("<tr><td colspan='2'>Total Cargo Weight</td></tr>");
            totalWeight.append($("<td id='CurrentWeight'></td>").text("0"))

            $("#CargoManifestDiv").append(tableTitle);
            table.append(tableheader);
            table.append(totalWeight);
            $("#CargoManifestDiv").append(table);
            
        }

        var info = $("<tr></tr>");
        info.append($("<td></td>").text($("#TransportID").val()));
        info.append($("<td></td>").text($("#Description").val()));
        info.append($("<td></td>").text($("#CargoWeight").val()));

        $(`#${boxCarID} tr:last`).before(info);
        $("#CurrentWeight").text(parseInt($("#CurrentWeight").text()) + parseInt($("#CargoWeight").val()));
        $("#TotalWeight").val(parseInt($("#TotalWeight").val()) + parseInt($("#CargoWeight").val()));
      
    });
});