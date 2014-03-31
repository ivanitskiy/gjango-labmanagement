var net_addresses = new Array();

function getAllNetworks(){
	var def = $.Deferred();
	$.get("/api/networks/"
	).done(function(data){
		def.resolve(data)
	}).fail(def.reject);
	return def.promise();
} 

function load(callback) {
	getAllNetworks()
		.done(function(data) {
				net_addresses = data;
				callback.call()
	});
}
function renderNetwork(netnode) {
	show_netlist();
	show_ips();
	var _network,
		_network_url;
	if (netnode){
		_network = $(netnode).text();
	}
	for (var i = 0; i<net_addresses.length; i++) {
		var obj = net_addresses[i];
		if (obj.address == _network){
			_network_url = obj.url;
			break;
		}
	}
	if (_network_url){
		for (var i = 0; i<net_addresses.length; i++) {
			var obj = net_addresses[i];
			if (obj.parent == _network_url){
				$("#addresses > tbody:last").append("<tr>" + 
						   "<td >" + i + "</td>" +
						   "<td >" + obj.address + "</td>" +
						   "<td>" + obj.network_size + "</td>"+             
						   "<td>" + htmlEncode(obj.description) + "</td>" +
						   "<td class='ping_address'>" + obj.last_success_ping + "</td>" +
					   "</tr>");
			}
		}
	}
	else
	{
		for (var i = 0; i<net_addresses.length; i++) {
			var obj = net_addresses[i];
			if (obj.parent == null){
				continue;
			} 
			$("#addresses > tbody:last").append("<tr>" + 
												   "<td >" + i + "</td>" +
												   "<td >" + obj.address + "</td>" +
												   "<td>" + obj.network_size + "</td>"+             
												   "<td class='description'>" + htmlEncode(obj.description) + "</td>" +
												   "<td class='ping_address'>" + obj.last_success_ping + "</td>" +
											   "</tr>");
//			{'address', 'network_size', 'url', 'parent', 'description'}
		}
	}
	gloabalClickEvents();
}
function renderAllNetworklist(){
	if (net_addresses.length < 1){
		console.log("not loaded yet")
	}
	renderNetwork();

}
function gloabalClickEvents() {
	$('#all_networks_li').on('click', function () {
		renderNetwork();
	});

	$('.network_link').on('click', function () {
		renderNetwork(this);

	});
//	Start: Click event to ping address:
	$('.ping_address').one('click', function () {
        var parent = $(this).parent(),
            address;
        address = $(parent).children('td')[1].textContent
        parent.append("<td>" + pingResult(address) +"</td>")
	});
//	change field and send data back to server.
	$('.description').one('click', function () {
//		$(this).html = '';
		console.log(this);
	});

////	End: Click event to ping address:
	
//	Start: Sort table content
	$('th').click(function(){
	    var table = $(this).parents('table').eq(0)
	    var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
	    this.asc = !this.asc
	    if (!this.asc){rows = rows.reverse()}
	    for (var i = 0; i < rows.length; i++){table.append(rows[i])}
	})
	function comparer(index) {
	    return function(a, b) {
	        var valA = getCellValue(a, index), valB = getCellValue(b, index)
	        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB)
	    }
	}
	function getCellValue(row, index){ return $(row).children('td').eq(index).html() }
//	End: Sort table content


}
function htmlEncode(value){
	return $('<div/>').text(value).html();
}

function pingResult( ip ) {
    var scriptUrl = "/ip_addresses/" + ip +"/ping/",
        result;
	$.ajax( {
        url: scriptUrl,
        type: 'get',
        async: false,
        success: function(data) {
        		     result = data;
                 },
        error: function(result) {
                    alert("Error");
               }
     });
	return result;
}

function show_ips() {
	$("#addresses").remove();
	$("#content").append( "<table id='addresses'>" +
			             "<thead>"+ 
						 	"<tr>"+
		                      "<th>index</th>"+
			                  "<th>address</th>"+
			                  "<th>mask</th>"+
			                  "<th>description</th>"+
			                  "<th>last ping</th>"+
			                  "<th>ping now</th>"+
			              "</tr>"+
			              "</thead><tbody/>"+
						  "</table>");
}
function show_netlist() {
	$("#networks_ol").remove();
	$("#side_bar").append("<ol id='networks_ol'>Networks" +
								"<li id='all_networks_li'>All</li>" +
						  "</ol>");
	for (var i = 0; i<net_addresses.length; i++) {
		var obj = net_addresses[i];
		if (obj.parent == null){
			$('#networks_ol').append("<li class='network_item'>"+ 
										"<a class='network_link'>"+ obj.address +"</a>"+ "/" + obj.network_size +
									"<li>");
			continue;
		}
	}
}

$(window).load(function() {
	load(renderAllNetworklist);
});
