(function () {
    var myConnector = tableau.makeConnector();
 
   myConnector.getSchema = function (schemaCallback) {
    
	var cols = [
        { id : "ASGS_2011_STATE_GCCSA_SA4_SA3_SA2", alias : "Region", dataType : tableau.dataTypeEnum.string },
        { id : "HH_TYPE", alias : "Household Type", dataType : tableau.dataTypeEnum.string },
        { id : "PROJ_SERIES", alias : "Projection Assumption", dataType : tableau.dataTypeEnum.string },
        { id : "FREQUENCY", alias : "Frequency", dataType : tableau.dataTypeEnum.string },
        { id : "TIME_PERIOD", alias : "Time", dataType : tableau.dataTypeEnum.string },
        { id : "obs", alias : "observation", dataType : tableau.dataTypeEnum.float }
    ];

    var tableInfo = {
        id : "ABS_HH_PROV",
        alias : "Household Projections, Australia, 2011 to 2036",
        columns : cols
    };


schemaCallback([tableInfo]);

	
	
	
    
};
 
    myConnector.getData = function (table, doneCallback) {
    var tableData = [],
        ASGS_2011_STATE_GCCSA_SA4_SA3_SA2 = "",
        HH_TYPE = "",
        PROJ_SERIES = "",
        Frequency = "",
        TIME_PERIOD = "",
        obs = 0;

    	$.getJSON("http://stat.data.abs.gov.au/sdmx-json/data/ABS_HH_PROV/1+2+3+4+5+6+7+8.1_2+32+31.1+2+3.A/all?startTime=2011&endTime=2036&dimensionAtObservation=allDimensions", function (resp) {
        var obsvs = resp.dataSets[0].observations; 


        for (var i = 0, len = Object.keys(obsvs).length; i < len; i++) {
			
			
			var arrKey = Object.keys(obsvs)[i].split(':')
			
            ASGS_2011_STATE_GCCSA_SA4_SA3_SA2 = resp.structure.dimensions.observation[0].values[arrKey[0]].name;
            HH_TYPE = resp.structure.dimensions.observation[1].values[arrKey[1]].name;
            PROJ_SERIES = resp.structure.dimensions.observation[2].values[arrKey[2]].name;
            Frequency = resp.structure.dimensions.observation[3].values[arrKey[3]].name;
            TIME_PERIOD = resp.structure.dimensions.observation[4].values[arrKey[4]].name;
            obs = obsvs[Object.keys(obsvs)[i]][0]; 

            tableData.push({
                "ASGS_2011_STATE_GCCSA_SA4_SA3_SA2" : ASGS_2011_STATE_GCCSA_SA4_SA3_SA2,
                "HH_TYPE" : HH_TYPE,
                "PROJ_SERIES" : PROJ_SERIES,
                "Frequency" : Frequency,
                "TIME_PERIOD" : TIME_PERIOD,
                "obs" : obs
            });
			
			
			
        }

        table.appendRows(tableData);

        doneCallback();
    });
};
    tableau.registerConnector(myConnector);
	
	$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "Australia: ABS Household Projections";
        tableau.submit();
    });
});
	
})();