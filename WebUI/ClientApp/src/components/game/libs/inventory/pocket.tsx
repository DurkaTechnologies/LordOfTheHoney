import * as React from "react";
import { useEffect, useState } from "react";
import { InventoryItem } from "./inventoryItem";

import "./pocket.css"

const Pocket = () => {
    const [pocket, setPocket] = useState<Array<InventoryItem>>([]);
    useEffect(() => {
        const pocketBarcodes = JSON.parse(localStorage.getItem("pocketItems") as string) as Array<string>;
        const allItems = JSON.parse(localStorage.getItem("allInventoryItems") as string) as Array<InventoryItem>;

        let tmp = Array<InventoryItem>();

        pocketBarcodes.forEach(x => {
            tmp.push(allItems.filter(i => i.barcode === x)[0])
        })

        console.log("tmp: ", tmp)

        setPocket(tmp);
    }, [])
    const getNormalizedName = (str: string) => {
        return str.replace(' ', '_').toLowerCase();
    }

    console.log("Pocket: ", pocket)

    return (
    <div className="pocket"> 
        {(pocket && pocket.length > 0) && (
            <div className="d-flex">
                {pocket.map((x, i) => {
                    return (
                            <img key={i} src={`/images/preview/${getNormalizedName(x.name)}.png`} alt="" width="100" />
                        )
                    })}
            </div>
        )}
    </ div>)
}

export default Pocket;