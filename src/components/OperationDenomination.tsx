import React from 'react'

type OperationDenominationProps = {
    denominations: {
        type: string;
        value: number;
        count: number;
        valueDenomination: number;
    }[];
    operation: string;
    setDenominations: React.Dispatch<React.SetStateAction<{
        type: string;
        value: number;
        count: number;
        valueDenomination: number;
    }[]>>;
    setResult: React.Dispatch<React.SetStateAction<{
        success: boolean;
        message: string;
    }>>;
}

const OperationDenomination = ({ denominations, operation, setDenominations, setResult }: OperationDenominationProps) => {

    const handleDenominations = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const denominationType = (e.target as HTMLFormElement).denomination.value;
        const denominationCount = parseInt((e.target as HTMLFormElement).count.value);
        let updatedDenominations = [];
        let isValueAvailable = true;


        if (operation === "Take") {
            updatedDenominations = denominations.map(denomination => {
                if (denomination.type === denominationType && denomination.count >= denominationCount) {
                    return { ...denomination, count: denomination.count - denominationCount, value: denomination.value - (denomination.valueDenomination * denominationCount) }
                }
                if (denomination.type === denominationType && denomination.count < denominationCount) {
                    isValueAvailable = false;
                }
                return denomination;
            })
        }
        else {
            updatedDenominations = denominations.map(denomination => {
                if (denomination.type === denominationType) {
                    return { ...denomination, count: denomination.count + denominationCount, value: denomination.value + (denomination.valueDenomination * denominationCount) }
                }
                return denomination;
            })
        }
        setDenominations(updatedDenominations);
        if (isValueAvailable) {

            setResult({ success: true, message: `Successfully ${operation === "Take" ? "Taken" : "Added"} ${denominationCount} ${denominationType}` })
        }
        else {
            setResult({ success: false, message: `Cannot Take ${denominationCount} ${denominationType}` })
        }

        e.currentTarget.reset();

    }


    return (
        <div className="row">
            <div className="col-sm-12">
                <form onSubmit={e => handleDenominations(e)}>
                    <div className="form-group">
                        <label htmlFor="denomination">Denomination</label>
                        <select className="form-control" id="denomination">
                            {denominations.map((denomination, index) => (
                                <option key={index} value={denomination.type}>{denomination.type}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="count">Count</label>
                        <input type="number" className="form-control" id="count" />
                    </div>
                    <button type="submit" className="btn btn-primary mt-2">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default OperationDenomination
