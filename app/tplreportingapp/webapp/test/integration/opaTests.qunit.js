sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'tatsupplier/tplreportingapp/test/integration/FirstJourney',
		'tatsupplier/tplreportingapp/test/integration/pages/SupplierMain'
    ],
    function(JourneyRunner, opaJourney, SupplierMain) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('tatsupplier/tplreportingapp') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheSupplierMain: SupplierMain
                }
            },
            opaJourney.run
        );
    }
);