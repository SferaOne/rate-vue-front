export const filter_methods = {
    methods:{
        checkAll(item, data){
            if (parseInt(item.is_direct) != 1) 
                return this.checkAllWithPorts(item,data)
            else
                return this.checkAllWithOutPorts(item, data)
        },
        checkAllWithOutPorts(item, data){
             if (this.checkSumma(item, data.price_limit)) 
               if (this.checkIsSea(item, data.is_not_sea))
                    if (this.checkIsLackOfEmptyEquipment(item, data.is_lack_of_empty_equipment_date))
                        if (this.checkIsSoc(item, data.is_soc))
                            if (this.checkStation(item, data.selected_station))
                                if (this.checkTransporter(item, data.selected_contractor))
                                    if (this.checkIsDirect(item, data.is_direct)) 
                                        if (this.checkSeaWeeks(item, data.selected_sea_start_weeks)) return true
                                        else false
                                    else return false
                                else return false
                            else return false
                        else return false
                    else return false
                else return false
            else return false
        },
        checkAllWithPorts(item, data){
            if (this.checkSumma(item, data.price_limit))
                if (this.checkIsSea(item, data.is_not_sea))
                    if (this.checkIsLackOfEmptyEquipment(item, data.is_lack_of_empty_equipment_date))
                        if (this.checkIsSoc(item, data.is_soc))
                            if (this.checkPort(item, data.selected_port))
                                if (this.checkStation(item, data.selected_station))
                                    if (this.checkTransporter(item, data.selected_contractor))
                                        if (this.checkIsDirect(item, data.is_direct)) 
                                            if (this.checkSeaWeeks(item, data.selected_sea_start_weeks)) return true
                                            else false
                                        else return false
                                    else return false
                                else return false
                            else return false
                        else return false
                    else return false
                else return false
            else return false
        },
        checkSumma(item, limit){
            return (item.total <= limit)
        },
        checkIsSea(item, limit){
            return (limit.includes(item.is_sea))
        },
        checkIsSoc(item, limit){
            return (limit.includes(parseInt(item.is_soc)))
        },
        checkPort(item, ports){
            return (ports.includes(item.terminal_id))
        },
        checkStation(item, stations){
            return (stations.includes(item.station_id))
        },
        checkTransporter(item, transporters){
            return (transporters.includes(item.line_id))
        },
        checkTranzitTime(item, limit){
            return (item.tranzit_time <= limit)
        },
        checkIsLackOfEmptyEquipment(item, limit){
            return (limit.includes(item.lack_of_empty_equipment_type))
        },
        checkIsDirect(item, limit){
            return (limit.includes(parseInt(item.is_direct)))// && [0].includes(parseInt(item.is_ete)) )
        },
        checkSeaWeeks(item, limit){
            let items = item.sea_start_weeks.split(",")
            let intersection = items.filter(x => limit.includes(x));
            return (intersection.length > 0) ? true : false
        }
    }
}
