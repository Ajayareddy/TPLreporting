// https://tata-projects-limited-btp-dev-0or0hi20-dev-space-tplrep429840d3.cfapps.eu10-004.hana.ondemand.com/odata/v4/tpl-service/Supplier?$expand=tasks
const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
    /* SERVICE ENTITIES */
    let {
        Supplier,
        Tasks
    } = this.entities;
    const c4re = await cds.connect.to('iflow');

    var readsupp = true;
    this.before('READ', Supplier, async (req) => {
        if (readsupp) {
            try {
                resp = await c4re.get('/Supplier?$expand=tasks');
                debugger
                await cds.tx(req).run(DELETE(Supplier));
                await cds.tx(req).run(DELETE(Tasks));
                const data = resp.value;
                const sup_data = [];
                const task_data = [];
                let task = [];
                data.forEach(supplier_entry => {
                    sup_data.push(
                        {
                            sm_id: supplier_entry.sm_id,
                            supplier_name: supplier_entry.supplier_name,
                            erp_vendor_code: supplier_entry.erp_vendor_code
                        }
                    );
                    task = supplier_entry.tasks;
                    task.forEach(task_entry => {
                        task_data.push(
                            {
                                task_name: task_entry.task_name,
                                sm_id: task_entry.sm_id,
                                start_date: task_entry.start_date,
                                end_date: task_entry.end_date,
                                tat_for_registration_completion: task_entry.tat_for_registration_completion,
                                user: task_entry.user
                            }
                        );
                    });
                });
    
                await cds.tx(req).run(INSERT.into(Supplier).entries(sup_data));
                await cds.tx(req).run(INSERT.into(Tasks).entries(task_data));
                readsupp = false;
            } catch (err) {
                return req.error(500,err.message);
    
            }
            
        }
    });

});