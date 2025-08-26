import { Coins } from "lucide-react"

export default function BadgeCoins (){

    return(
        <>
        <div className="bg-blue-500 px-4 py-2 ">
            <h1><Coins
            size={10}
            /> 1000</h1>
        </div>
        </>
    )
}